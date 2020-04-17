<template>
    <div class="cover">
        <div
            :style="{
                'background-image': `url(${movie.cover})`
            }"
            class="cover__image"
        >
            <slot />
        </div>
    </div>
</template>

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

<style scoped lang="postcss">
.cover {
    width: 100%;
    height: calc(var(--s-width) * 167.5 / 100);
    border-radius: theme(spacing.4);
    position: relative;

    @e image {
        position: absolute 0 0 0 0;
        background-position: center;
        background-size: cover;
        border-radius: 7px;
    }
}
</style>
