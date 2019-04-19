const UglifyJS = require('uglify-js')

export default {
  compressCode: function (code) {
    let result = UglifyJS.minify(code)
    // console.trace(result.error); // runtime error, or `undefined` if no error
    // console.trace(result.code);  // minified output: function add(n,d){return n+d}
    if (result && (!result.error)) {
      return result.code
    }
    throw result.error
  }
}
