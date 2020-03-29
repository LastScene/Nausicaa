import vue from 'vue';
import compositionAPI, { ref } from '@vue/composition-api';
import { createHttp, setToken as setHttpToken, removeToken as removeHttpToken } from '~services/http';

vue.use(compositionAPI);

// tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';
export const tmdbHttp = createHttp({
    baseURL: 'https://api.themoviedb.org/4/',
    timeout: 5000
});

setHttpToken(tmdbHttp, process.env.VUE_APP_TMDB_ACCESS_TOKEN);

export default function useTmdbAPI() {
    function useSetting() {
        function setToken(accessToken) {
            setHttpToken(tmdbHttp, accessToken);
        }
        function removeToken() {
            removeHttpToken(tmdbHttp);
        }

        return {
            setToken,
            removeToken
        };
    }

    function useAccount(existingToken) {
        const requestToken = ref(null);
        const accessToken = ref(existingToken);
        const accountID = ref(null);

        async function getRequestToken() {
            const { request_token: tmdbRequestToken } = await tmdbHttp.post('/auth/request_token');
            requestToken.value = tmdbRequestToken;
        }
        async function askPermission() {
            window.open(
                `https://www.themoviedb.org/auth/access?request_token=${requestToken.value}&redirect_to=http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/auth`,
                '_blank'
            );
        }
        async function getAccessToken() {
            try {
                if (!requestToken.value) throw new Error('No request token provided!');
                const { access_token: tmdbAccessToken, account_id: tmdbAccountID } = await tmdbHttp.post('/auth/access_token', {
                    request_token: requestToken.value
                });
                accessToken.value = tmdbAccessToken;
                accountID.value = tmdbAccountID;
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return {
            requestToken,
            accessToken,
            getRequestToken,
            askPermission,
            getAccessToken
        };
    }

    const account = {
        async getDetails() {
            const details = await tmdbHttp.get('/account');
            return details;
        }
    };
    const library = {
        async init() {
            const allLists = await tmdbHttp.get();
        // const { success } = await tmdbHttp.post('/list', {
        //     name: 'Archive',
        //     description: 'Archived movies. (Created by LastScene)',
        //     language: 'en'
        // });
        }
    };

    return {
        useSetting,
        useAccount,
        account,
        library
    };
}
