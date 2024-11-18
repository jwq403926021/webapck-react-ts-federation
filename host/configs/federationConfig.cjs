const { dependencies } = require('../package.json');

const generateFederationConfig = (remoteApps) => {
  return {
    name: 'host',
    filename: 'remoteEntry.js',
    remotes: Object.keys(remoteApps).reduce((previousValue, key) => {
      previousValue[key] = `${key}@${remoteApps[key]}/remoteEntry.js`
      return previousValue
    }, {}),
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
      "react-router-dom": {
        singleton: true,
        requiredVersion: dependencies['react-router-dom'],
      },
      "react-router": {
        singleton: true,
        requiredVersion: dependencies['react-router-dom'],
      }
    },
  };
};

module.exports = generateFederationConfig;
