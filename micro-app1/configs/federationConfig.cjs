const dependencies = require('../package.json').dependencies;
module.exports = {
  name: 'app1',
  filename: 'remoteEntry.js',
  remotes: {
    'host': 'host@http://localhost:4000/remoteEntry.js'
  },
  exposes: {
    './User': './src/pages/User',
    './Router': './src/router/routes'
  },
  shared: {
    ...dependencies
  },
};
