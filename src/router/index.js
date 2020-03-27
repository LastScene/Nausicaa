import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthenticated } from '~composables/authentication';

const Auth = () => {
    return import('~page/Auth/Auth');
};
const Root = () => {
    return import('~page/Root/Root');
};
const Archive = () => {
    return import('~page/Root/Archive/Archive');
};
const RecentlyAdded = () => {
    return import('~page/Root/RecentlyAdded/RecentlyAdded');
};
const WatchList = () => {
    return import('~page/Root/WatchList/WatchList');
};
const Favorites = () => {
    return import('~page/Root/Favorites/Favorites');
};

Vue.use(VueRouter);

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: Auth
    },
    {
        path: '/',
        name: 'root',
        component: Root,
        redirect: {
            name: 'archive'
        },
        children: [
            {
                path: '/archive',
                name: 'archive',
                component: Archive
            },
            {
                path: '/recently-added',
                name: 'recently-added',
                component: RecentlyAdded
            },
            {
                path: '/watch-list',
                name: 'watch-list',
                component: WatchList
            },
            {
                path: '/favorites',
                name: 'favorites',
                component: Favorites
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
