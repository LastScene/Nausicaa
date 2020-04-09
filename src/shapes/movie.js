import VueTypes from 'vue-types';

export default VueTypes.shape({
    id: VueTypes.string.isRequired,
    cover: VueTypes.string.isRequired,
    title: VueTypes.string.isRequired,
    director: VueTypes.string.isRequired,
    imdbRate: VueTypes.oneOfType([VueTypes.number, VueTypes.string]).def('N/A')
});
