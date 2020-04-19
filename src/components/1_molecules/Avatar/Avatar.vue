<script>
import VT from 'vue-types';
import { inject } from '@vue/composition-api';
import { RepositoryKey } from '~repository';

export default {
    name: 'Avatar',
    props: {},
    setup(props, context) {
        const repository = inject(RepositoryKey);
        const accountDetails = repository.account.$;

        return {
            accountDetails
        };
    }
};
</script>

<template>
    <div :class="b()">
        <div :class="b('imageHolder')">
            <img
                :src="`${accountDetails.avatar}?s=65`"
                :class="b('image')"
            >
        </div>
        <div :class="b('information')">
            <span :class="b('name')">
                {{ accountDetails.name }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="postcss">
@b Avatar {
    box: vertical center;

    @e imageHolder {
        border-radius: theme(borderRadius.full);
        overflow: hidden;
    }

    @e image {

    }

    @e information {
        margin-top: theme(spacing.4);
    }

    @e name {
        color: theme(colors.primary.200);
        font-size: theme(fontSize.sm);
        font-weight: theme(fontWeight.regular);
    }
}
</style>
