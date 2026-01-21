// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode || "development",
    entry: "./src/js/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: isProduction ? false : "eval-source-map",
    devServer: {
      watchFiles: ["./src/template.html"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
