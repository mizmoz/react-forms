
const path = require('path');
const autoprefixer = require('autoprefixer');
const inputrange = require('postcss-input-range');

module.exports = (storybookBaseConfig, configType) => {
  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'postcss'],
    include: path.resolve(__dirname, '../sass'),
  });

  storybookBaseConfig.postcss = [
    inputrange(),
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ];

  storybookBaseConfig.resolve = {
    extensions: ['', '.js', '.jsx', '.scss'],
  };

  return storybookBaseConfig;
};
