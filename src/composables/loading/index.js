import Vue from 'vue';
import VueCompositionApi, { ref, reactive } from '@vue/composition-api';

Vue.use(VueCompositionApi);

export default function useLoading() {
    const loadingEntities = reactive({});

    function ensureExistance(entity) {
        const exists = loadingEntities.hasOwnProperty(entity);
        if (!exists) {
            Vue.set(loadingEntities, entity, ref(false));
        }
    }

    function isLoading(entity) {
        ensureExistance(entity);
        return loadingEntities?.[entity];
    }

    function setLoading(entity) {
        Vue.set(loadingEntities, entity, ref(true));
    }

    function unsetLoading(entity) {
        ensureExistance(entity);
        if (isLoading(entity)) {
            loadingEntities[entity].value = false;
        }
    }

    return {
        isLoading,
        setLoading,
        unsetLoading
    };
}
