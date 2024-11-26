const dependencies = require('../package.json').dependencies;
module.exports = {
  name: 'app1',
  filename: 'remoteEntry.js',
  remotes: {
    'common': 'common@http://localhost:3002/remoteEntry.js'
  },
  exposes: {
    './User': './src/pages/User',
    './Router': './src/router/routes'
  },
  shared: {
    ...dependencies
  },
};
