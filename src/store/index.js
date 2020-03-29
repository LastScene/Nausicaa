import { reactive, toRefs } from '@vue/composition-api';
import account from './modules/account';

export default function useStore() {
    const state = reactive({

    });
    const getters = {

    };
    const modifiers = {

    };
    const modules = {
        account
    };

    return {
        ...toRefs(state),
        ...getters,
        ...modifiers,
        _: modules
    };
}

export const StoreKey = Symbol('store key');
