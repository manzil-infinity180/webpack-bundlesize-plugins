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
            const k = 1024;
            const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
            const i = Math.floor(Math.log(size) / Math.log(k));
            const sizeWithoutUnit = parseFloat(size / Math.pow(k,i)).toFixed(3);
            const sizeWithUnit = `${sizeWithoutUnit} ${sizes[i]}`;
            const bundleSizeLimit = this.options.sizeLimit
            const bundleSizeLimitWithoutUnit = parseFloat(bundleSizeLimit / Math.pow(k,i)).toFixed(3);
            const bundleSizeLimitWithUnit = `${bundleSizeLimitWithoutUnit} ${sizes[i]}`;
            if(sizeWithoutUnit < bundleSizeLimit){
                console.log("Safe:Bundle-Size ", sizeWithUnit, "\nSize Limit: ",bundleSizeLimitWithUnit);
            }else if(sizeWithoutUnit === bundleSizeLimit){
                console.warn("Warn:Bundle-Size ",sizeWithUnit, "\nSize Limit: ",bundleSizeLimitWithUnit);
            }else {
                console.error("Unsafe:Bundle-Size ", sizeWithUnit, "\nSize Limit: ",bundleSizeLimitWithUnit);
            }
          });
    }
} 