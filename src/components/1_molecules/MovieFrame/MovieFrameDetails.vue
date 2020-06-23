<script>
import { inject } from '@vue/composition-api';

export default {
    name: 'MovieFrameDetails',
    props: {},
    setup() {
        const movie = inject('movie');

        return { movie };
    }
};
</script>

<template>
    <div :class="b()">
        <h1 :class="b('title')">
            {{ movie.title }}
        </h1>
        <span :class="b('director')">
            {{ movie.director.name }}
        </span>
    </div>
</template>

<style scoped lang="postcss">
@b MovieFrameDetails {
    box: vertical;
    padding: var(--movieFrame-innerSpace);

    @e title {
        font-size: theme(fontSize.lg);
        color: theme(colors.primary.200);
        font-weight: theme(fontWeight.semibold);
    }

    @e director {
        font-size: theme(fontSize.base);
        color: theme(colors.primary.accent.200);
        margin-top: theme(spacing.2);
    }
}
</style>
