import { reactive } from '@vue/composition-api';
import account from './account';
import archive from './archive';

export default function useRepository() {
    return reactive({
        account,
        archive
    });
}
export const RepositoryKey = Symbol('repository key');
