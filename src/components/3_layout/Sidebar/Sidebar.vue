<template>
    <div :class="b()">
        <avatar :class="b('avatar')" />
        <the-navigation :class="b('navigation')" />
    </div>
</template>

<script>
import Avatar from '~unit/Avatar/Avatar';
import TheNavigation from '~layout/Navigation/Navigation.vue';

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

<style scoped lang="scss">
.Sidebar {
    --inner-space: #{ms(2)};

    user-select: none;
    border-radius: ms(1);
    background: color(background, light);
    box-shadow: 0 10px 70px transparentize(color(background), .35);

    &__navigation {

    }

    &__avatar {
        margin-top: var(--inner-space);
    }
}
</style>
