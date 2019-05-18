const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

export default (config, env, helpers) => {
  
  if (env.isProd) {   

    // Make async work
    let babel = config.module.loaders.filter( loader => loader.loader === 'babel-loader')[0].options;
    // Blacklist regenerator within env preset:
    babel.presets[0][1].exclude.push('transform-async-to-generator');
    // Add fast-async
    babel.plugins.push([require.resolve('fast-async'), { spec: true }]);
  }
};

export default (config) => {
  const precacheConfig = {
    staticFileGlobs: [], //empty array so nothing will be a precached at all
    clientsClaim: true, // this sw will now control all tabs of your site open
    skipWaiting: true, // as soon as your browsers looks at this it unregister already registered sw.js and makes this one main
  };

  return preactCliSwPrecachePlugin(config, precacheConfig);
}