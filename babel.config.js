module.exports = function (api) {
    api.cache(true);

    plugins: ['macros'];
  
    return {
      plugins
    };
  }