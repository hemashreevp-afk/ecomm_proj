export interface signup{
  id: number;  
  name: string;
  email: string;
  password: string;
}
export interface login{ 
    id: number;  
  email: string;
  password: string;
}
export interface Product{
  id: number;  
  name: string;
  price: number;
  colour: string;
  description: string;
  imageUrl: string;
  category: string;
}