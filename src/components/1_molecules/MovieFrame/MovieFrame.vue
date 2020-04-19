<script>
import { provide } from '@vue/composition-api';
import MovieShape from '~shapes/movie';
import MovieFrameCover from './MovieFrameCover';
import ImdbRate from '~atoms/ImdbRate/ImdbRate';
import MovieFrameDetails from './MovieFrameDetails';

export default {
    name: 'MovieFrame',
    components: {
        ImdbRate,
        'mf-cover': MovieFrameCover,
        'mf-details': MovieFrameDetails
    },
    props: {
        movie: MovieShape
    },
    setup(props, context) {
        provide('movie', props.movie);

        return {};
    }
};
</script>

<template>
    <article :class="b()">
        <mf-cover :class="b('cover')">
            <imdb-rate
                :class="b('imdbRate')"
                :value="8.1"
            />
        </mf-cover>
        <mf-details :class="b('details')" />
    </article>
</template>

<style scoped lang="postcss">
@b MovieFrame {
    --movie-frame-inner-space: theme(spacing.4);
    position: relative;

    @e cover {
        @apply aspect-ratio-poster;
        box-shadow: 0 10px 20px 0 color(theme(colors.gray.900) a(70%));
    }

    @e imdbRate {
        position: absolute auto auto 0 0;
        margin: var(--movie-frame-inner-space);
    }

    @e details {
    }
}
</style>
