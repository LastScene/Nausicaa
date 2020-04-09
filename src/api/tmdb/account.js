import jwtDecoder from 'jwt-decode';

const account = (tmdbHttp) => {
    return {
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
        async getDetails(accessToken = localStorage.getItem('accessToken')) {
            const details = await tmdbHttp.get('/3/account');

            return {
                id: {
                    v3: details.id,
                    v4: jwtDecoder(accessToken).sub
                },
                avatar: `https://www.gravatar.com/avatar/${details.avatar.gravatar.hash}`,
                name: details.name,
                username: details.username
            };
        }
    };
};
export default account;
