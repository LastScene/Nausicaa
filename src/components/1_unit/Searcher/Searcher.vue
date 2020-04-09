<template>
    <div
        class="searcher"
        :class="{
            'searcher--active:true': isActive
        }"
    >
        <base-icon
            :class="{
                'searcher__icon--active:true': isActive
            }"
            class="searcher__icon"
            name="search-line"
        />
        <input
            v-model="value"
            type="text"
            class="searcher__field"
            placeholder="Search for anything..."
            @focus="isActive = true"
            @blur="isActive = false"
            @input="$emit('input', value)"
        >
    </div>
</template>

<script>
export default {
    name: 'Searcher',
    props: {},
    data() {
        return {
            isActive: false,
            value: ''
        };
    }
};
</script>

<style scoped lang="scss">
.searcher {
    --s-inner-space: ms(0);

    border-bottom: 2px solid color(background, lighter);
    width: ms(6);
    display: flex;
    position: relative;

    &::before {
        content: '';
        position: absolute auto 0 0 0;
        background-color: color(primary);
        height: 2px;
        bottom: -2px;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform .15s cubic-bezier(.37, .54, .35, 1.02);
    }

    &--active\: {

        &true {

            &::before {
                transform: scaleX(1);
            }
        }
    }

    &__icon {
        color: color(background, lighter);
        padding: var(--s-inner-space);
        height: ms(2);
        margin-right: ms(0);
        flex-shrink: 0;
        &--active\: {

            &true {
                color: color(primary);
            }
        }
    }

    &__field {
        color: color(foreground);
        padding: var(--s-inner-space);
        flex-grow: 1;

        &::placeholder {
            color: color(foreground, dimer);
        }
    }
}
</style>
