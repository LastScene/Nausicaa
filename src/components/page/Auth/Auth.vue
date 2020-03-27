<template>
    <section :class="b()">
        <h1 :class="b('title')">
            Authentication
        </h1>
        <article :class="b('box')">
            <header :class="b('hero')" />
            <div :class="b('content')">
                <p :class="b('description')">
                    Click to authenticate with TMDB service. If you don't have an account, simply register a free acount, and click to connect.
                </p>
                <base-button
                    v-if="!isGettingSession"
                    :class="b('cta')"
                    :loading="isGettingRequestToken"
                    variant="primary"
                    icon="links-line"
                    @click="authorize"
                >
                    Connect to TMDB
                </base-button>
                <div
                    v-if="isGettingSession"
                    :class="b('working')"
                >
                    <base-icon
                        name="loading-spinner-1"
                        :class="b('workingIcon')"
                    />
                    <span :class="b('workingText')">Connecting to TMDB...</span>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
import { ref, onMounted, watch } from '@vue/composition-api';
import useAuthModule from '~composables/authentication';

export default {
    name: 'Auth',
    props: {},
    setup(props, context) {
        function isMiddleOfAutheticating() {
            const queryParams = new URLSearchParams(window.location.search);
            return queryParams.get('request_token') && queryParams.get('approved');
        }

        const { getNewRequestToken, getNewSessionID, token } = useAuthModule();
        const isGettingRequestToken = ref(false);
        const isGettingSession = ref(isMiddleOfAutheticating());
        async function authorize() {
            isGettingRequestToken.value = true;
            await getNewRequestToken();
            isGettingSession.value = true;
            isGettingRequestToken.value = false;
        }

        onMounted(async () => {
            if (isMiddleOfAutheticating()) {
                await getNewSessionID(context.root.$route.query.request_token);
            }
        });

        watch(token, () => {
            if (token.value) {
                context.root.$router.push({
                    name: 'root'
                });
            }
        });

        return {
            isGettingRequestToken,
            isGettingSession,
            authorize
        };
    }
};
</script>

<style scoped lang="scss">
.Auth {
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    gap: ms(2);

    &__title {
        font-size: ms(4, $thread: typography);
        color: $color-gold--500;
    }

    &__box {
        display: grid;
        width: ms(6);
        border-radius: $border-radius--more;
        overflow: hidden;
        background-color: $color-foreground;
    }

    &__hero {
        height: ms(5);
        background-image: url('~@/assets/images/authentication.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    &__content {
        display: grid;
        align-content: center;
        justify-content: center;
        padding: ms(2);
        gap: ms(2);
        text-align: center;
    }

    &__description {
        color: $color-background;
    }

    &__cta {
        justify-self: center;
    }

    &__working {
        box: center middle;
        color: $color-gold--800;
    }

    &__workingIcon {
        margin-right: ms(0);
        size: ms(2);
    }

    &__workingText {
        font-size: ms(1, $thread: typography);
    }
}

</style>
