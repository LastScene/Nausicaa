<script>
import { watch } from '@vue/composition-api';
import useAuthModule from '~composables/authentication';
import useLoading from '~composables/loading';
import TmdbLogo from '~atoms/TmdbLogo/TmdbLogo';

export default {
    name: 'Auth',
    components: {
        TmdbLogo
    },
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


        const publicPath = process.env.BASE_URL;
        const randomBackground = `${publicPath}background-${Math.floor(Math.random() * 13) + 1}.jpg`;

        return {
            authorize,
            isLoading,
            randomBackground
        };
    }
};
</script>

<template>
    <section
        :class="b()"
        :style="{
            'background-image': `url(${randomBackground})`
        }"
    >
        <div :class="b('mask')" />
        <article :class="b('box')">
            <h1 :class="b('title')">
                Authentication
            </h1>
            <div :class="b('tmdbLogoHolder')">
                <tmdb-logo :class="b('tmdbLogo')" />
            </div>
            <div :class="b('content')">
                <p :class="b('description')">
                    Click to authenticate with TMDB service. <br> If you don't have an account, simply register a free acount at
                    <a
                        :class="b('tmdbLink')"
                        href="https://www.themoviedb.org/"
                    >TMDB</a>
                    , and click to connect.
                </p>
                <base-button
                    v-if="!isLoading('accessToken').value"
                    :class="b('cta')"
                    :loading="isLoading('requestToken').value"
                    variant="secondary"
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

<style scoped lang="postcss">
@b Auth {
    size: 100%;
    background-size: cover;
    background-position: center;
    height: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    gap: theme(spacing.4);
    z-index: theme(zIndex.land);

    @e mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: theme(colors.primary.500);
        opacity: .4;
        pointer-events: none;
    }

    @e box {
        box: vertical center middle;
        gap: theme(spacing.5);
        width: theme(spacing.12);
        border-radius: theme(borderRadius.more);
        background-color: color(theme(colors.primary.100) a(65%));
        z-index: theme(zIndex.land);
        padding: theme(spacing.7);
        text-align: center;
        backdrop-filter: blur(10px);
    }

    @e tmdbLogoHolder {
        size: theme(spacing.7);
        border-radius: 50%;
        margin-bottom: theme(spacing.6);
        background-color: white;
        padding: theme(spacing.4);
    }

    @e tmdbLogo {
        size: 100%;
    }

    @e title {
        font-size: theme(fontSize.4xl);
        color: theme(colors.secondary.700);
        font-weight: theme(fontWeight.extrabold);
        z-index: theme(zIndex.land);
        margin-bottom: theme(spacing.2);
    }

    @e content {
        display: grid;
        align-content: center;
        justify-content: center;
        gap: theme(spacing.6);
        text-align: center;
    }

    @e description {
        line-height: theme(lineHeight.default);
        color: theme(colors.primary.800);
        font-size: theme(fontSize.lg);
    }

    @e tmdbLink {
        color: theme(colors.primary.500);
    }

    @e cta {
        justify-self: center;
    }

    @e working {
        box: center middle;
    }

    @e workingIcon {
        margin-right: theme(spacing.4);
        size: theme(spacing.6);
    }

    @e workingText {
        font-size: theme(spacing.5);
    }
}

</style>
