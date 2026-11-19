#!/usr/bin/env python3
"""
make_video.py: a "bar chart race" video of the Top 10 shows & series in Québec.

WHAT IT DOES
    Reads a CSV file with three columns: year, name, count
    and turns it into a vertical (1080 x 1920) MP4 video at 60 frames per second.

HOW TO RUN IT (type one of these in a terminal, inside the bar-chart-race folder)
    python3 make_video.py               -> finds your CSV by itself and makes the video
    python3 make_video.py my_data.csv   -> use a specific CSV file
    python3 make_video.py --preview     -> quick check: saves 4 still pictures instead of a video
    python3 make_video.py --sample      -> use the made-up sample data (for testing)

The finished video is saved in:  bar-chart-race/output/quebec_top10_race.mp4

WHAT YOU MIGHT WANT TO CHANGE
    Section 1 just below: titles, speed, colors, number style.
    The "fact" texts live in facts.csv (one fact per line: year,fact).
"""

import argparse
import os
import shutil
import subprocess
import sys
import tempfile
import time
from multiprocessing import Pool
from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib

matplotlib.use("Agg")  # draw off-screen (no window pops up)
import matplotlib.image
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from matplotlib.patches import FancyBboxPatch, Rectangle
from matplotlib.textpath import TextPath


# =============================================================================
# 1. SETTINGS: the part you normally edit
# =============================================================================
HERE = Path(__file__).resolve().parent

TITLE_LINES = ["Québec's Top 10", "TV Shows & Series"]  # big bold title (2 lines)
SUBTITLE = "1980 – 2026"                                # smaller line under the title
SOURCE_TEXT = "Source: add your source here"            # small print at the very bottom
FACT_HEADING = "DID YOU KNOW?"                          # small heading inside the fact box
NUMBER_STYLE = "en"   # "en" shows 1,234,567    "fr" shows 1 234 567

# Is "count" a yearly number (e.g. viewers THAT year)? Keep False.
# Want each show's running total over the years instead? Set to True.
CUMULATIVE = False

YEAR_FIRST = None     # e.g. 1980 to cut the start; None = use what's in the CSV
YEAR_LAST = None      # e.g. 2026 to cut the end;   None = use what's in the CSV

FPS = 60                  # frames per second
SECONDS_PER_YEAR = 1.5    # how long each year lasts on screen (bigger = slower video)
HOLD_START_SECONDS = 1.0  # pause on the first year before the race starts
HOLD_END_SECONDS = 4.0    # pause on the final ranking at the end
SWAP_SECONDS = 0.4        # how smoothly bars slide when they swap places
FACT_FADE_SECONDS = 0.4   # how long a fact takes to fade out / in
TOP_N = 10                # how many bars to show

OUTPUT_FILE = HERE / "output" / "quebec_top10_race.mp4"
FACTS_FILE = HERE / "facts.csv"
SAMPLE_FILE = HERE / "sample_data_FAKE.csv"

# --- Colors (light theme, white background) ----------------------------------
BACKGROUND = "#ffffff"
INK = "#0b0b0b"          # main text
INK_SOFT = "#52514e"     # secondary text (subtitle, year)
INK_MUTED = "#898781"    # small print, rank numbers
YEAR_COLOR = "#a3a19a"   # the big year
FACT_BOX_COLOR = "#f3f2ee"
# 8 bar colors, in an order tested to stay tellable-apart (incl. color-blindness).
# Each show keeps ONE color for the whole video, so you can follow it as it moves.
BAR_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100",
              "#e87ba4", "#008300", "#6250d6", "#e34948"]

# --- Layout, in pixels (the video is 1080 wide x 1920 tall) ------------------
W, H = 1080, 1920
MARGIN = 60
TITLE_Y = (122, 214)        # vertical centre of each title line
TITLE_SIZE = 86
SUBTITLE_Y = 292
SUBTITLE_SIZE = 38
CHART_TOP = 352             # top of the first bar's slot
SLOT_H = 106                # height of one rank slot (name + bar + gap)
BAR_H = 52                  # thickness of a bar
NAME_OFFSET = 20            # name label centre, from top of slot
BAR_OFFSET = 40             # bar top, from top of slot
BAR_X0 = 118                # where bars start (left edge)
RANK_X = 98                 # rank numbers (1-10) are right-aligned here
BAR_ROUND = 8               # rounded corner on the bar's end
NAME_SIZE = 32
VALUE_SIZE = 34
RANK_SIZE = 32
VALUE_GAP = 14              # space between bar end and its number
YEAR_Y = 1508
YEAR_SIZE = 200
FACT_BOX = (MARGIN, 1618, W - 2 * MARGIN, 222)   # left, top, width, height
FACT_PAD = 36
FACT_HEADING_SIZE = 25
FACT_SIZE = 37
SOURCE_Y = 1880
SOURCE_SIZE = 22
CHART_BOTTOM = CHART_TOP + TOP_N * SLOT_H


# =============================================================================
# 2. FONTS: use Inter if it's on the computer, otherwise a standard font
# =============================================================================
FONT_FOLDERS = [
    HERE / "fonts",
    Path("/usr/share/fonts/opentype/inter"),
    Path("/usr/share/fonts/truetype/inter"),
    Path.home() / "Library/Fonts", Path("/Library/Fonts"),
    Path.home() / ".fonts", Path.home() / ".local/share/fonts",
    Path("C:/Windows/Fonts"), Path.home() / "AppData/Local/Microsoft/Windows/Fonts",
]
FALLBACK_WEIGHT = {"Regular": "normal", "Medium": "medium", "SemiBold": "semibold",
                   "Bold": "bold", "ExtraBold": "heavy", "Black": "heavy"}


def font(weight, display=False):
    """Find an Inter font file of the given weight (e.g. 'Bold')."""
    families = ["InterDisplay", "Inter"] if display else ["Inter"]
    for folder in FONT_FOLDERS:
        for fam in families:
            for ext in ("otf", "ttf"):
                path = folder / f"{fam}-{weight}.{ext}"
                if path.exists():
                    return FontProperties(fname=str(path))
    return FontProperties(family="DejaVu Sans", weight=FALLBACK_WEIGHT[weight])


def text_width(text, fp, size):
    """How many pixels wide a piece of text will be."""
    if not text:
        return 0.0
    return TextPath((0, 0), text, size=size, prop=fp).get_extents().width


def fit_text(text, fp, size, max_width):
    """Shorten text with '…' if it's too wide."""
    if text_width(text, fp, size) <= max_width:
        return text
    while text and text_width(text + "…", fp, size) > max_width:
        text = text[:-1]
    return text.rstrip(" ,") + "…"


def wrap_text(text, fp, size, max_width):
    """Break a sentence into lines that fit inside max_width pixels."""
    lines, current = [], ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if current and text_width(trial, fp, size) > max_width:
            lines.append(current)
            current = word
        else:
            current = trial
    if current:
        lines.append(current)
    return lines


def fmt_number(value):
    text = f"{value:,.0f}"
    return text.replace(",", "\u00a0") if NUMBER_STYLE == "fr" else text


# =============================================================================
# 3. READ THE DATA: load the CSV and tidy it up
# =============================================================================
COLUMN_ALIASES = {"année": "year", "annee": "year", "an": "year",
                  "nom": "name", "titre": "name", "title": "name", "show": "name", "série": "name",
                  "nombre": "count", "compte": "count", "value": "count", "valeur": "count"}


def read_csv_any(path):
    """Read a CSV saved by Excel, Google Sheets, Numbers… (comma or semicolon, any accent encoding)."""
    for encoding in ("utf-8-sig", "cp1252"):
        try:
            df = pd.read_csv(path, sep=None, engine="python", encoding=encoding)
            break
        except UnicodeDecodeError:
            continue
    df.columns = [COLUMN_ALIASES.get(str(c).strip().lower(), str(c).strip().lower())
                  for c in df.columns]
    return df


def load_data(path, verbose=False):
    df = read_csv_any(path)
    missing = {"year", "name", "count"} - set(df.columns)
    if missing:
        sys.exit(f"\nProblem: the CSV needs the columns year, name, count.\n"
                 f"I found: {', '.join(df.columns)}\nMissing: {', '.join(sorted(missing))}")

    # Clean each column: numbers as numbers, names without stray spaces.
    df["year"] = pd.to_numeric(df["year"], errors="coerce")
    df["count"] = pd.to_numeric(
        df["count"].astype(str).str.replace(r"[\s\u00a0\u202f,]", "", regex=True),
        errors="coerce")
    df["name"] = df["name"].astype(str).str.strip()
    bad = df[["year", "count"]].isna().any(axis=1) | (df["name"] == "")
    if bad.any() and verbose:
        print(f"   Note: skipped {bad.sum()} row(s) with a missing year, name or count.")
    df = df[~bad].copy()
    df["year"] = df["year"].astype(int)

    if YEAR_FIRST is not None:
        df = df[df["year"] >= YEAR_FIRST]
    if YEAR_LAST is not None:
        df = df[df["year"] <= YEAR_LAST]
    if df["year"].nunique() < 2:
        sys.exit("\nProblem: the data needs at least two different years.")

    # One row per year, one column per show. Same show twice in a year -> added together.
    wide = df.pivot_table(index="year", columns="name", values="count", aggfunc="sum")
    all_years = range(wide.index.min(), wide.index.max() + 1)
    wide = wide.reindex(all_years)
    year_missing = wide.isna().all(axis=1)          # a whole year absent from the CSV
    wide[~year_missing] = wide[~year_missing].fillna(0)   # show absent that year -> 0
    wide = wide.interpolate(axis=0, limit_area="inside").fillna(0)  # fill gap years smoothly
    if year_missing.any() and verbose:
        gap = ", ".join(str(y) for y in wide.index[year_missing])
        print(f"   Note: no rows for {gap}; I filled those years in smoothly.")
    if CUMULATIVE:
        wide = wide.cumsum()
    return wide.clip(lower=0)


def load_facts(path):
    if not path.exists():
        return []
    df = read_csv_any(path)
    if not {"year", "fact"} <= set(df.columns):
        sys.exit("\nProblem: facts.csv needs two columns: year, fact")
    df = df.dropna(subset=["year", "fact"])
    return sorted((int(y), str(f).strip()) for y, f in zip(df["year"], df["fact"]))


# =============================================================================
# 4. PLAN EVERY FRAME: where each bar is, how long, what it says
# =============================================================================
def smooth(array, window):
    """Moving average over time, so that jumps become smooth slides."""
    pad = window // 2
    padded = np.pad(array, ((pad, window - 1 - pad), (0, 0)), mode="edge")
    total = np.cumsum(padded, axis=0)
    total = np.vstack([np.zeros((1, array.shape[1])), total])
    return (total[window:] - total[:-window]) / window


class Timeline:
    """Everything that changes over time, worked out in advance for every frame."""

    def __init__(self, data_path, facts_path, verbose=False):
        wide = load_data(data_path, verbose)
        self.is_demo = Path(data_path).resolve() == SAMPLE_FILE.resolve()
        self.names = list(wide.columns)
        years = wide.index.to_numpy()
        table = wide.to_numpy(float)                      # rows = years, columns = shows
        last = len(years) - 1

        # Time: "t" counts years since the first one; it moves a little every frame.
        per_year = round(SECONDS_PER_YEAR * FPS)
        t = np.concatenate([
            np.zeros(round(HOLD_START_SECONDS * FPS)),
            np.arange(last * per_year + 1) / per_year,
            np.full(round(HOLD_END_SECONDS * FPS), float(last)),
        ])
        self.n_frames = len(t)
        i0 = np.clip(np.floor(t + 1e-9).astype(int), 0, last)
        i1 = np.minimum(i0 + 1, last)
        frac = (t - i0)[:, None]

        # Values glide in a straight line from one year to the next ("counting up").
        self.values = table[i0] * (1 - frac) + table[i1] * frac
        self.year_label = years[i0]

        # Rank on every frame (0 = top). Shows outside the top 10 (or at 0) wait below.
        order = np.argsort(-self.values, axis=1, kind="stable")
        rank = np.argsort(order, axis=1).astype(float)
        rank[self.values <= 0] = TOP_N
        rank = np.minimum(rank, TOP_N)
        # Smooth the ranks so bars SLIDE into their new place instead of jumping.
        window = max(1, round(SWAP_SECONDS * FPS))
        self.pos = smooth(smooth(rank, window), window)
        # Longest bar = full width; smooth that scale too so bars don't twitch.
        biggest = self.values.max(axis=1, keepdims=True)
        self.scale = np.maximum(smooth(biggest, window)[:, 0], 1e-9)
        self.max_value = float(table.max())

        self.shown = [e for e in range(len(self.names)) if (self.pos[:, e] < TOP_N - 1e-3).any()]
        self.colors = self._pick_colors()
        self._plan_facts(load_facts(facts_path))

    def _pick_colors(self):
        """Give each show one color for the whole video, so that two shows with the
        same color are (almost) never right next to each other on screen."""
        shows, n_colors = self.shown, len(BAR_COLORS)
        visible = self.pos[:, shows] < TOP_N - 1e-3
        # clash[a, b] = how much shows a and b are close neighbours over the video
        clash = np.zeros((len(shows), len(shows)))
        for a in range(len(shows)):
            for b in range(a + 1, len(shows)):
                together = visible[:, a] & visible[:, b]
                if together.any():
                    gap = np.abs(self.pos[together, shows[a]] - self.pos[together, shows[b]])
                    clash[a, b] = clash[b, a] = (np.clip(2.5 - gap, 0, None) ** 2).sum()
        # First guess: in order of appearance, take the least-clashing color.
        first = visible.argmax(axis=0)
        color = np.full(len(shows), -1)
        for a in sorted(range(len(shows)), key=lambda a: (first[a], self.pos[:, shows[a]].min())):
            cost = [clash[a, color == c].sum() for c in range(n_colors)]
            used = [(color == c).sum() for c in range(n_colors)]
            color[a] = min(range(n_colors), key=lambda c: (cost[c], used[c], c))
        # Then improve: let each show switch color if that lowers its clashes.
        for _ in range(20):
            changed = False
            for a in range(len(shows)):
                others = np.arange(len(shows)) != a
                cost = [clash[a, others & (color == c)].sum() for c in range(n_colors)]
                best = int(np.argmin(cost))
                if cost[best] < cost[color[a]] - 1e-9:
                    color[a], changed = best, True
            if not changed:
                break
        return {e: BAR_COLORS[c] for e, c in zip(shows, color)}

    def _plan_facts(self, facts):
        """Which fact is on screen at each frame, and how faded-in it is."""
        self.facts = [text for _, text in facts]
        idx = np.full(self.n_frames, -1)
        for k, (year, _) in enumerate(facts):
            idx[self.year_label >= year] = k
        self.fact_index = idx
        self.fact_alpha = np.ones(self.n_frames)
        fade = max(1, round(FACT_FADE_SECONDS * FPS))
        change = np.flatnonzero(np.diff(idx)) + 1
        starts = np.concatenate([[0], change])
        ends = np.concatenate([change, [self.n_frames]])
        for s, e in zip(starts, ends):
            f = np.arange(s, e)
            fade_in = np.ones(len(f)) if s == 0 else (f - s + 1) / fade
            fade_out = np.ones(len(f)) if e == self.n_frames else (e - f) / fade
            self.fact_alpha[s:e] = np.clip(np.minimum(fade_in, fade_out), 0, 1)


# =============================================================================
# 5. DRAW: build the picture once, then just move things for each frame
# =============================================================================
class Scene:
    def __init__(self, tl):
        self.tl = tl
        self.fig = plt.figure(figsize=(W / 72, H / 72), dpi=72, facecolor=BACKGROUND)
        ax = self.fig.add_axes([0, 0, 1, 1])
        ax.set_xlim(0, W)
        ax.set_ylim(H, 0)      # 1 unit = 1 pixel, measured from the top-left corner
        ax.axis("off")
        self.ax = ax
        self.fig.canvas.draw()
        assert self.fig.canvas.get_width_height() == (W, H), "unexpected frame size"

        f_title, f_year = font("Black", display=True), font("Black", display=True)
        f_reg, f_med = font("Regular"), font("Medium")
        f_semi, f_bold = font("SemiBold"), font("Bold")
        self.f_value = f_bold

        # --- Things that never move -----------------------------------------
        for y, line in zip(TITLE_Y, TITLE_LINES):
            ax.text(W / 2, y, line, ha="center", va="center", color=INK,
                    fontproperties=f_title, fontsize=TITLE_SIZE)
        ax.text(W / 2, SUBTITLE_Y, SUBTITLE, ha="center", va="center", color=INK_SOFT,
                fontproperties=f_med, fontsize=SUBTITLE_SIZE)
        for r in range(TOP_N):
            ax.text(RANK_X, self.bar_centre(r), str(r + 1), ha="right", va="center",
                    color=INK_MUTED, fontproperties=f_bold, fontsize=RANK_SIZE)
        source = "DEMO: made-up numbers, not real data" if tl.is_demo else SOURCE_TEXT
        ax.text(W / 2, SOURCE_Y, source, ha="center", va="center", color=INK_MUTED,
                fontproperties=f_reg, fontsize=SOURCE_SIZE)

        # --- Bars: one set of pieces per show --------------------------------
        widest_number = text_width(fmt_number(tl.max_value), f_bold, VALUE_SIZE)
        self.bar_max = W - MARGIN - VALUE_GAP - widest_number - BAR_X0
        clip = Rectangle((0, 0), W, CHART_BOTTOM, transform=ax.transData)
        name_room = W - MARGIN - BAR_X0
        self.bars = {}
        for e in tl.shown:
            color = tl.colors[e]
            label = fit_text(tl.names[e], f_semi, NAME_SIZE, name_room)
            pieces = {
                "end": FancyBboxPatch((0, 0), 1, BAR_H, linewidth=0, facecolor=color,
                                      boxstyle=f"round,pad=0,rounding_size={BAR_ROUND}"),
                "body": Rectangle((0, 0), 1, BAR_H, linewidth=0, facecolor=color),
                "name": ax.text(BAR_X0, 0, label, ha="left", va="center", color=INK,
                                fontproperties=f_semi, fontsize=NAME_SIZE),
                "value": ax.text(0, 0, "", ha="left", va="center", color=INK,
                                 fontproperties=f_bold, fontsize=VALUE_SIZE),
            }
            for key in ("end", "body"):
                ax.add_patch(pieces[key])
            for p in pieces.values():
                p.set_clip_path(clip)
                p.set_visible(False)
            self.bars[e] = pieces

        # --- Big year on the right -------------------------------------------
        self.year = ax.text(W - MARGIN + 8, YEAR_Y, "", ha="right", va="center",
                            color=YEAR_COLOR, fontproperties=f_year, fontsize=YEAR_SIZE)

        # --- Fact box ----------------------------------------------------------
        bx, by, bw, bh = FACT_BOX
        self.fact_box = FancyBboxPatch((bx, by), bw, bh, linewidth=0, facecolor=FACT_BOX_COLOR,
                                       boxstyle="round,pad=0,rounding_size=28")
        ax.add_patch(self.fact_box)
        self.fact_head = ax.text(bx + FACT_PAD, by + FACT_PAD + 12, FACT_HEADING, ha="left",
                                 va="center", color=INK_SOFT, fontproperties=f_bold,
                                 fontsize=FACT_HEADING_SIZE)
        self.fact_text = ax.text(bx + FACT_PAD, by + FACT_PAD + 44, "", ha="left", va="top",
                                 color=INK, fontproperties=f_med, fontsize=FACT_SIZE,
                                 linespacing=1.3)
        room = bw - 2 * FACT_PAD
        self.fact_lines = []
        for fact in tl.facts:
            lines = wrap_text(fact, f_med, FACT_SIZE, room)
            if len(lines) > 3:
                print(f"   Warning: this fact is long and may not fit the box:\n   “{fact}”")
            self.fact_lines.append("\n".join(lines))

    @staticmethod
    def slot_top(pos):
        return CHART_TOP + pos * SLOT_H

    def bar_centre(self, pos):
        return self.slot_top(pos) + BAR_OFFSET + BAR_H / 2

    def draw_frame(self, f):
        tl = self.tl
        on_screen = []
        for e, p in self.bars.items():
            if tl.pos[f, e] >= TOP_N - 1e-3:   # not in the top 10 right now
                for piece in p.values():
                    piece.set_visible(False)
            else:
                on_screen.append(e)
        # Stack shows like cards: the bigger value is in front when two bars cross,
        # and each show's name + number stay with its own bar.
        on_screen.sort(key=lambda e: tl.values[f, e])
        for layer, e in enumerate(on_screen):
            p = self.bars[e]
            for key, extra in (("body", 0.0), ("end", 0.0), ("name", 0.5), ("value", 0.5)):
                p[key].set_zorder(2 + layer + extra)
            pos = tl.pos[f, e]
            alpha = float(np.clip(TOP_N - pos, 0, 1))   # fades while leaving / entering
            top = self.slot_top(pos)
            value = tl.values[f, e]
            width = max(6.0, value / tl.scale[f] * self.bar_max)
            r = min(BAR_ROUND, width / 2)
            p["end"].set_bounds(BAR_X0, top + BAR_OFFSET, width, BAR_H)
            p["end"].set_boxstyle("round", pad=0, rounding_size=r)
            p["body"].set_bounds(BAR_X0, top + BAR_OFFSET, min(width, BAR_ROUND), BAR_H)
            p["name"].set_y(top + NAME_OFFSET)
            p["value"].set_position((BAR_X0 + width + VALUE_GAP, self.bar_centre(pos)))
            p["value"].set_text(fmt_number(value))
            for piece in p.values():
                piece.set_alpha(alpha)
                piece.set_visible(True)

        self.year.set_text(str(tl.year_label[f]))

        k = tl.fact_index[f]
        has_fact = k >= 0
        for piece in (self.fact_box, self.fact_head, self.fact_text):
            piece.set_visible(has_fact)
        if has_fact:
            self.fact_text.set_text(self.fact_lines[k])
            self.fact_text.set_alpha(tl.fact_alpha[f])

    def frame_pixels(self):
        self.fig.canvas.draw()
        return self.fig.canvas.buffer_rgba()


# =============================================================================
# 6. MAKE THE VIDEO: draw frames on all CPU cores, hand them to ffmpeg
# =============================================================================
def ffmpeg_program():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("\nProblem: ffmpeg (the video maker) isn't installed.\n"
                 "Fix: run   pip install imageio-ffmpeg   and try again.")


def open_encoder(out_path):
    """Start ffmpeg, ready to receive raw pictures and write an MP4 (H.264)."""
    cmd = [ffmpeg_program(), "-y", "-loglevel", "error",
           "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-profile:v", "high",
           "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
           "-color_range", "tv", "-r", str(FPS), str(out_path)]
    return subprocess.Popen(cmd, stdin=subprocess.PIPE)


_scene = None


def _start_worker(data_path, facts_path):
    global _scene
    _scene = Scene(Timeline(data_path, facts_path))


def _render_piece(job):
    start, stop, out_path = job
    encoder = open_encoder(out_path)
    for f in range(start, stop):
        _scene.draw_frame(f)
        encoder.stdin.write(_scene.frame_pixels())
    encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError("ffmpeg failed while writing " + str(out_path))
    return stop - start


def render_video(tl, data_path):
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    workers = max(1, min(8, os.cpu_count() or 1))
    piece_len = 4 * FPS
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        jobs = [(s, min(s + piece_len, tl.n_frames), tmp / f"piece_{i:04d}.mp4")
                for i, s in enumerate(range(0, tl.n_frames, piece_len))]
        print(f"Step 3/4: Drawing {tl.n_frames:,} frames using {workers} CPU cores…")
        done, t0 = 0, time.time()
        with Pool(workers, initializer=_start_worker, initargs=(data_path, FACTS_FILE)) as pool:
            for n in pool.imap_unordered(_render_piece, jobs):
                done += n
                print(f"   {done / tl.n_frames:6.1%}  ({time.time() - t0:4.0f} s)", end="\r", flush=True)
        print()
        print("Step 4/4: Joining the pieces into one video…")
        listing = tmp / "pieces.txt"
        listing.write_text("".join(f"file '{j[2].as_posix()}'\n" for j in jobs))
        subprocess.run([ffmpeg_program(), "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
                        "-i", str(listing), "-c", "copy", "-movflags", "+faststart",
                        str(OUTPUT_FILE)], check=True)


def render_preview(tl):
    """Save 4 still pictures: start, mid-race (bars moving), later on, and the final frame."""
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    scene = Scene(tl)
    picks = [0, int(tl.n_frames * 0.33), int(tl.n_frames * 0.66), tl.n_frames - 1]
    for i, f in enumerate(picks, 1):
        scene.draw_frame(f)
        path = OUTPUT_FILE.parent / f"preview_{i}.png"
        matplotlib.image.imsave(path, np.asarray(scene.frame_pixels()))
        print(f"   saved {path}  (year {tl.year_label[f]})")


# =============================================================================
# 7. START HERE: find the CSV, then run the steps above in order
# =============================================================================
def find_data_file(given, use_sample):
    if use_sample:
        return SAMPLE_FILE
    if given:
        path = Path(given)
        if not path.exists():
            sys.exit(f"\nProblem: I can't find the file {given}")
        return path
    skip = {FACTS_FILE.name, SAMPLE_FILE.name}
    found = [p for folder in (HERE, HERE.parent) for p in sorted(folder.glob("*.csv"))
             if p.name not in skip]
    if len(found) == 1:
        return found[0]
    if len(found) > 1:
        names = "\n   ".join(str(p) for p in found)
        sys.exit(f"\nI found several CSV files:\n   {names}\n"
                 f"Tell me which one, e.g.:  python3 make_video.py {found[0].name}")
    print("No data CSV found yet, so I'm using the MADE-UP sample data for now.")
    return SAMPLE_FILE


def main():
    parser = argparse.ArgumentParser(description="Make the bar chart race video.")
    parser.add_argument("csv", nargs="?", help="your data file (year, name, count)")
    parser.add_argument("--preview", action="store_true", help="save 4 still images only")
    parser.add_argument("--sample", action="store_true", help="use the made-up sample data")
    args = parser.parse_args()

    data_path = find_data_file(args.csv, args.sample)
    print(f"Step 1/4: Reading {data_path.name}…")
    tl = Timeline(data_path, FACTS_FILE, verbose=True)
    years = sorted(set(tl.year_label))
    print(f"   {len(years)} years ({years[0]}–{years[-1]}), {len(tl.names)} shows in the file, "
          f"{len(tl.shown)} of them reach the top {TOP_N}. {len(tl.facts)} facts.")
    print(f"Step 2/4: Planned {tl.n_frames:,} frames = {tl.n_frames / FPS:.1f} seconds at {FPS} fps.")

    if args.preview:
        print("Step 3/4: Drawing preview pictures…")
        render_preview(tl)
        print("Done. (Preview only, no video made.)")
        return

    render_video(tl, data_path)
    size_mb = OUTPUT_FILE.stat().st_size / 1e6
    print(f"Done! Your video: {OUTPUT_FILE}  ({size_mb:.0f} MB)")


if __name__ == "__main__":
    main()
