const path = require('path')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const version = process.env.VERSION || require('../package.json').version
const banner =
  `/**
 * good-storage v${version}
 * (c) ${new Date().getFullYear()} ustbhuangyi
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    input: resolve('src/index.js'),
    file: resolve('dist/storage.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('src/index.js'),
    file: resolve('dist/storage.min.js'),
    format: 'umd',
    env: 'production'
  },
  esm: {
    input: resolve('src/index.js'),
    file: resolve('dist/storage.esm.js'),
    format: 'es'
  }
}

function genConfig (opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        replace({
          __VERSION__: version
        }),
        babel({
          exclude: 'node_modules/**'
        })
      ]
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'Storage'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)
