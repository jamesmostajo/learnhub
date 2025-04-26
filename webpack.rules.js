module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  
  {
    test: /\.mp3$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[hash].[ext]',
        outputPath: 'assets/sounds/',
      },
    },
  },
  // Other loader rules (for example, TypeScript loader) can go here...
];
