import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Three ways to build:
//  - `vite`               local dev at /
//  - `vite build`         static site for GitHub Pages, served under /ascendant/quebec-adoption/
//  - `vite build --mode single`  one self-contained HTML file (fonts + JS + CSS inlined) for previews
export default defineConfig(({ command, mode }) => {
  const single = mode === 'single'
  return {
    base: command === 'build' && !single ? '/ascendant/quebec-adoption/' : './',
    plugins: single ? [viteSingleFile({ removeViteModuleLoader: true })] : [],
    build: single
      ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000, cssCodeSplit: false }
      : { outDir: 'dist' },
    server: { host: true },
  }
})
