import vue from 'vue';
import compositionAPI, { ref, watch, computed } from '@vue/composition-api';
import tmdbAPI from '~api/tmdb';

vue.use(compositionAPI);

const token = ref(localStorage.getItem('token') ?? null);

export default function useAuthentication() {
    const getNewRequestToken = async () => {
        const requestToken = await tmdbAPI.auth.getRequestToken();
        tmdbAPI.auth.askPermission(requestToken);
    };

    const getNewSessionID = async (requestToken) => {
        const sessionID = await tmdbAPI.auth.getSessionID(requestToken);
        token.value = sessionID;
        return sessionID;
    };

    watch(token, () => {
        if (token.value) {
            localStorage.setItem('token', token.value);
            tmdbAPI.setting.setToken(token.value);
        }
    });

    const isAuthenticated = computed(() => {
        return !!token;
    });

    return {
        getNewRequestToken,
        getNewSessionID,
        token,
        isAuthenticated
    };
}
