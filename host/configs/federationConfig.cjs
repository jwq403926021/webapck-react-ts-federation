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
      ...dependencies
    },
  };
};

module.exports = generateFederationConfig;
