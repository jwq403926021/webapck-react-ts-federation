const dependencies = require('../package.json').dependencies;
module.exports = {
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './User': './src/pages/User'
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
};
