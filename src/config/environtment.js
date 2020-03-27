export const nodeENV = process.env.NODE_ENV;

export const isProduction = nodeENV === 'production';
export const isStaging = nodeENV === 'staging';
export const isDevelopment = nodeENV === 'development';

export default nodeENV;
