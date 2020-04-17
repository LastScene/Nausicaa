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
    padding: ms(-1) theme(spacing.4);
    color: #191727;
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;

    @e label {
        font-weight: 700;
        font-size: theme(spacing.2);
        margin-right: theme(spacing.4);
    }

    @e value {
        font-weight: 600;
        font-size: theme(spacing.3);
    }
}
</style>
