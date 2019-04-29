import * as babel from '@babel/core'
const UglifyJS = require('uglify-js')

export default {
  compressCode: function (code) {
    return new Promise(function (resolve, reject) {
      babel.transform(code, {
        'presets': [
          '@babel/preset-env'
        ],
        'plugins': [
          // 'syntax-dynamic-import',
          // 'transform-object-rest-spread',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-object-assign',
          'transform-class-properties'
        ]
      }, function (err, result) {
        if (err) {
          reject(err)
        } else {
          let minified = UglifyJS.minify(result.code)
          // console.trace(minified.error); // runtime error, or `undefined` if no error
          // console.trace(minified.code);  // minified output: function add(n,d){return n+d}
          if (minified && (!minified.error)) {
            resolve(minified.code)
          }
          reject(minified.error)
        }
      })
    })
  }
}
