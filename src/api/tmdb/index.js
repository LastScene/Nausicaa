import { createHttp, setParam as setHttpParam, setToken as setHttpToken } from '~services/http';
import setting from './setting';
import account from './account';
import list from './list';

// tmdb.common.images_uri = 'https://image.tmdb.org/t/p/';
export const tmdbHttp = createHttp({
    baseURL: 'https://api.themoviedb.org',
    timeout: 5000
});

setHttpParam(tmdbHttp, 'api_key', process.env.VUE_APP_TMDB_API_KEY);
setHttpParam(tmdbHttp, 'session_id', localStorage.getItem('sessionID'));
setHttpToken(tmdbHttp, localStorage.getItem('accessToken') || process.env.VUE_APP_TMDB_ACCESS_TOKEN);

export default {
    setting: setting(tmdbHttp),
    account: account(tmdbHttp),
    list: list(tmdbHttp)
};
