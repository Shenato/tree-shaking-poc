const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "../");
const SRC_PATH = path.resolve(ROOT_DIR, "example-app");

module.exports = {
  mode: "development",
  entry: [
    path.resolve(SRC_PATH, "index.tsx"),
    path.resolve(SRC_PATH, "minimal-index.tsx"),
  ],

  output: {
    publicPath: "/",
    filename: "[name].js",

    path: path.resolve(ROOT_DIR, "build"),
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, "index.html"),
      inject: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(SRC_PATH, "assets"),
        to: "assets",
      },
      { from: path.resolve(SRC_PATH, "public"), to: "./" },
    ]),
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx|js|jsx)$/,
        include: [SRC_PATH],
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["syntax-dynamic-import"],

              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [SRC_PATH],
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".json"],
    alias: {
      Assets: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "assets")),
      Components: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "components")),
      Containers: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "containers")),
      Pages: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "pages")),
      Public: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "public")),
      Services: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "services")),
      Store: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "store")),
      Styles: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "styles")),
      Utils: path.resolve(ROOT_DIR, path.resolve(SRC_PATH, "utils")),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
  devtool: "source-map",
  devServer: {
    static: [path.join(ROOT_DIR, "build")],
    historyApiFallback: true,
    open: true,
    port: process.env.PORT || 3000,
  },
};
