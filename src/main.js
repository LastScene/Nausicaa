import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { Plugin as VueFragment } from 'vue-fragment';
import SvgIcon from 'vue-svgicon';
import _upperFirst from 'lodash.upperfirst';
import _camelCase from 'lodash.camelcase';
import vueBemCn from 'vue-bem-cn';

import App from './App.vue';
import router from './router';
import '~styles/global.scss';

const requireComponent = require.context(
    './components/base',
    true,
    /Base[A-Z]\w+\.vue$/
);
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = _upperFirst(
        _camelCase(
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(VueCompositionApi);

Vue.use(VueFragment);

Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    isOriginalDefault: true
});

Vue.use(vueBemCn, {
    delimiters: {
        ns: '',
        el: '__',
        mod: '--',
        modVal: ':'
    },
    hyphenate: false
});


Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => {
        return h(App);
    }
}).$mount('#app');
