import Vue from 'vue';
import compositionAPI, { watch, computed, ref } from '@vue/composition-api';
import { useRetry } from 'vue-composable';
import { tmdbAPI } from '~api';

Vue.use(compositionAPI);

export default function useAuthentication() {
    const requestToken = ref(null);
    const sessionID = ref(localStorage.getItem('sessionID') || null);
    const accessToken = ref(localStorage.getItem('accessToken') || null);
    async function getNewToken() {
        requestToken.value = await tmdbAPI.account.getRequestToken();
        tmdbAPI.account.askPermission(requestToken.value);
        const { cancel: stopTrying, exec: retry } = useRetry({
            retryDelay() {
                return 2000;
            }
        });
        return setTimeout(() => {
            return retry(async () => {
                try {
                    accessToken.value = await tmdbAPI.account.getAccessToken(requestToken.value);
                    sessionID.value = await tmdbAPI.account.convertAccessTokenToSessionID(accessToken.value);
                    return Promise.resolve(accessToken);
                } catch (error) {
                    console.dir(error);
                    if (error.status == 422 || error.status == 401) {
                        throw error;
                    }
                    stopTrying();
                }
            });
        }, 2000);
    }

    watch(accessToken, () => {
        if (accessToken.value) {
            localStorage.setItem('accessToken', accessToken.value);
            tmdbAPI.setting.setToken(accessToken.value);
        }
    }, { lazy: true });
    watch(sessionID, () => {
        if (sessionID.value) {
            localStorage.setItem('sessionID', sessionID.value);
            tmdbAPI.setting.setParam('session_id', sessionID.value);
        }
    }, { lazy: true });

    const isAuthenticated = computed(() => {
        return !!accessToken.value && !!sessionID.value;
    });

    return {
        requestToken,
        accessToken,
        sessionID,
        isAuthenticated,
        getNewToken
    };
}
