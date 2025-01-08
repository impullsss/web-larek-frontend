import { Order, OrderStage } from "../../types";

export class OrderModel {
  order: Order = {
    payment: '',
    address: '',
    phone: '',
    email: '',
    total: '',
    items: []
  }

  constructor(protected currentStage: OrderStage, itemsId: string[]) {
    this.order.items = itemsId;
  }

  setItemsId(itemsId: string[]) {
    this.order.items = itemsId;
  }
  
  setTotal(total: number){
    this.order.total = total;
  }

  setStage(stage: OrderStage) {
    this.currentStage = stage;
  }

  getStage() {
    return this.currentStage;
  }

  setOrderAddress(address: string){
    this.order.address = address;
  }
  
  setOrderPaymentType(paymentType: string) {
    this.order.payment = paymentType;
  }

  setOrderData(email?: string, phone?: string){
    this.order.email = email;
    this.order.phone = phone;
  }

  setEmail(email: string) {
    this.order.email = email;
  }

  setPhone(phone: string){
    this.order.phone = phone;
  }

  getOrder(){
    return this.order;
  }

  validateAddressAndPaymentType() {
    const regexp = /^[а-яА-ЯёЁa-zA-Z0-9\s/.,-]{7,}$/;

    if (!this.order.address) {
      return 'Необходимо указать адрес'
    } else if (!regexp.test(this.order.address)) {
      return 'Укажите настоящий адрес'
    } else if (!this.order.payment) {
      return 'Выберите способ оплаты'
    }

    return null;
  }

  validateContacts() {
    const regexpEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexpPhone = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{10}$/;

    if (!this.order.email) {
      return 'Необходимо указать email';
    } else if (!regexpEmail.test(this.order.email)) {
      return 'Некорректный адрес электронной почты'
    }

    if (this.order.phone.startsWith('8')) {
      this.order.phone = '+7' + this.order.phone.slice(1);
    }

    if (!this.order.phone) {
      return 'Необходимо указать телефон';
    } else if (!regexpPhone.test(this.order.phone)) {
      return 'Некорректный формат номера телефона'
    }

    return null;
  }

}