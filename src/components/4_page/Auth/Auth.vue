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
                    v-if="!isLoading('accessToken').value"
                    :class="b('cta')"
                    :loading="isLoading('requestToken').value"
                    variant="primary"
                    icon="links-line"
                    @click="authorize"
                >
                    Connect to TMDB
                </base-button>
                <div
                    v-if="isLoading('accessToken').value"
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
import { watch } from '@vue/composition-api';
import useAuthModule from '~composables/authentication';
import useLoading from '~composables/loading';

export default {
    name: 'Auth',
    props: {},
    setup(props, context) {
        const {
            isLoading, setLoading, unsetLoading
        } = useLoading();
        const {
            getNewToken, accessToken, sessionID, requestToken
        } = useAuthModule();
        const authorize = async () => {
            setLoading('requestToken');
            watch(requestToken, () => {
                if (requestToken.value) {
                    unsetLoading('requestToken');
                    setLoading('accessToken');
                }
            }, { lazy: true });
            watch([accessToken, sessionID], () => {
                if (accessToken.value && sessionID.value) {
                    context.root.$router.push({
                        name: 'root'
                    });
                }
            }, { lazy: true });
            await getNewToken();
        };

        return {
            authorize,
            isLoading
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
        // color: $color-gold--500;
    }

    &__box {
        display: grid;
        width: ms(6);
        border-radius: $border-radius--more;
        overflow: hidden;
        background-color: color(foreground);
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
        color: color(background);
    }

    &__cta {
        justify-self: center;
    }

    &__working {
        box: center middle;
        // color: $color-gold--800;
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
