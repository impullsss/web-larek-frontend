import { Product } from "../../types";
import { IEvents } from "../base/events";


export class CartView {

  protected cartItem: HTMLElement;
  protected cartButton: HTMLButtonElement;

  constructor(protected cartElement: HTMLElement, protected events: IEvents){
    this.cartItem = cartElement.querySelector('.basket__item');
    this.cartElement.querySelector('.basket__list').innerHTML = '';
    this.cartElement.querySelector('.basket__price').textContent = '0 синапсов';
    this.cartButton = this.cartElement.querySelector('.button') as HTMLButtonElement;
    this.cartButton.addEventListener('click', () => events.emit('order:start'));
  }

  getCartElement() {
    return this.cartElement;
  }

  addCartItems(cards: Product[], cartTotal: number) {
    const cartListElement = this.cartElement.querySelector('.basket__list');
    cartListElement.innerHTML = 'Ваша корзина пуста';

    const cartItemElements = cards.map((card, index) => {
      const clonedCartItem = this.cartItem.cloneNode(true) as HTMLElement;

      clonedCartItem.querySelector('.basket__item-index').textContent = String(index + 1);
      clonedCartItem.querySelector('.card__title').textContent = card.title;
      clonedCartItem.querySelector('.card__price').textContent = `${card.price} синапсов`;
      clonedCartItem.querySelector('.basket__item-delete').addEventListener('click', () => this.events.emit('cart:deleteCard', card));
      
      return clonedCartItem;
    });

    this.cartElement.querySelector('.basket__price').textContent = `${cartTotal} синапсов`;

    if (!cartItemElements.length){
      this.cartButton.disabled = true;
      return;
    }

    cartListElement.append(...cartItemElements);
    this.cartButton.disabled = false;
  }

}