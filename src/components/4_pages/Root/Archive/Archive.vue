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

<template>
    <counter :class="b()">
        <movies-list
            :class="b('moviesList')"
            :list="archiveRepo.$"
        />
    </counter>
</template>


<style scoped lang="postcss">
@b Archive {
    @e moviesList {}
}
</style>
