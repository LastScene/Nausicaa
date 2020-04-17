<script>
import VT from 'vue-types';
import { computed } from '@vue/composition-api';

export default {
    name: 'BaseButton',
    components: {},
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

<style scoped lang="postcss">
@b BaseButton {
    @apply shadow-neo-default;
    border-radius: theme(borderRadius.full);
    box: horizontal;
    position: relative;
    overflow: hidden;
    user-select: none;
    will-change: box-shadow;
    transition: box-shadow theme(transitionTimingFunction.default);

    &:hover {
        @apply shadow-neo-less;
    }

    &:active {
        @apply shadow-neo-inset;
    }

    @when variant {
        @is primary {
            background-color: theme(colors.primary.500);
            color: theme(colors.primary.100);
        }

        @is secondary {
            background-color: theme(colors.secondary.500);
            color: theme(colors.secondary.200);
        }
    }

    @is loading {
        pointer-events: none;
    }

    @is disabled {
        pointer-events: none;
        background-color: transparent;
    }

    @e itself {
        box: horizontal middle center;
        padding: theme(spacing.4);
        border-radius: theme(borderRadius.full);
        color: currentColor;
        transition: filter theme(transitionTimingFunction.default);

        @is loading {
            filter: blur(2px) sepia(.5);
        }
    }

    @e icon {
        margin-right: theme(spacing.3);
        color: currentColor;
    }

    @e content {
        font-size: .9rem;
        font-weight: theme(fontWeight.medium);
    }

    @e loading {
        box: center middle;
        position: absolute 0 0 0 0;
        border-radius: theme(borderRadius.full);
        transform: translateX(-2rem);
        opacity: 0;
        transition: transform theme(transitionTimingFunction.default), opacity theme(transitionTimingFunction.default);
        pointer-events: none;
        will-change: transform, opacity;

        @is spining {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @e loadingIcon {
        opacity: 0;
        size: 1.2em;
        transition: opacity theme(transitionTimingFunction.default) .3s;
        stroke-width: 2px;
        stroke: white;
        filter: drop-shadow(0px 3px 10px black);
        will-change: opacity;

        @is spining {
            opacity: 1;
        }
    }
}
</style>
