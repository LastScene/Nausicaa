import { reactive, toRefs } from '@vue/composition-api';
import { tmdbAPI } from '~api';

const state = reactive({
    id: null,
    avatar: null,
    name: null,
    username: null
});
const getters = {

};
const modifiers = {
    async init() {
        const details = await tmdbAPI.account.getDetails();
        state.id.value = `${details.avatar.gravatar.hash}.jpg`;
        state.id = details.id;
        state.name = details.name;
        state.username = details.username;
    }
};

export default {
    ...toRefs(state),
    ...getters,
    ...modifiers
};
