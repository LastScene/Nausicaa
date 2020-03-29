<template>
    <component
        :is="resolvedNature"
        :class="b({ variant, isDisabled: disabled, isLoading: loading })"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <div :class="b('itself', { isLoading:loading })">
            <base-icon
                v-if="icon"
                :name="icon"
                :class="b('icon')"
            />
            <div :class="b('content')">
                <slot />
            </div>
        </div>
        <div :class="b('loading', { variant, isSpining: loading })">
            <base-icon
                name="loading-spinner-1"
                :class="b('loadingIcon', { variant, isSpining: loading })"
            />
        </div>
    </component>
</template>

<script>
import VT from 'vue-types';
import { computed } from '@vue/composition-api';

export default {
    name: 'BaseButton',
    components: {

    },
    props: {
        variant: VT.oneOf(['primary', 'secondary']).def('primary'),
        icon: VT.string.def(''),
        nature: VT.oneOf(['button', 'link']).def('button'),
        disabled: VT.bool.def(false),
        loading: VT.bool.def(false)
    },
    setup(props) {
        const isIconOnly = computed(() => {
            return !props?.$slots?.default && props.icon;
        });
        const resolvedNature = computed(() => {
            return props.nature === 'button' ? 'button' : 'router-link';
        });

        return {
            isIconOnly,
            resolvedNature
        };
    }
};
</script>

<style scoped lang="scss">
.BaseButton {
    border-radius: 10em;
    display: flex;
    transition: all .2s ease-in-out;
    box-shadow: $box-shadow-neo;
    position: relative;
    user-select: none;
    overflow: hidden;

    &:hover {
        box-shadow: $box-shadow-neo--less;
    }

    &:active {
        box-shadow: $box-shadow-neo--inset;
    }

    @include variant(primary) {
        $background-color: #{$color-gold--500};

        background-color: $background-color;
        color: $color-background;

        &:hover {
            background-color: $color-gold--600;
        }
    }

    @include variant(secondary) {
        background-color: $color-blue--800;
        color: $color-kinda-white;
    }

    @include is(loading) {
        pointer-events: none;
    }

    @include is(disabled) {
        pointer-events: none;
        background-color: transparent;
    }

    &__itself {
        box: horizontal middle center;
        padding: ms(1);
        border-radius: 10em;

        @include is(loading) {
            filter: blur(1px);
        }
    }

    &__icon {
        margin-right: ms(0);
    }

    &__content {

    }

    &__loading {
        box: center middle;
        position: absolute 0 0 0 0;
        border-radius: 10em;
        transform-origin: left;
        transform: translateX(-5rem);
        opacity: 0;
        transition: transform .15s, opacity .15s;

        @include variant(primary) {
            background-color: transparentize(mix(black, $color-gold--500, 10%), .1);
        }

        @include variant(secondary) {
            background-color: $color-blue--800;
            color: $color-kinda-white;
        }

        @include is(spining) {
            transform: translateX(0);
            opacity: 1;
        }
    }

    &__loadingIcon {
        opacity: 0;
        size: ms(1.3);
        transition: opacity .15s .3s;

        @include is(spining) {
            opacity: 1;
        }
    }
}
</style>
