import Vue from 'vue';
import VueCompositionApi, { reactive, toRefs } from '@vue/composition-api';
import { tmdbAPI } from '~api$';

Vue.use(VueCompositionApi);

const state = reactive({
    id: {
        v3: null,
        v4: null
    },
    avatar: null,
    name: null,
    username: null
});

const modifiers = {
    async getDetails() {
        const details = await tmdbAPI.account.getDetails();
        state.avatar = details.avatar;
        state.id.v3 = details.id.v3;
        state.id.v4 = details.id.v4;
        state.name = details.name;
        state.username = details.username;
    }
};

export default {
    $: toRefs(state),
    _: modifiers
};
