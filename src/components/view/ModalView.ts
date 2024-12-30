import { IEvents } from "../base/events";


export class ModalView {

  protected modalElement: HTMLElement;
  protected closeButton;
  protected _content;

constructor(modalElement: HTMLElement, content: HTMLElement, protected page: HTMLElement, protected events: IEvents, public id: string) {
  this.modalElement = modalElement;
  this.closeButton = modalElement.querySelector('.modal__close');
  this._content = modalElement.querySelector('.modal__content');

  this._content.appendChild(content);
  this.closeButton.addEventListener('click', this.close.bind(this));
  this.modalElement.addEventListener('click', this.close.bind(this));
  this.modalElement.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());

  page.appendChild(this.modalElement);
}

open() {
  this.modalElement.classList.add('modal_active');
  this.page.style.overflow = 'hidden';
}

close() {
  this.modalElement.classList.remove('modal_active');
  this.page.style.overflow = 'auto';
}

}