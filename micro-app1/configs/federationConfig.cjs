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
    },
    'react-dom': {
      singleton: true,
    },
    "react-router-dom": {
      singleton: true
    },
    "react-router": {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    }
  },
};
