import VT from 'vue-types';

export default VT.shape({
    id: VT.number.isRequired,
    job: VT.string.isRequired,
    department: VT.string.isRequired,
    name: VT.string.isRequired,
    profile_path: VT.string.isRequired
});
