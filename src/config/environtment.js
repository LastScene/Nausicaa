export const nodeENV = process.env.NODE_ENV;

export const isProduction = nodeENV === 'production';
export const isStaging = nodeENV === 'staging';
export const isDevelopment = nodeENV === 'development';
export const isElectron = process.env.IS_ELECTRON;

export const onlyInDev = (func) => {
    if (isDevelopment) {
        func();
    }
};
export const onlyInProd = (func) => {
    if (isProduction) {
        func();
    }
};

export default nodeENV;
