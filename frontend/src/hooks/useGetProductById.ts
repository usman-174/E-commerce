import { SingleProductResponse } from './../types/productI';
import useSWR from 'swr';

const useProductById = (query: string) => {
    const { isValidating, data, error, mutate, revalidate } = useSWR<SingleProductResponse>(`${query}`,
        {
            revalidateOnFocus: true
        })
    // const {success,count,products,totalProducts} = data as AllProductResponse
    return { isValidating, ...data, error, mutate, revalidate }
}

export default useProductById
