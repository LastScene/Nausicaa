<script>
import VT from 'vue-types';
import smoothReflow from 'vue-smooth-reflow';


export default {
    name: 'ComponentName',
    mixins: [smoothReflow],
    props: {
        tag: VT.string.def('div'),
        options: VT.object.def(() => {
            return {};
        })
    },
    data() {
        return {};
    },
    mounted() {
        this.$smoothReflow(this.options);
    }
};
</script>

<template>
    <component :is="tag">
        <slot />
    </component>
</template>

<style scoped lang="scss">
.ComponentName{

}
</style>
