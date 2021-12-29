const HtmlWebPackPlugin = require("html-webpack-plugin"); // installed via npm
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => ({
  context: __dirname,
  mode: 'development',
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|svg|webp|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./images",
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@app": path.resolve(__dirname, "src/app"),
      "@images": path.resolve(__dirname, "src/app/images"),
      "@middleware": path.resolve(__dirname, "src/app/middleware"),
    },
  },
  devServer: {
    // contentBase: path.join(__dirname, "/"),
    // historyApiFallBack: true,
    // hot: true,
    // contentBase: __dirname + "/public/",
    // inline: true,
    compress: true,
    historyApiFallback: true,
    port: 3010,
    host: '0.0.0.0',
    static:'./'
    // target: 'http://0.0.0.0:3010'
    // proxy: [{
    //   context: ["http://20.52.134.193:3010"], // endpoints which you want to proxy
    //   target: 'http://20.52.134.193:3010' // your main server address
    // }],
    // allowedHosts: 'all',
    // bonjour: true,
    // client: {
    //   webSocketURL: 'ws://0.0.0.0:3010',
    // },
    // allowedHosts: [
    //   'http://20.52.134.193:3010',
    //   'http://20.52.134.193:8080',
    //   'http://20.52.134.193:8080/auth/'
    // ],
    // firewall: false, 
    // useLocalIp: true,
    // contentBase: [
    //   path.join(__dirname.join(__dirname, "/"), 'public'),
    //   path.join(__dirname, 'dist')
    // ]
    // inline:true
    // disableHostCheck: true,
    // public: 'store-client-nestroia1.c9users.io'
    //publicPath: "http://0.0.0.0:3010",
    //hotOnly: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      favicon: path.resolve(__dirname, "public/helixSenseLogo.png"),
    }),
    new webpack.DefinePlugin({
      "env": {
        TARGET_ENV: JSON.stringify(env ? env.TARGET_ENV : "development"),
        ENV: JSON.stringify(process.env.ENV),
      },
    }),
    new Dotenv(),
  ],
});
