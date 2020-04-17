const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

module.exports = {
    lintOnSave: false,

    devServer: {
        host: process.env.VUE_APP_HOST,
        port: process.env.VUE_APP_PORT,
        progress: false
    },

    pluginOptions: {
        electronBuilder: {
            builderOptions: {}
        }
    },

    assetsDir: 'assets',
    productionSourceMap: false,

    css: {
        sourceMap: true,
        extract: false
    },

    configureWebpack: {
        plugins: [new BitBarWebpackProgressPlugin()]
    }
};
