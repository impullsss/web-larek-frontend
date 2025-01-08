import { Product, ProductList } from "../../types";
import { Api } from "../base/api";


export class CardModel {
    protected cardsData:Product[] = [];

    setCardsData(cardsData: Product[]){
        this.cardsData = cardsData;
    }

    getCardsData() {
      return this.cardsData;  
    }

}