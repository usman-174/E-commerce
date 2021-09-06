export default interface User {
    _id?:string
    name?:string
    email?:string
    avatar ?:avatar
    role : 'user'|'admin'
    createdAt:string
}
interface avatar {
    public_id :string,
    url:string
}
export interface AxiosResponse{
    success : boolean,
    message?:string,
    user ?: User
}