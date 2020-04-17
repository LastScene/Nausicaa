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
    background-color: theme(color.primary.800);
    box-shadow: 0 10px 70px transparentize(color(background), .35);

    @e navigation {

    }

    @e avatar {
        margin-top: var(--inner-space);
    }
}
</style>
