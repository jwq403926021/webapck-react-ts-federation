const { dependencies } = require('../package.json');

const generateFederationConfig = (remoteApps) => {
  return {
    name: 'host',
    filename: 'remoteEntry.js',
    manifest: true,
    remotes: Object.keys(remoteApps).reduce((previousValue, key) => {
      previousValue[key] = `${key}@${remoteApps[key]}/mf-manifest.json`
      return previousValue
    }, {}),
    shared: {
      ...dependencies
    },
  };
};

module.exports = generateFederationConfig;
