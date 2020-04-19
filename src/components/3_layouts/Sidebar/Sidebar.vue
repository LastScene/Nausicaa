<script>
import Avatar from '~molecules/Avatar/Avatar';
import TheNavigation from '~layouts/Navigation/Navigation.vue';

export default {
    name: 'Sidebar',
    components: {
        Avatar,
        TheNavigation
    },
    props: {},
    data() {
        return {};
    }
};
</script>

<template>
    <div :class="b()">
        <avatar :class="b('avatar')" />
        <the-navigation :class="b('navigation')" />
    </div>
</template>


<style scoped lang="postcss">
@b Sidebar {
    user-select: none;
    border-radius: theme(borderRadius.default);
    background-color: theme(colors.primary.800);
    box-shadow: theme(boxShadow.xl);
    overflow: hidden;

    @e navigation {

    }

    @e avatar {
        padding-top: theme(spacing.5);
        padding-bottom: theme(spacing.5);
        background-color: theme(colors.primary.700);
        border-bottom: 2px solid theme(colors.primary.900);
    }
}
</style>
