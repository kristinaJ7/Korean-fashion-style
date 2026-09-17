const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const port = isDev ? 8080 : 3000;

  return {
    entry: path.resolve(__dirname, './src/index.tsx'),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.module\.css$/i,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext]',
          },
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({
        path: './.env',
        safe: false,
        systemvars: true,
        defaults: false,
        silent: false,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@ui': path.resolve(__dirname, 'src/components/ui'),
        '@ui-pages': path.resolve(__dirname, 'src/components/ui/pages'),
        '@utils-types': path.resolve(__dirname, 'src/utils/types'),
        '@api': path.resolve(__dirname, 'src/utils'),
        '@slices': path.resolve(__dirname, 'src/services/slices'),
        '@selectors': path.resolve(__dirname, 'src/services/selectors'),
      },
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      clean: true,
    
    },
    devServer: {
      static: path.join(__dirname, './public'),
      compress: true,
      historyApiFallback: true,
      port: port,
      hot: isDev,
      open: true,
    },
  };
};
