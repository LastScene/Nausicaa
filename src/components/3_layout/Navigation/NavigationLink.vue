<template>
    <router-link
        #default="{ href, isExactActive, navigate }"
        tag="li"
        :class="b()"
        :to="{
            name: link.name
        }"
    >
        <a
            ref="destiny"
            :class="b('itself', { isActive: isExactActive })"
            :href="href"
            @click="navigate"
        >
            <base-icon
                :name="link.icon"
                :class="b('icon', { isActive: isExactActive })"
            />
            <div :class="b('labels')">
                <span :class="b('label', { isActive: isExactActive })">
                    {{ link.label }}
                </span>
                <span
                    v-if="link.subLabel"
                    :class="b('subLabel')"
                >
                    {{ link.subLabel }}
                </span>
            </div>
        </a>
    </router-link>
</template>

<script>
import VueTypes from 'vue-types';

export default {
    name: 'NavigationLink',
    props: {
        link: VueTypes.object.isRequired
    },
    setup(props) {
        return {
        };
    }
};
</script>

<style scoped lang="scss">
.NavigationLink {
    position: relative;
    padding: ms(1) var(--inner-space);
    cursor: pointer;
    color: color(foreground);

    &:hover {
        color: color(secondary, lightest);
    }

    &__itself {
        display: flex;
        position: relative;

        @include is(active) {
            color: color(secondary, lighter);
            font-weight: 500;
        }
    }

    &__icon {
        margin-right: ms(0);

        @include is(active) {
        }
    }

    &__labels {
        display: flex;
        flex-direction: column;
    }

    &__label {
        @include is(active) {
        }
    }

    &__subLabel {
        margin-top: ms(0);
        color: color(foreground, dimer);
        font-size: ms(-1, $thread: typography);
    }

    &__badge {

    }
}
</style>
