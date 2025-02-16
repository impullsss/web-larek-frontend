import { ApiController } from './components/ApiController';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardModel } from './components/model/CardModel';
import { CartModel } from './components/model/CartModel';
import { OrderModel } from './components/model/OrderModel';
import { CardView } from './components/view/CardView';
import { CartView } from './components/view/CartView';
import { ModalView } from './components/view/ModalView';
import { OrderView } from './components/view/OrderView';
import { PageView } from './components/view/PageView';
import './scss/styles.scss';
import { OrderStage, Product } from './types';
import { API_URL } from './utils/constants';

const orderFormElement = document.querySelector('#order') as HTMLTemplateElement;
const orderContactFormElement = document.querySelector('#contacts') as HTMLTemplateElement;
const orderSuccessTemplate = document.querySelector('#success') as HTMLTemplateElement;
const page = document.querySelector('.page') as HTMLElement;
const cartElement = document.querySelector('.basket') as HTMLElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const modalElement = document.querySelector('#modal-container');

const event = new EventEmitter();
const api = new Api(API_URL);
const cardModel = new CardModel();
const cardView = new CardView(cardPreviewTemplate,cardCatalogTemplate, event);
const cartView = new CartView(cartElement, event);
const orderView = new OrderView(orderFormElement, orderContactFormElement, orderSuccessTemplate, event);
const pageView = new PageView(page);

const apiController = new ApiController(api);
const cartModel = new CartModel();

cartView.addCartItems([], 0);

const cartModal = new ModalView(modalElement.cloneNode(true) as HTMLElement, cartView.getCartElement(), page, event, 'cartModal');
const orderModal = new ModalView(modalElement.cloneNode(true) as HTMLElement, null, page, event, 'orderModal');
const orderModel = new OrderModel('selectPaymentType', []);
let cardModals: ModalView[] = [];

async function initPage() {
    const rawCardsData = await apiController.getCardsData();
    cardModel.setCardsData(rawCardsData.items);

    const cardsData = cardModel.getCardsData();
    const cardsElement = cardsData.map((cardData) => {
        const cardElement = cardView.getCatalogCardElement(cardData);
        cardElement.addEventListener('click', () => event.emit('modal:open', { id: cardData.id }))
        return cardElement;
    });

    pageView.initGallery(cardsElement);

    generatePreviewCardElements();
}

function generatePreviewCardElements() {
    const cardsData = cardModel.getCardsData();
    const cartItems = cartModel.getCards();
    cardModals = [];

    cardsData.forEach(cardData => {
        const cardElement = cardView.getPreviewCardElement(cardData, !cardData.price || cartItems.includes(cardData))
        const modal = new ModalView(modalElement.cloneNode(true) as HTMLElement, cardElement, page, event, cardData.id);
        cardModals.push(modal);
    });
}

event.on('modal:open', (options: { id: string }) => {
    const { id } = options;
    cardModals.find(modal => modal.id === id).open();
});

event.on('cart:addCard', (options: { card: Product }) => {
    const { card } = options;

    cartModel.addCard(card);
    const cartItems = cartModel.getCards();
    const cartTotal = cartModel.getTotalSum();
    cartView.addCartItems(cartItems, cartTotal);
    pageView.setCartProductsCount(cartModel.getCount());
    cardModals.find(modal => modal.id === card.id).close();

    generatePreviewCardElements();
});

event.on('cart:deleteCard', async (card: Product) => {
    cartModel.deleteCard(card);
    const cartItems = cartModel.getCards();
    const cartTotal = cartModel.getTotalSum();
    cartView.addCartItems(cartItems, cartTotal);
    pageView.setCartProductsCount(cartModel.getCount());

    generatePreviewCardElements();
});

event.on('order:start', () => {
    orderModel.setStage('selectPaymentType');
    orderModel.setItemsId(cartModel.getCards().map(card => card.id));
    orderModel.setTotal(cartModel.getTotalSum());
    const orderStage = orderModel.getStage();
    const orderFormElement = orderView.getFormElement(orderStage);
    orderModal.setContent(orderFormElement);
    orderModal.open();
    cartModal.close();
    cartModel.clear();
    cartView.addCartItems([], 0);
    cartModal.setContent(cartView.getCartElement());
    pageView.setCartProductsCount(cartModel.getCount());
})

event.on('order:setPaymentType', (options: { paymentType: string }) => {
    const { paymentType } = options;
    orderModel.setOrderPaymentType(paymentType);
    orderView.setPaymentType(paymentType);
    const errorText = orderModel.validateAddressAndPaymentType();
    orderView.setErrorText(errorText);

    if (errorText) {
        orderView.setContinueButtonActive(true);
    } else {
        orderView.setContinueButtonActive(false);
    }
})

event.on('order:setAddress', (options: { address: string }) => {
    const { address } = options;
    orderModel.setOrderAddress(address);
    const errorText = orderModel.validateAddressAndPaymentType();
    orderView.setErrorText(errorText);

    if (errorText) {
        orderView.setContinueButtonActive(true);
    } else {
        orderView.setContinueButtonActive(false);
    }
});

event.on('order:changeStage', (options: { orderStage: OrderStage }) => {
    const { orderStage } = options;
    orderModel.setStage(orderStage);
    const orderFormElement = orderView.getFormElement(orderStage);
    orderModal.close();
    orderModal.setContent(orderFormElement);
    orderModal.open();
});

event.on('order:setEmail', (options: { email: string }) => {
    const { email } = options;
    orderModel.setEmail(email);
    const errorText = orderModel.validateContacts();
    orderView.setErrorText(errorText);
    
    if (errorText) {
        orderView.setFinishButtonActive(true);
    } else {
        orderView.setFinishButtonActive(false);
    }
});

event.on('order:setPhone', (options: { phone: string }) => {
    const { phone } = options;
    orderModel.setPhone(phone);
    const errorText = orderModel.validateContacts();
    orderView.setErrorText(errorText);
    
    if (errorText) {
        orderView.setFinishButtonActive(true);
    } else {
        orderView.setFinishButtonActive(false);
    }
});

event.on('order:finish', async () => {
    const order = orderModel.getOrder();
    const orderFormElement = orderView.getSuccessElement(order);
    await apiController.postOrder(order);
    orderModal.close();
    orderModal.setContent(orderFormElement);
    orderModal.open();
});

event.on('order:success', () => {
    orderModal.close();
})

pageView.getCartButtonElement().addEventListener('click', () => cartModal.open());

initPage();