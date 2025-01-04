import { Order, OrderStage } from "../../types";
import { IEvents } from "../base/events";


export class OrderView {
  protected orderFormElement: HTMLElement;
  protected orderContactFormElement: HTMLElement;
  protected successElement: HTMLElement;

  constructor(
    protected templateOrderForm: HTMLTemplateElement,
    protected templateOrderContactForm: HTMLTemplateElement,
    templateSuccess: HTMLTemplateElement,
    protected events: IEvents
  ) {
    this.orderFormElement = this.templateOrderForm.content.querySelector('form').cloneNode(true) as HTMLElement;
    this.orderContactFormElement = this.templateOrderContactForm.content.querySelector('form').cloneNode(true) as HTMLElement;
    this.successElement = templateSuccess.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
  }

  private getOrderForm(){
    const cardButton = this.orderFormElement.querySelector('button[name="card"]') as HTMLButtonElement;
    const cashButton = this.orderFormElement.querySelector('button[name="cash"]') as HTMLButtonElement;
    const addressInput = this.orderFormElement.querySelector('input[name="address"]') as HTMLInputElement;

    cardButton.addEventListener('click', () => {
      this.events.emit('order:setPaymentType', { paymentType: 'card' });
    });
    cashButton.addEventListener('click', () => {
      this.events.emit('order:setPaymentType', { paymentType: 'cash' });
    });

    addressInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      this.events.emit('order:setAddress', { address: inputElement.value });
    });

    this.orderFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('order:changeStage', { orderStage: 'selectEmailPhone' });
    })

    return this.orderFormElement;
  }

  private getOrderContactForm() {
    const emailInput = this.orderContactFormElement.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = this.orderContactFormElement.querySelector('input[name="phone"]') as HTMLInputElement;
  
    emailInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      this.events.emit('order:setEmail', { email: inputElement.value });
    });
    phoneInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      this.events.emit('order:setPhone', { phone: inputElement.value });
    });

    this.orderContactFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('order:finish');
    })
  
    return this.orderContactFormElement;
  }

  setPaymentType(paymentType: string) {
    const cardButton = this.orderFormElement.querySelector('button[name="card"]') as HTMLButtonElement;
    const cashButton = this.orderFormElement.querySelector('button[name="cash"]') as HTMLButtonElement;

    cashButton.style.border = '';
    cardButton.style.border = '';

    if (paymentType === 'card') cardButton.style.border = '2px solid white';
    if (paymentType === 'cash') cashButton.style.border = '2px solid white';
  }

  setErrorText(errorText: string){
    const orderFormErrorsField = this.orderFormElement.querySelector('.form__errors') as HTMLElement;
    orderFormErrorsField.textContent = errorText;

    const orderContactFormErrorsField = this.orderContactFormElement.querySelector('.form__errors') as HTMLElement;
    orderContactFormErrorsField.textContent = errorText;
  }

  setContinueButtonActive(active: boolean){
    const continueButton = this.orderFormElement.querySelector('.order__button') as HTMLButtonElement;
    continueButton.disabled = active;
  }

  setFinishButtonActive(active: boolean){
    const finishButton = this.orderContactFormElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    finishButton.disabled = active;
  }

  getSuccessElement(order: Order){
    this.successElement.querySelector('.order-success__description').textContent = `Списано ${order.total} синапсов`;
    this.successElement.querySelector('.order-success__close').addEventListener('click', () => this.events.emit('order:success'));
    return this.successElement;
  }

  getFormElement(stage: OrderStage){
    return stage === 'selectPaymentType' ? this.getOrderForm() : this.getOrderContactForm();
  }
}