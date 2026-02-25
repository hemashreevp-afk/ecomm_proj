export interface signup{
  name: string;
  email: string;
  password: string;
}
export interface login{ 
  email: string;
  password: string;
}
export interface Product{
  name: string;
  price: number;
  colour: string;
  description: string;
  imageurl: string;
  category: string;
}