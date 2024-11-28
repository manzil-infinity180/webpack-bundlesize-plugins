const {resolve} = require("path");
const fs = require("fs");
module.exports = class BundleSizeWebpack {
    constructor(options) {
        this.options = options || {
            sizeLimit: 3
          };
    }
    apply(compiler){
        compiler.hooks.done.tap("BundleSizePlugin", stats => {
            const { path, filename } = stats.compilation.options.output;
            const bundlePath = resolve(path, filename);
            const { size } = fs.statSync(bundlePath);
            console.log(size/1024); // size in bytes
          });
    }
} 