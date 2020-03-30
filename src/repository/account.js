import Vue from 'vue';
import VueCompositionApi, { ref, reactive, toRefs } from '@vue/composition-api';
import { tmdbAPI } from '~api$';

Vue.use(VueCompositionApi);

const state = reactive({
    id: null,
    avatar: null,
    name: null,
    username: null
});

const modifiers = {
    async getDetails() {
        const details = await tmdbAPI.account.getDetails();
        state.avatar = `${details.avatar.gravatar.hash}.jpg`;
        state.id = details.id;
        state.name = details.name;
        state.username = details.username;
    }
};

export default {
    $: toRefs(state),
    _: modifiers
};
