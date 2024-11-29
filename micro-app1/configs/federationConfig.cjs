const dependencies = require('../package.json').dependencies;
module.exports = {
  name: 'app1',
  filename: 'remoteEntry.js',
  manifest: true,
  remotes: {
    'common': 'common@http://localhost:3002/mf-manifest.json'
  },
  exposes: {
    './User': './src/pages/User',
    './Router': './src/router/routes'
  },
  shared: {
    ...dependencies
  },
};
