import { AllProductResponse } from '../types/productI';
import useSWR from 'swr';

const useProducts = (query: string) => {
    const { isValidating, data, error, mutate, revalidate } = useSWR<AllProductResponse>(`${query}`,
        {
            revalidateOnFocus: false
        })
    // const {success,count,products,totalProducts} = data as AllProductResponse
    return { isValidating, ...data, error, mutate, revalidate }
}

export default useProducts
