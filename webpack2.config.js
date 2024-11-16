const path = require('path');

module.exports = {
  entry: './options.js',  // エントリーポイント
  output: {
    filename: 'bundle2.js',  // 出力されるバンドルファイル名
    path: path.resolve(__dirname, 'dist'),  // 出力先ディレクトリ
  },
  mode: 'production',  // プロダクションモード
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Babelでトランスパイル
          options: {
            presets: ['@babel/preset-env'],  // モダンなJavaScriptをブラウザ向けに変換
          },
        },
      },
    ],
  },
};
