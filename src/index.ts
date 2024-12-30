import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardModel } from './components/model/CardModel';
import { CartModel } from './components/model/CartModel';
import { CardView } from './components/view/CardView';
import { CartView } from './components/view/CartView';
import { ModalView } from './components/view/ModalView';
import './scss/styles.scss';
import { Product } from './types';
import { API_URL } from './utils/constants';

const page = document.querySelector('.page') as HTMLElement;
const cartElement = document.querySelector('.basket') as HTMLElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cartButton = document.querySelector('.header__basket') as HTMLElement;
const galleryElement = document.querySelector('.gallery');
const modalElement = document.querySelector('#modal-container');

const event = new EventEmitter();
const api = new Api(API_URL);
const cardModel = new CardModel(api);
const cardView = new CardView(cardPreviewTemplate,cardCatalogTemplate, event);
const cartView = new CartView(cartElement, event);
const cartModel = new CartModel();
const cartModal = new ModalView(modalElement.cloneNode(true) as HTMLElement, cartView.getCartElement(), page, event, 'cartModal');
const cardModals: ModalView[] = [];

async function initPage() {
    const cardsData = await cardModel.getCardsData();
    const cardsElement = cardsData.map((cardData) => {
        const cardElement = cardView.getCatalogCardElement(cardData);
        cardElement.addEventListener('click', () => event.emit('modal:open', { id: cardData.id }))
        return cardElement;
    });
    cardsElement.forEach(cardElement => {
        galleryElement.appendChild(cardElement)
    });

    cardsData.forEach(cardData => {
        const cardElement = cardView.getPreviewCardElement(cardData)
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
    cartView.addCartItems(cartItems);
    cartButton.querySelector('.header__basket-counter').textContent = cartModel.getCount().toString();
    cardModals.find(modal => modal.id === card.id).close();
});

cartButton.addEventListener('click', () => cartModal.open());

initPage();