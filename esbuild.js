const esbuild = require('esbuild')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')
const fs = require('fs')

const { join } = require('path')

const outDir = './public/build'
if (fs.existsSync(join(__dirname, outDir))) { fs.rmSync(join(__dirname, outDir), { recursive: true }) }

esbuild
  .build({
    entryPoints: ['index.js', 'showValues.js'],
    bundle: true,
    minify: true,
    target: ['chrome58'],
    // outfile: 'bundle.js',
    outdir: 'build',
    format: 'esm',
    splitting: true,
    define: {
      global: 'window'
    },
    plugins: [NodeModulesPolyfillPlugin(), NodeGlobalsPolyfillPlugin()]
  })
  .catch(() => process.exit(1))
