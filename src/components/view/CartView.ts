import { Product } from "../../types";
import { IEvents } from "../base/events";


export class CartView {

  protected cartItem: HTMLElement;

  constructor(protected cartElement: HTMLElement, protected events: IEvents){
    this.cartItem = cartElement.querySelector('.basket__item');
  }

  getCartElement() {
    return this.cartElement;
  }

  addCartItems(cards: Product[]) {
    const cartListElement = this.cartElement.querySelector('.basket__list');
    cartListElement.innerHTML = '';

    const cartItemElements = cards.map((card, index) => {
      const clonedCartItem = this.cartItem.cloneNode(true) as HTMLElement;

      clonedCartItem.querySelector('.basket__item-index').textContent = String(index + 1);
      clonedCartItem.querySelector('.card__title').textContent = card.title;
      clonedCartItem.querySelector('.card__price').textContent = card.price.toString();
      
      return clonedCartItem;
    });

    cartListElement.append(...cartItemElements);
  }

}