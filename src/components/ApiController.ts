import { Order, OrderSuccess, Product, ProductList } from "../types";
import { Api } from "./base/api";


export class ApiController {

  constructor(protected api: Api){

  }

  async getCardsData() {
    try {
      const rawCardsData = await this.api.get('/product/') as ProductList;
      return rawCardsData;
    }catch(e){
      console.log(e);
      return {
        items: [],
        count: 0
      };
    }
  }

  async postOrder(order: Order){
    try{
      const orderResponse = await this.api.post('/order', order) as OrderSuccess;
      return orderResponse;
    }catch(e){
      console.log(e);
      return null;
    }
  }
}