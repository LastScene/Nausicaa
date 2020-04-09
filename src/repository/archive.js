import Vue from 'vue';
import VueCompositionApi, { reactive, toRefs } from '@vue/composition-api';
import { tmdbAPI } from '~api$';
import accountRepo from './account';

Vue.use(VueCompositionApi);

const state = reactive([]);

const modifiers = {
    async getAll() {
        const archiveList = await tmdbAPI.list.getSpecial('archive', accountRepo.$.id.v4);
        archiveList.forEach((archiveListItem) => {
            state.push({
                id: String(archiveListItem.id),
                cover: `https://image.tmdb.org/t/p/w500${archiveListItem.poster_path}`,
                title: archiveListItem.title,
                director: '',
                imdbRate: archiveListItem.vote_average
            });
        });
        return archiveList;
    }
};

export default {
    $: toRefs(state),
    _: modifiers
};
