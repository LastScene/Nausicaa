import VT from 'vue-types';

export default VT.shape({
    id: VT.string.isRequired,
    cover: VT.string.isRequired,
    title: VT.string.isRequired,
    director: VT.string.isRequired,
    imdbRate: VT.oneOfType([VT.number, VT.string]).def('N/A')
});
