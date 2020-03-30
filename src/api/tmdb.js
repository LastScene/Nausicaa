import vue from 'vue';
import compositionAPI, { ref } from '@vue/composition-api';
import {
    createHttp,
    setToken as setHttpToken,
    removeToken as removeHttpToken,
    setParam as setHttpParam
} from '~services/http';

vue.use(compositionAPI);

// tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';
export const tmdbHttp = createHttp({
    baseURL: 'https://api.themoviedb.org',
    timeout: 5000
});

setHttpParam(tmdbHttp, 'api_key', process.env.VUE_APP_TMDB_API_KEY);
setHttpParam(tmdbHttp, 'session_id', localStorage.getItem('sessionID'));
setHttpToken(tmdbHttp, localStorage.getItem('accessToken') || process.env.VUE_APP_TMDB_ACCESS_TOKEN);

export default {
    setting: {
        setToken(accessToken) {
            setHttpToken(tmdbHttp, accessToken);
        },
        removeToken() {
            removeHttpToken(tmdbHttp);
        },
        setParam(key, value) {
            setHttpParam(tmdbHttp, key, value);
        }
    },

    account: {
        async getRequestToken() {
            const { request_token: tmdbRequestToken } = await tmdbHttp.post('/4/auth/request_token');
            return tmdbRequestToken;
        },
        async askPermission(requestToken) {
            window.open(
                `https://www.themoviedb.org/auth/access?request_token=${requestToken}&redirect_to=http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/auth`,
                '_blank'
            );
        },
        async getAccessToken(requestToken) {
            try {
                if (!requestToken) throw new Error('No request token provided!');
                const { access_token: tmdbAccessToken } = await tmdbHttp.post('/4/auth/access_token', {
                    request_token: requestToken
                });
                return tmdbAccessToken;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async convertAccessTokenToSessionID(accessToken) {
            try {
                if (!accessToken) throw new Error('No access token provided!');
                const { session_id: tmdbSessionID } = await tmdbHttp.post('/3/authentication/session/convert/4', {
                    access_token: accessToken
                });
                return tmdbSessionID;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async getDetails() {
            const details = await tmdbHttp.get('/3/account');
            return details;
        }
    }
};
