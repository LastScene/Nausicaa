<script>
import { inject } from '@vue/composition-api';

export default {
    name: 'MovieFrameCover',
    props: {},
    setup() {
        const movie = inject('movie');

        return { movie };
    }
};
</script>

<template>
    <div :class="b()">
        <div
            :style="{
                'background-image': `url(${movie.cover})`
            }"
            :class="b('image')"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped lang="postcss">
@b MovieFrameCover {
    border-radius: theme(borderRadius.default);
    position: relative;
    @apply aspect-ratio-poster;
    box-shadow: 0 10px 20px 0 color(theme(colors.gray.900) a(70%));

    @e image {
        position: absolute 0 0 0 0;
        background-position: center;
        background-size: cover;
        border-radius: theme(borderRadius.default);
    }
}
</style>
