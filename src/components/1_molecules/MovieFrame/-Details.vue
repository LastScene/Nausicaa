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
    <div class="details">
        <h1 class="details__title">
            {{ movie.title }}
        </h1>
        <span class="details__director">
            {{ movie.director }}
        </span>
    </div>
</template>

<style scoped lang="postcss">
.details {

    @e title {
        font-size: theme(spacing.4);
        color: color(foreground);
        font-weight: 600;
    }

    @e director {
        font-size: theme(spacing.3);
        font-weight: 500;
    }
}
</style>
