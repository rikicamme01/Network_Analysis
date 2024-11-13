const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {  
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
    publicPath: "/", // Aggiunto per garantire che tutte le richieste puntino alla root
  },
  devServer: {
    historyApiFallback: true, // Aggiungi questa linea per gestire il routing lato client
    static: path.resolve(__dirname, "./static/frontend"), // Path per i file statici
    port: 8000, // Puoi specificare una porta di tua scelta per il server di sviluppo
    open:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i, // Regola per i file CSS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
