const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

module.exports = {
    lintOnSave: false,

    devServer: {
        host: process.env.VUE_APP_HOST,
        port: process.env.VUE_APP_PORT,
        progress: false
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                './src/assets/styles/helpers/*.scss',
                './src/assets/styles/variables/*.scss',
                './src/assets/styles/interface/*.scss'
            ]
        }
    },

    assetsDir: 'assets',
    productionSourceMap: false,

    css: {
        sourceMap: true
    },

    configureWebpack: {
        plugins: [
            new BitBarWebpackProgressPlugin()
        ]
    }
};
