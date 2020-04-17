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

<style scoped lang="postcss">
.Avatar {
    box: vertical center;

    @e imageHolder {
        border-radius: 10em;
        overflow: hidden;
    }

    @e image {

    }

    @e information {
        margin-top: theme(spacing.4);
    }

    @e name {
        color: color(foreground);
        font-size: theme(spacing.3);
        font-weight: 700;
    }
}
</style>
