<template>
    <section class="archvie">
        <counter class="archvie__counter">
            <movies-list />
        </counter>
    </section>
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
        const repository = inject(RepositoryKey, {});
        return {
            repository
        };
    }
};
</script>

<style scoped lang="scss">
.archvie {

    &__counter {}

    &__moviesList {}
}
</style>
