<script>
import Searcher from '~molecules/Searcher/Searcher';

export default {
    name: 'Counter',
    components: {
        Searcher
    },
    props: {},
    setup() {
        return {};
    }
};
</script>

<template>
    <section :class="b()">
        <searcher />
        <slot />
    </section>
</template>

<style scoped lang="postcss">
@b Counter {
    display: grid;
    grid-auto-flow: row;
    align-items: start;
    gap: theme(spacing.6);
}
</style>
