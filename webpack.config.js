const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: {
      app: "./src/js/app.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      chunkFilename: "[name].chunk.js",
      publicPath: "/wp-content/themes/landon-framework/dist/",
    },
    devtool: isProd ? false : "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              // Keeps it simple; good browser coverage without overthinking
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: !isProd } },
            { loader: "postcss-loader", options: { sourceMap: !isProd } },
            { loader: "sass-loader", options: { sourceMap: !isProd } },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname),
      },
      devMiddleware: {
        writeToDisk: true, // important for WP themes
      },
      hot: false,
      liveReload: true,
      port: 8080,
      client: {
        overlay: true,
      },
    },
  };
};
