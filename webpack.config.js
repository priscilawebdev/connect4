const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (__, args) => ({
  devtool: args.mode === "development" ? "source-map" : "eval",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }, { loader: "baggage-loader?index.sass" }]
      },
      {
        test: /\.sass?$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils")
    }
  }
});
