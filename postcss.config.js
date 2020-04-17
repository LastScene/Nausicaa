/* eslint-disable quote-props */
const isProduction = process.env.NODE_ENV === 'production';
const onlyInProd = (plugin, options) => {
    if (isProduction) {
        return {
            [plugin]: options
        };
    }
};

module.exports = {
    map: true,
    plugins: {
        'postcss-import': {},
        '~styles/postcss-plugins/bem.js': {},
        'postcss-preset-env': {
            autoprefixer: false
        },
        precss: {},
        'postcss-media-minmax': {},
        'postcss-hocus': {},
        'postcss-placehold': {},
        'postcss-shape': {},
        'postcss-input-style': {},
        'postcss-short': {},
        'postcss-aspect-ratio': {},
        'postcss-gradient-transparency-fix': {},
        'postcss-easing-gradients': {},
        'postcss-flexbox': {},
        tailwindcss: './node_modules/~styles/tailwind.config.js',
        'postcss-color-function': {},
        rfs: {},
        ...onlyInProd('@fullhuman/postcss-purgecss', {
            content: ['./public/**/*.html', './src/**/*.vue'],
            defaultExtractor: (content) => {
                return content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
            },
            whitelistPatterns: [
                /-(leave|enter|appear)(|-(to|from|active))$/,
                /^(?!cursor-move).+-move$/,
                /^router-link(|-exact)-active$/
            ]
        }),
        ...onlyInProd('cssnano', {
            preset: 'default'
        }),
        autoprefixer: {}
    }
};
