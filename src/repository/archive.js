import Vue from 'vue';
import VueCompositionApi, { reactive, toRefs } from '@vue/composition-api';
import asyncForEach from 'asyncforeach-promise';
import _merge from 'lodash/merge';
import { tmdbAPI } from '~api$';
import accountRepo from './account';

Vue.use(VueCompositionApi);

const state = reactive({
    list: []
});

const modifiers = {
    async getAll() {
        const archiveList = await tmdbAPI.list.getSpecial('archive', accountRepo.$.id.v4);
        asyncForEach(archiveList, async (archiveListItem, index, next) => {
            const movieDetails = await tmdbAPI.movie.getDetails(archiveListItem.id);
            const movieCredits = await tmdbAPI.movie.getCredits(archiveListItem.id);
            const resolvedMovie = _merge(archiveListItem, movieDetails, movieCredits);
            state.list.push({
                ...resolvedMovie,
                id: String(resolvedMovie.id),
                cover: `https://image.tmdb.org/t/p/w780${resolvedMovie.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w1280${resolvedMovie.backdrop_path}`,
                title: resolvedMovie.title,
                director: movieCredits.crew.find((person) => { return person.job === 'Director'; }),
                imdbRate: resolvedMovie.vote_average
            });
            next();
        });
        return archiveList;
    }
};

export default {
    $: toRefs(state),
    _: modifiers
};
