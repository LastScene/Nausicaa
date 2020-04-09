<template>
    <svg-icon
        class="icon"
        :name="name"
    />
</template>

<script>
import VueTypes from 'vue-types';
import { onMounted } from '@vue/composition-api';

export default {
    name: 'BaseIcon',
    props: {
        name: VueTypes.string.isRequired
    },
    setup(props) {
        onMounted(() => {
            return import(
                /* webpackChunkName: "icons" */
                /* webpackMode: "lazy-once" */
                `~icons/${props.name}`
            );
        });

        return {};
    }
};
</script>

<style scoped lang="scss">
.icon {

}
</style>
