<template>
    <main class="root">
        <the-sidebar class="root__sidebar" />
        <router-view />
    </main>
</template>

<script>
import { provide } from '@vue/composition-api';
import useStore, { StoreKey } from '~store$';
import useAuth from '~composables/authentication';
import TheSidebar from '~layout/Sidebar/Sidebar';

export default {
    name: 'Root',
    components: {
        TheSidebar
    },
    props: {},
    setup(props, context) {
        const { token } = useAuth();
        if (!token.value) {
            context.root.$router.replace({ name: 'auth' });
        }

        const store = useStore();
        provide(StoreKey, store);

        store._.account.init();

        return {};
    }
};
</script>

<style scoped lang="scss">
.root {
    --inner-space: #{ms(2)};

    padding: var(--inner-space);
    display: grid;
    grid-template-columns: ms(5) minmax(0, 1fr);
    align-items: start;
    margin: auto;
    gap: ms(3);
    position: relative;

    &__sidebar {
        height: calc(100vh - (var(--inner-space) * 2));
        position: sticky;
        top: var(--inner-space);
    }
}
</style>
