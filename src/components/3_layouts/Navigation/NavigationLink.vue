<script>
import VT from 'vue-types';

export default {
    name: 'NavigationLink',
    props: {
        link: VT.object.isRequired
    },
    setup(props) {
        return {
        };
    }
};
</script>

<template>
    <router-link
        v-slot="{ href, isExactActive, navigate }"
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

<style scoped lang="postcss">
@b NavigationLink {
    position: relative;
    padding: ms(1) var(--inner-space);
    cursor: pointer;
    color: color(foreground);

    &:hover {
        color: color(secondary, lightest);
    }

    @e itself {
        display: flex;
        position: relative;

        @is active {
            color: color(secondary, lighter);
            font-weight: 500;
        }
    }

    @e icon {
        margin-right: theme(spacing.4);

        @is active {
        }
    }

    @e labels {
        display: flex;
        flex-direction: column;
    }

    @e label {
        @is active {
        }
    }

    @e subLabel {
        margin-top: theme(spacing.4);
        color: color(foreground, dimer);
        font-size: theme(spacing.3);
    }

    @e badge {

    }
}
</style>
