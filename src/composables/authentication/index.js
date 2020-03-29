import Vue from 'vue';
import compositionAPI, { watch, computed } from '@vue/composition-api';
import { useRetry } from 'vue-composable';
import useTmdbAPI from '~api/tmdb';

Vue.use(compositionAPI);

export default function useAuthentication() {
    const { useAccount, useSetting } = useTmdbAPI();
    const {
        accessToken,
        requestToken,
        getRequestToken,
        askPermission,
        getAccessToken
    } = useAccount({
        token: localStorage.getItem('token')
    });

    async function getNewToken() {
        await getRequestToken();

        askPermission();

        const { cancel: stopTrying, exec: retry } = useRetry({
            retryDelay() {
                return 500;
            }
        });
        return retry(async () => {
            try {
                const accessToken = await getAccessToken();
                return Promise.resolve(accessToken);
            } catch (error) {
                if (error.status == 422) {
                    throw error;
                }
                stopTrying();
            }
        });
    }

    const { setToken } = useSetting();
    watch(accessToken, () => {
        if (accessToken.value) {
            localStorage.setItem('accessToken', accessToken.value);
            setToken(accessToken.value);
        }
    }, {
        lazy: true
    });

    const isAuthenticated = computed(() => {
        return !!accessToken.value;
    });

    return {
        requestToken,
        accessToken,
        isAuthenticated,
        getNewToken
    };
}
