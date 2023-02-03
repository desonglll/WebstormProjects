const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  optimization: {
    minimize: false, // 关闭代码压缩，可选
  },

  mode: "development",

  //指定入口文件
  entry: "./src/index.ts",

  //   devtool: "inline-source-map",

  //   devServer: {
  //     contentBase: "./dist",
  //   },

  output: {
    path: path.resolve(__dirname, "dist"),
    //打包后文件的名字
    filename: "bundle.js",
    // environment: {
    //   arrowFunction: false, // 关闭webpack的箭头函数，可选
    // },
    environment: {
      arrowFunction: false,
    },
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "TS测试",
      template: "./index.html",
    }),
  ],
};
