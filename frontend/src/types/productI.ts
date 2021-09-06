
export type image = {
    public_id : string
    url:string
  }
  type reviews = {
    _id:string
    user:string
    name : string
    rating:number
    comment:string
  }
  enum Category  {
    electronics = "electronics",
    food = "food",
    camera = "camera",
    laptops = "laptops",
    mobiles = "mobiles",
    headphones = "headphones",
    accessories = "accessories",
    sports = "sports",
    outdoor = "outdoor",
  }
  
  export default interface IProduct  {
    _id:string
    name: string;
    description: string;
    price: number;
    stock:number;
    numOfReviews : number;
    ratings:number;
    images : image[];
    category : Category;
    seller:string;
    reviews : reviews[]
    cretedAt:string
    
  }
  export interface AllProductResponse{
    success: true, products: IProduct[],resultsPerPage? : number, count: number, totalProducts: number 
  }  
  export interface SingleProductResponse{
    success: true, product: IProduct 
  }