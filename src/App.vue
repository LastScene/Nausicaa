<script>
import { provide } from '@vue/composition-api';
import useRepository, { RepositoryKey } from '~repository$';

export default {
    name: 'App',
    setup(props, context) {
        const repository = useRepository();
        provide(RepositoryKey, repository);
    }
};
</script>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style scoped lang="postcss">
#app {
    size: 100%;
}
</style>
