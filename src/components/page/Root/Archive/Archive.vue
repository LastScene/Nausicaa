<template>
    <section class="archvie">
        <counter class="archvie__counter">
            <movies-list />
        </counter>
    </section>
</template>

<script>
import { inject } from '@vue/composition-api';
import { StoreKey } from '~store$';
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
        const store = inject(StoreKey, {});

        return {
            store
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
