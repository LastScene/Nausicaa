<template>
    <counter :class="b()">
        <movies-list :list="archiveRepo.$" />
    </counter>
</template>

<script>
import { inject } from '@vue/composition-api';
import { RepositoryKey } from '~repository$';
import Counter from '~layouts/Counter/Counter';
import MoviesList from '~organisms/MoviesList/MoviesList';

export default {
    name: 'Archive',
    components: {
        Counter,
        MoviesList
    },
    props: {},
    setup() {
        const { archive: archiveRepo } = inject(RepositoryKey, {});

        archiveRepo._.getAll();

        return {
            archiveRepo
        };
    }
};
</script>

<style scoped lang="postcss">
.Archive {

    @e counter {}

    @e moviesList {}
}
</style>
