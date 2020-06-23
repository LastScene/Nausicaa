<script>
import { provide } from '@vue/composition-api';
import MovieShape from '~shapes/movie';
import MovieFrameCover from './MovieFrameCover';
import ImdbRate from '~atoms/ImdbRate/ImdbRate';
import MovieFrameSecondaryDetails from './MovieFrameSecondaryDetails';
import MovieFrameDetails from './MovieFrameDetails';
import MovieFrameStates from './MovieFrameStates.vue';

export default {
    name: 'MovieFrame',
    components: {
        ImdbRate,
        'mf-cover': MovieFrameCover,
        'mf-states': MovieFrameStates,
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
        <mf-states :class="b('states')" />
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
    --movieFrame-innerSpace: theme(spacing.4);
    position: relative;
    display: grid;
    grid-auto-flow: row;

    @e cover {
    }

    @e states {
        margin-bottom: theme(spacing.2);
    }

    @e imdbRate {
        position: absolute auto auto 0 0;
        margin: var(--movieFrame-innerSpace);
    }

    @e secondaryDetails {
        position: absolute auto 0 0 auto;
        margin: var(--movieFrame-innerSpace);
    }

    @e details {
    }
}
</style>
