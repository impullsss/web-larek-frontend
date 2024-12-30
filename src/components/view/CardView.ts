import { IEvents } from "../base/events";
import { Product, ProductCategory } from "../../types";
import { CDN_URL } from "../../utils/constants";

export class CardView {

    protected _cardPreviewTemplate: HTMLTemplateElement;
    protected _cardCatalogTemplate: HTMLTemplateElement;
    protected _colors: Record<string, string> = {
        "дополнительное": "additional",
        "софт-скил": "soft",
        "кнопка": "button",
        "хард-скил": "hard",
        "другое": "other",
      }

    constructor(cardPreviewTemplate: HTMLTemplateElement, cardCatalogTemplate:HTMLTemplateElement, protected events: IEvents) {
        this._cardPreviewTemplate = cardPreviewTemplate;
        this._cardCatalogTemplate = cardCatalogTemplate;
    }
      // Метод для иницилизации превью карточки
     getPreviewCardElement(cardData: Product)  {
        const cardElement = this._cardPreviewTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement;
        const cardCategory = cardElement.querySelector('.card__category');
        const cardTitle = cardElement.querySelector('.card__title');
        const cardImage = cardElement.querySelector('.card__image') as HTMLImageElement;
        const cardPrice = cardElement.querySelector('.card__price');
        const cardDescription = cardElement.querySelector('.card__text');
        const cardButton = cardElement.querySelector('.card__button');

        cardCategory.textContent = cardData.category;
        this.updateCategory(cardCategory, cardData.category)
        cardTitle.textContent = cardData.title;
        cardImage.src = `${CDN_URL}${cardData.image}`;
        cardImage.alt = cardTitle.textContent;
        cardPrice.textContent = this.getPrice(cardData.price);
        cardDescription.textContent = cardData.description;
        cardButton.addEventListener('click', () => this.events.emit('cart:addCard', { card: cardData }));
        return cardElement;

    } 
    // Метод для иницилизации карточки на странице
    getCatalogCardElement (cardData:Product) {
      const cardElement = this._cardPreviewTemplate.content.querySelector('.card').cloneNode(true) as HTMLElement;
        const cardCategory = cardElement.querySelector('.card__category');
        const cardTitle = cardElement.querySelector('.card__title');
        const cardImage = cardElement.querySelector('.card__image') as HTMLImageElement;
        const cardPrice = cardElement.querySelector('.card__price');

        cardCategory.textContent = cardData.category;
        this.updateCategory(cardCategory, cardData.category)
        cardTitle.textContent = cardData.title;
        cardImage.src = `${CDN_URL}${cardData.image}`;
        cardImage.alt = cardTitle.textContent;
        cardPrice.textContent = this.getPrice(cardData.price);
        return cardElement;
    }

    
        updateCategory(categoryElement: Element, text: ProductCategory) {
        categoryElement.textContent = text;
        categoryElement.className = `card__category card__category_${this._colors[text]}`
        return categoryElement;
      }
    
      protected getPrice(value: number | null): string {
        if (value === null) {
          return 'Бесценно'
        }
        return String(value) + ' синапсов'
      }



}