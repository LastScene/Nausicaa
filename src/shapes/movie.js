import VT from 'vue-types';
import crewShape from './crew';

export default VT.shape({
    id: VT.string.isRequired,
    cover: VT.string.isRequired,
    title: VT.string.isRequired,
    director: crewShape.loose.isRequired,
    imdbRate: VT.oneOfType([VT.number, VT.string]).def('N/A')
});
