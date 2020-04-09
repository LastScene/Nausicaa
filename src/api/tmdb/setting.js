import {
    setToken as setHttpToken,
    removeToken as removeHttpToken,
    setParam as setHttpParam
} from '~services/http';

const setting = (tmdbHttp) => {
    return {
        setToken(accessToken) {
            setHttpToken(tmdbHttp, accessToken);
        },
        removeToken() {
            removeHttpToken(tmdbHttp);
        },
        setParam(key, value) {
            setHttpParam(tmdbHttp, key, value);
        }
    };
};

export default setting;
