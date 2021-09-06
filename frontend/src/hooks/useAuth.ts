import useSWR  from 'swr';
import User from '../types/UserI'

interface loginResponse{
    success:boolean,
    user : User
}

const useAuth = () => {
const {isValidating,data ,error,mutate,revalidate} = useSWR<loginResponse>('users/me',{revalidateOnFocus:true})
    
    return{isValidating,...data,error,mutate,revalidate}
}

export default useAuth
