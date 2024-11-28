const dependencies = require('../package.json').dependencies;
module.exports = {
  name: 'common',
  filename: 'remoteEntry.js',
  exposes: {
    './utils': './src/utils/index',
    './store': './src/store/index',
  },
  shared: {
    ...dependencies
  },
};
