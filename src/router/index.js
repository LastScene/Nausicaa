import Vue from 'vue';
import VueRouter from 'vue-router';
import { isElectron } from '~config/environtment';

const Auth = () => {
    return import('~pages/Auth/Auth');
};
const Root = () => {
    return import('~pages/Root/Root');
};
const Archive = () => {
    return import('~pages/Root/Archive/Archive');
};
const RecentlyAdded = () => {
    return import('~pages/Root/RecentlyAdded/RecentlyAdded');
};
const WatchList = () => {
    return import('~pages/Root/WatchList/WatchList');
};
const Favorites = () => {
    return import('~pages/Root/Favorites/Favorites');
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
    mode: isElectron ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
