import expirations from '../data/expirations';

export interface Expiration {
    id: number;
    name: string;
    length: number;
}


const useExpirations = () => ({data: expirations, isLoading: false, error: false});

export default useExpirations;