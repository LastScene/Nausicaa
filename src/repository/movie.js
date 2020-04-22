import Vue from 'vue';
import VueCompositionApi, { reactive, toRefs } from '@vue/composition-api';
import { tmdbAPI } from '~api$';

Vue.use(VueCompositionApi);

const state = reactive({
    list: []
});

const modifiers = {

};

export default {
    $: toRefs(state),
    _: modifiers
};
