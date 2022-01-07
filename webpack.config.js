import path from 'path'

export default function () {
  return {
    entry: path.resolve('src/index.ts'),
    output: {
      path: path.resolve('public'),
      filename: 'app.js'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: 'ts-loader'
        }
      ]
    },
    mode: 'development',
    devtool: 'inline-source-map'
  }
}