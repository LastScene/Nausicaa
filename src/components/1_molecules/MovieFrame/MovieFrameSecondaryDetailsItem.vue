<script>
import VT from 'vue-types';

export default {
    name: 'MovieFrameSecondaryDetailsItem',
    props: {
        label: VT.string.isRequired,
        value: VT.oneOfType([VT.string, VT.array]).isRequired
    },
    setup(props, context) {
        return {
        };
    }
};
</script>

<template>
    <div :class="b()">
        <dt :class="b('label')">
            {{ label }}
        </dt>
        <dd :class="b('value')">
            <span
                v-for="valueItem in (Array.isArray(value) ? value : [value])"
                :key="valueItem"
            >
                {{ valueItem }}
            </span>
        </dd>
    </div>
</template>

<style scoped lang="postcss">
@b MovieFrameSecondaryDetailsItem {
    box: horizontal;

    @e label {
        width: 100px;
        text-align: right;
        margin-right: theme(spacing.2);
        padding: theme(spacing.2);
        background-color: color(black a(20%));
    }

    @e value {
        max-width: 200px;
        padding: theme(spacing.2);
    }
}
</style>
