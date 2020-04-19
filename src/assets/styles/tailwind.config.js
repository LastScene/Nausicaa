module.exports = {
    theme: {
        colors: {
            primary: {
                100: '#FDFDFE',
                200: '#D1D3E0',
                300: '#A4A9C3',
                400: '#767EA6',
                500: '#48538A',
                600: '#3E4776',
                700: '#333B61',
                800: '#282E4D',
                900: '#1E2238',
                accent: {
                    100: '#F6F1E6',
                    200: '#E5D4B3',
                    300: '#d4b881',
                    400: '#C7AB76',
                    500: '#B99F6B',
                    600: '#AB9261',
                    700: '#9D8557',
                    800: '#806B43',
                    900: '#715E3A'
                }
            },
            secondary: {
                100: '#FEFDFD',
                200: '#E0D4D6',
                300: '#C3AAAE',
                400: '#A68086',
                500: '#8A555D',
                600: '#76494F',
                700: '#613C42',
                800: '#4D3034',
                900: '#392326'
            },
            gray: {
                100: '#FCFCFC',
                200: '#E0E0E0',
                300: '#C4C4C4',
                400: '#A8A8A8',
                500: '#8C8C8C',
                600: '#707070',
                700: '#545454',
                800: '#383838',
                900: '#1C1C1C'
            }
        },
        spacing: {
            1: '0.236rem',
            2: '0.382rem',
            3: '0.618rem',
            4: '1rem',
            5: '1.618rem',
            6: '2.618rem',
            7: '4.236rem',
            8: '6.854rem',
            9: '11.089rem',
            10: '17.942rem',
            11: '29.03rem',
            12: '46.971rem',
            13: '75.999rem'
        },
        fontFamily: {
            primary: '"Linotte"'
        },
        fontSize: {
            'tiny': '0.512rem',
            'xs': '0.64rem',
            'sm': '0.8rem',
            'base': '1rem',
            'lg': '1.25rem',
            'xl': '1.563rem',
            '2xl': '1.953rem',
            '3xl': '2.441rem',
            '4xl': '3.052rem',
            '5xl': '3.815rem'
        },
        fontWeight: {
            light: 300,
            regular: 400,
            semibold: 600,
            bold: 700,
            black: 900
        },
        lineHeight: {
            oneLine: '1',
            compact: '1.5',
            default: '1.618',
            loose: '1.83'
        },
        aspectRatio: {
            square: [1, 1],
            poster: [24, 36]
        },
        borderRadius: {
            default: '8px',
            more: '16px',
            full: '20em'
        },
        boxShadow: {
            'neo-less': '-3px -3px 10px var(--top-shaodw, rgba(255, 255, 255, 1)), 3px 3px 10px var(--bottom-shaodw, rgba(0, 0, 0, .1))',
            'neo-default': '-7px -7px 20px white, 7px 7px 20px rgba(0, 0, 0, 0.45)',
            'neo-inset': 'inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFFFFF',
            'xl': '0 10px 70px rgba(0, 0, 0, 0.3)'
        },
        transitionDuration: {
            slow: '0.75s',
            default: '0.17s',
            fast: '0.08s'
        },
        transitionTimingFunction: {

        },
        zIndex: {
            underground: '-1',
            sea: '0',
            land: '1',
            hill: '2',
            mountain: '3',
            cloud: '4',
            moon: '5',
            sun: '6'
        }
    },
    variants: {
        rfsFontSize: ['responsive'],
        rfsPadding: ['responsive'],
        rfsMargin: ['responsive'],
        rfsWidth: ['responsive'],
        rfsMaxWidth: ['responsive'],
        rfsMinWidth: ['responsive'],
        rfsHeight: ['responsive'],
        rfsMaxHeight: ['responsive'],
        rfsMinHeight: ['responsive']
    },
    plugins: [
        require('tailwindcss-aspect-ratio'),
        require('tailwindcss-theming'),
        require('tailwindcss-rfs')({
            prefix: 'rfs-',
            suffix: '',
            fontSizeUtilities: true,
            paddingUtilities: true,
            marginUtilities: true,
            widthUtilities: true,
            maxWidthUtilities: true,
            minWidthUtilities: true,
            heightUtilities: true,
            maxHeightUtilities: true,
            minHeightUtilities: true
        })
    ],
    corePlugins: {
        fontSize: false,
        padding: false,
        margin: false,
        width: false,
        maxWidth: false,
        minWidth: false,
        height: false,
        maxHeight: false,
        minHeight: false,
        flex: false,
        float: false,
        transitionProperty: false
    }
};
