<template>
    <div id="app">
        <router-view />
    </div>
</template>

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

<style scoped lang="scss">
#app {
    size: 100%;
}
</style>
