
export type ProductCategory = 'софт-скил'|'другое'|'дополнительное'|'хард-скил'|'кнопка';


export interface Product {
    id:string;
    description:string;
    title:string;
    category:ProductCategory;
    price:number | null
}

export interface Order {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    total?: string | number;
    items:string[];
}

export interface OrderSuccess {
    id:string;
    total:number;
  }