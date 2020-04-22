<script>
import { ref, computed, inject } from '@vue/composition-api';
import MovieFrameSecondaryDetailsItem from './MovieFrameSecondaryDetailsItem';

export default {
    name: 'MovieFrameSecondaryDetails',
    components: {
        'mfsd-item': MovieFrameSecondaryDetailsItem
    },
    props: {},
    setup() {
        const isVisible = ref(false);
        const makeVisible = () => {
            isVisible.value = true;
        };
        const makeHidden = () => {
            isVisible.value = false;
        };

        const movie = inject('movie');
        const secondaryDetails = computed(() => {
            return [{
                label: 'Original Title',
                value: movie.original_title
            }, {
                label: 'Genres',
                value: movie.genres.map((genre) => {
                    return genre.name;
                })
            }, {
                label: 'Language',
                value: movie.original_language
            }, {
                label: 'Year',
                value: movie.release_date.split('-')[0]
            }];
        });

        return {
            isVisible,
            makeVisible,
            makeHidden,
            secondaryDetails
        };
    }
};
</script>

<template>
    <div
        :class="b({ isVisible })"
        @mouseleave="makeHidden"
    >
        <base-icon
            :class="b('icon', { isVisible })"
            name="information-fill"
            @mouseenter.native="makeVisible"
        />
        <div
            :class="b('content', { isVisible })"
        >
            <mfsd-item
                v-for="secondaryDetail in secondaryDetails"
                :key="secondaryDetail.label"
                :label="secondaryDetail.label"
                :value="secondaryDetail.value"
            />
        </div>
    </div>
</template>


<style scoped lang="postcss">
@b MovieFrameSecondaryDetails {
    positition: relative;
    cursor: default;

    @e icon {
        size: theme(spacing.5);
        color: theme(colors.gray.100);
        opacity: .5;
        transition: opacity .15s;

        @is visible {
            opacity: .1;
        }
    }

    @e content {
        box: vertical;
        position: absolute * 0 theme(spacing.2) *;
        size: max-content;
        backdrop-filter: blur(20px) grayscale(.5) saturate(3) invert(.3);
        color: theme(colors.gray.100);
        box-shadow: 0 4px 20px rgba(0, 0, 0, .25);
        pointer-events: none;
        transform-origin: bottom right;
        transform: scale(.7);
        opacity: 0;
        transition: all .15s;
        border-radius: theme(borderRadius.full) theme(borderRadius.full) 0 theme(borderRadius.full);
        overflow: hidden;

        @is visible {
            pointer-events: all;
            opacity: 1;
            transform: scale(1);
            border-radius: theme(borderRadius.default);
        }
    }
}
</style>
