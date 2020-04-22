<script>
import { provide } from '@vue/composition-api';
import MovieShape from '~shapes/movie';
import MovieFrameCover from './MovieFrameCover';
import ImdbRate from '~atoms/ImdbRate/ImdbRate';
import MovieFrameSecondaryDetails from './MovieFrameSecondaryDetails';
import MovieFrameDetails from './MovieFrameDetails';

export default {
    name: 'MovieFrame',
    components: {
        ImdbRate,
        'mf-cover': MovieFrameCover,
        'mf-details': MovieFrameDetails,
        'mf-secondary-details': MovieFrameSecondaryDetails
    },
    props: {
        movie: MovieShape.isRequired.loose
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
                :value="movie.imdbRate"
            />
            <mf-secondary-details :class="b('secondaryDetails')" />
        </mf-cover>
        <mf-details :class="b('details')" />
    </article>
</template>

<style scoped lang="postcss">
@b MovieFrame {
    --movie-frame-inner-space: theme(spacing.4);
    position: relative;

    @e cover {

    }

    @e imdbRate {
        position: absolute auto auto 0 0;
        margin: var(--movie-frame-inner-space);
    }

    @e secondaryDetails {
        position: absolute auto 0 0 auto;
        margin: var(--movie-frame-inner-space);
    }

    @e details {
    }
}
</style>
