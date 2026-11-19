# Bar chart race: Québec's Top 10 TV shows & series (1980–2026)

Makes a vertical **1080 × 1920, 60 fps MP4** video from a CSV file.

## What's in this folder

| File | What it is |
|---|---|
| `make_video.py` | The program. Settings (title, speed, colors) are at the top, in **Section 1**. |
| `facts.csv` | The "Did you know?" texts. One per line: `year,fact`. Each fact stays on screen until the next one's year. |
| `sample_data_FAKE.csv` | **Made-up numbers** (real show titles) used only for testing. |
| `output/` | Where the video ends up: `output/quebec_top10_race.mp4`. |

## One-time setup

You need Python 3, plus three add-ons. In a terminal:

    pip install pandas matplotlib numpy

You also need **ffmpeg** (the program that builds the video). If you don't have it:

    pip install imageio-ffmpeg

## Your data

A CSV with three columns (Excel / Google Sheets "Save as CSV" works, commas or semicolons):

    year,name,count
    1980,Le Temps d'une paix,1071
    1980,Terre humaine,1596
    ...

Put it in this folder (any file name). If there's only one CSV besides the two above, it's found automatically.

## Make the video

    python3 make_video.py --preview   # 4 still pictures in output/ (takes a few seconds)
    python3 make_video.py             # the full video (about 1–3 minutes)

## Common changes (all in Section 1 of make_video.py)

- **Slower / faster:** `SECONDS_PER_YEAR = 1.5`
- **Title text:** `TITLE_LINES`, `SUBTITLE`, `SOURCE_TEXT`
- **French number style (1 234):** `NUMBER_STYLE = "fr"`
- **Show running totals instead of yearly numbers:** `CUMULATIVE = True`
