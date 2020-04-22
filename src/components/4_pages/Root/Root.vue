<script>
import { inject, computed } from '@vue/composition-api';
import { RepositoryKey } from '~repository$';
import useAuth from '~composables/authentication';
import TheSidebar from '~layouts/Sidebar/Sidebar';

export default {
    name: 'Root',
    components: {
        TheSidebar
    },
    props: {},
    setup(props, context) {
        const { isAuthenticated } = useAuth();
        if (!isAuthenticated.value) {
            context.root.$router.replace({ name: 'auth' });
        }

        const { account: accountRepo } = inject(RepositoryKey);
        accountRepo._.getDetails();

        const hasAllInitialData = computed(() => {
            return !!accountRepo.$.username;
        });

        return {
            accountRepo,
            isAuthenticated,
            hasAllInitialData
        };
    }
};
</script>

<template>
    <main
        v-if="isAuthenticated"
        :class="b()"
    >
        <div
            v-if="!hasAllInitialData"
            :class="b('loading')"
        >
            <base-icon
                name="loading-spinner-1"
                :class="b('loadingIcon')"
            />
        </div>
        <the-sidebar
            v-if="hasAllInitialData"
            :class="b('sidebar')"
        />
        <router-view v-if="hasAllInitialData" />
    </main>
</template>


<style scoped lang="postcss">
@b Root {
    padding: theme(spacing.5);
    display: grid;
    grid-template-columns: theme(spacing.10) minmax(0, 1fr);
    align-items: start;
    margin: auto;
    gap: theme(spacing.7);
    position: relative;

    @e loading {
        position: fixed 0 0 0 0;
        width: 100vw;
        height: 100vh;
        box: center middle;
        background-color: themes(colors.primary.600);
    }

    @e loadingIcon {
        size: theme(spacing.6);
        color: theme(colors.primary.accent.300);
    }

    @e sidebar {
        height: calc(100vh - (theme(spacing.5) * 2));
        position: sticky;
        top: theme(spacing.5);
    }
}
</style>
