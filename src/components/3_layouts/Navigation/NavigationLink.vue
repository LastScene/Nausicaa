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
    padding: theme(spacing.4) theme(spacing.5);
    cursor: pointer;

    @e itself {
        box: horizontal;
        position: relative;
        font-weight: theme(fontWeight.regular);
        color: theme(colors.primary.200);

        &:hover {
            color: theme(colors.primary.accent.100);
        }

        @is active {
            color: theme(colors.primary.accent.300);
            font-weight: theme(fontWeight.bold);
            pointer-events: none;
        }
    }

    @e icon {
        margin-right: theme(spacing.4);
        size: 1.3em;
        transform: translateY(-1px);

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
        margin-top: theme(spacing.2);
        color: theme(colors.primary.400);
        font-size: theme(spacing.3);
    }

    @e badge {

    }
}
</style>
