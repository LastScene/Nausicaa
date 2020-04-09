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

<style scoped lang="scss">
.details {

    &__title {
        font-size: ms(0, $thread: typography);
        color: color(foreground);
        font-weight: 600;
    }

    &__director {
        color: color-comp(background, primary);
        font-size: ms(-1, $thread: typography);
        font-weight: 500;
    }
}
</style>
