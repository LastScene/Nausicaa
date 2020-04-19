<script>
import VT from 'vue-types';
import MovieShape from '~shapes/movie';
import MovieFrame from '~molecules/MovieFrame/MovieFrame';

export default {
    name: 'MoviesList',
    components: {
        MovieFrame
    },
    props: {
        list: VT.arrayOf(
            MovieShape.loose
        ).def([])
    },
    setup(props, context) {
        return {};
    }
};
</script>

<template>
    <article :class="b()">
        <movie-frame
            v-for="movie in list"
            :key="movie.id"
            :movie="movie"
            :class="b('frame')"
        />
    </article>
</template>

<style scoped lang="postcss">
@b MoviesList {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, theme(spacing.10)));
    gap: theme(spacing.6);

    @e frame {
    }
}
</style>
