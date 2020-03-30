import account from './account';

export default function useRepository() {
    return {
        account
    };
}
export const RepositoryKey = Symbol('repository key');
