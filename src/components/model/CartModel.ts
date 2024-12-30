import { Product } from "../../types";



export class CartModel {
  protected _cards: Product[] = [];

  addCard(card: Product) {
    this._cards.push(card);
  }
  deleteCard(card: Product) {
    this._cards = this._cards.filter(cartCard => cartCard.id !== card.id);
  }
  getCards() {
    return this._cards;
  }
  clear() {
    this._cards = [];
  }
  getCount() {
    return this._cards.length;
  }
  getTotalSum(){
    return this._cards.reduce((acc, card) => {
      acc += card.price;
      return acc;
    }, 0);
  }
}