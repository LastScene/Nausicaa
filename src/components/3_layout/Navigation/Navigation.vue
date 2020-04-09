<template>
    <ul
        ref="NavigationElement"
        :class="b()"
    >
        <div
            v-if="pointerPositionStyle"
            ref="pointer"
            :class="b('pointer')"
            :style="pointerPositionStyle"
        />
        <navigation-link
            v-for="(link, linkIndex) in links"
            :key="linkIndex"
            :link="link"
            :class="b('link')"
        />
    </ul>
</template>

<script>
import NavigationLink from './NavigationLink';

export default {
    name: 'Navigation',
    components: {
        NavigationLink
    },
    props: {},
    data() {
        return {
            activeLinkClientRect: null,
            links: [
                {
                    label: 'Archive',
                    icon: 'home-smile-line',
                    name: 'archive'
                },
                {
                    label: 'Recently Added',
                    icon: 'inbox-archive-line',
                    name: 'recently-added'
                },
                {
                    label: 'Watch List',
                    icon: 'eye-line',
                    name: 'watch-list'
                },
                {
                    label: 'Favorites',
                    icon: 'heart-line',
                    name: 'favorites'
                },
                {
                    label: 'Top Rated',
                    subLabel: 'By You',
                    icon: 'star-line',
                    name: 'top-rated-by-you'
                },
                {
                    label: 'Top Rated',
                    subLabel: 'By People',
                    icon: 'user-star-line',
                    name: 'top-rated-by-people'
                }
            ]
        };
    },
    computed: {
        pointerPositionStyle() {
            if (this.activeLinkClientRect) {
                const linksHolderTop = document.querySelector('.Navigation').getBoundingClientRect().top;
                return {
                    top: `calc(${this.activeLinkClientRect.top - linksHolderTop}px + ${getComputedStyle(this.$refs.NavigationElement).paddingTop})`
                };
            }
            return null;
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    const activeLink = document.querySelector('.NavigationLink__itself--isActive');
                    this.activeLinkClientRect = activeLink?.getBoundingClientRect();
                });
            }
        }
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == 'complete') {
                this.$nextTick(() => {
                    const activeLink = document.querySelector('.NavigationLink__itself--isActive');
                    this.activeLinkClientRect = activeLink?.getBoundingClientRect();
                });
            }
        };
    }
};
</script>

<style scoped lang="scss">
.Navigation {
    padding: var(--inner-space, ms(2)) 0;
    overflow: hidden;
    display: grid;
    position: relative;

    &__pointer {
        size: ms(2);
        left: 0;
        border-radius: 50%;
        position: absolute;
        box-shadow: 10px 0 40px 0 color(secondary, lightest);
        transition: top .15s cubic-bezier(0, .68, .49, 1.04);
        transform: translateY(-70%) translateX(-100%);
    }
}
</style>
