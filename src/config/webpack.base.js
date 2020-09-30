import path from "path";
import webpack from "webpack";

import { env } from "decentraland-commons";

export default {
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: "file-loader",
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?mimetype=image/svg+xml",
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.s?css/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../webapp"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NETWORK": JSON.stringify(
        env.get("ETHEREUM_PROVIDER").includes("mainnet") ? "mainnet" : "kovan"
      ),
    }),
  ],
};
