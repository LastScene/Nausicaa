<template>
    <counter :class="b()">
        <movies-list :list="archiveRepo.$" />
    </counter>
</template>

<script>
import { inject } from '@vue/composition-api';
import { RepositoryKey } from '~repository$';
import Counter from '~layout/Counter/Counter';
import MoviesList from '~organism/MoviesList/MoviesList';

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

<style scoped lang="scss">
.Archive {

    &__counter {}

    &__moviesList {}
}
</style>
