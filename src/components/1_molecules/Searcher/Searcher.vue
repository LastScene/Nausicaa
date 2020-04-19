<script>
export default {
    name: 'Searcher',
    props: {},
    data() {
        return {
            isActive: false,
            value: ''
        };
    }
};
</script>

<template>
    <div
        :class="b({ isActive })"
    >
        <base-icon
            :class="b('icon', { isActive })"
            name="search-line"
        />
        <input
            v-model="value"
            type="text"
            :class="b('field', { isActive })"
            placeholder="Search for anything..."
            @focus="isActive = true"
            @blur="isActive = false"
            @input="$emit('input', value)"
        >
    </div>
</template>

<style scoped lang="postcss">
@b Searcher {
    --searcher-inner-space: theme(spacing.4);
    background-color: theme(colors.primary.200);
    width: theme(spacing.11);
    box: horizontal middle;
    position: relative;
    border-radius: theme(borderRadius.full);
    box-shadow: 0 5px 20px 0 color(theme(colors.primary.100) a(20%));

    @is active {
        background-color: theme(colors.primary.accent.200);
    }

    @e icon {
        color: theme(colors.primary.400);
        size: 1.3em;
        margin-left: var(--searcher-inner-space);
        margin-right: theme(spacing.3);
        flex-shrink: 0;

        @is active {
            color: theme(colors.primary.600);
        }
    }

    @e field {
        padding: var(--searcher-inner-space) 0;
        flex-grow: 1;

        &::placeholder {
            color: theme(colors.primary.400);
        }

        @is active {
            color: theme(colors.primary.600);

            &::placeholder {
                color: theme(colors.primary.accent.500);
            }
        }
    }
}
</style>
