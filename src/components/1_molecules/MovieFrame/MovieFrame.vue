<script>
import { provide } from '@vue/composition-api';
import MovieShape from '~shapes/movie';
import Cover from './-Cover';
import ImdbRate from '~atoms/ImdbRate/ImdbRate';
import Details from './-Details';

export default {
    name: 'MovieFrame',
    components: {
        ImdbRate,
        'mf-cover': Cover,
        'mf-details': Details
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
    display: grid;
    grid-template-rows: calc(var(--s-width) * 167.5 / 100), max-content;
    gap: ms(1);
    position: relative;
    width: var(--s-width);

    @e cover {

    }

    @e imdbRate {
        position: absolute auto auto 0 0;
        margin: var(--s-inner-vertical-space);
    }

    @e details {
        padding: 0 var(--s-inner-vertical-space);
    }
}
</style>
