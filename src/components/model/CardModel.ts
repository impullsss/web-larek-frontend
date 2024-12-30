import { Product, ProductList } from "../../types";
import { Api } from "../base/api";


export class CardModel {
    protected api:Api;
    protected cardsData:Product[] = [];


    constructor(api:Api) {
        this.api = api;
    }
   async getCardsData() {
        if (!this.cardsData.length) {
            const rawProducts = await this.api.get('/product/') as ProductList;
            this.cardsData = rawProducts.items;
            
        }
        return this.cardsData;
    }

}