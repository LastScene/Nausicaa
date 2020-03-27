<template>
    <main class="root">
        <the-sidebar class="root__sidebar" />
        <router-view />
    </main>
</template>

<script>
import { watch } from '@vue/composition-api';
import useAuth from '~composables/authentication';
import TheSidebar from '~layout/Sidebar/Sidebar';

export default {
    name: 'Root',
    components: {
        TheSidebar
    },
    props: {},
    setup(props, context) {
        function isMiddleOfAuthenticating() {
            const queryParams = new URLSearchParams(window.location.search);
            return queryParams.get('request_token') && queryParams.get('approved');
        }

        const { token } = useAuth();
        if (!token.value && !isMiddleOfAuthenticating()) {
            context.root.$router.replace({ name: 'auth' });
        }
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
