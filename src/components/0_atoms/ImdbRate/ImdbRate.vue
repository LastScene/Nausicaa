<script>
import VT from 'vue-types';

export default {
    name: 'ImdbRate',
    props: {
        value: VT.number.isRequired
    },
    data() {
        return {};
    }
};
</script>


<template>
    <div :class="b()">
        <span :class="b('label')">
            IMDb
        </span>
        <span :class="b('value')">
            {{ value }}
        </span>
    </div>
</template>

<style scoped lang="postcss">
@b ImdbRate {
    background: linear-gradient(90deg, #DBA506 0%, #F2DB83 54.79%, #DBA506 100%);
    border-radius: 5px;
    padding: theme(spacing.1) theme(spacing.3);
    color: theme(colors.primary.accent.800);
    box: horizontal middle;

    @e label {
        font-weight: 700;
        font-size: theme(fontSize.xs);
        margin-right: theme(spacing.2);
    }

    @e value {
        font-weight: theme(fontWeight.black);
        font-size: theme(fontSize.sm);
    }
}
</style>
