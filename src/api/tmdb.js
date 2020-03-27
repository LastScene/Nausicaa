import {
    createHttp, setParam, setToken, removeToken
} from '~services/http';

// tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';
export const tmdbHttp = createHttp({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 5000
});

setParam(tmdbHttp, 'api_key', process.env.VUE_APP_TMDB_API_KEY);

export default {
    setting: {
        setToken(token) {
            setToken(tmdbHttp, token);
        },
        removeToken() {
            removeToken(tmdbHttp);
        }
    },
    auth: {
        async getRequestToken() {
            const { request_token: requestToken } = await tmdbHttp.get('/authentication/token/new');
            return requestToken;
        },
        async askPermission(requestToken) {
            window.location = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/auth`;
        },
        async getSessionID(requestToken) {
            const { session_id: sessionID } = await tmdbHttp.post('/authentication/session/new', {
                request_token: requestToken
            });
            return sessionID;
        }
    }
};
