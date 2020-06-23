<script>
export default {
    name: 'MovieFrameStates',
    props: {},
    setup(props, context) {
        return {
        };
    }
};
</script>

<template>
    <div :class="b()">
        <base-icon
            :class="b('stateIcon', { type: 'favourite' })"
            name="heart-fill"
        />
        <base-icon
            :class="b('stateIcon', { type: 'watchList' })"
            name="eye-fill"
        />
    </div>
</template>

<style scoped lang="postcss">
@b MovieFrameStates{

    @e stateIcon {
        margin-right: theme(spacing.2);
        size: 1.2em;

        @when type {
            @is favourite {
                color: theme(colors.secondary.500);
            }

            @is watchList {
                color: theme(colors.primary.accent.400);
            }
        }
    }
}
</style>
