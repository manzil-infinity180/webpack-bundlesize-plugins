const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bundleSizePlugins = require("./bundlesize-webpack-plugin/index");
module.exports = {
    mode:"development",
    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    plugins: [new bundleSizePlugins({
        sizeLimit: 4
    }), new HtmlWebpackPlugin()]
}