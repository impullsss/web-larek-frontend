

export class PageView {

  protected cartButton: HTMLElement;
  protected cartCounter: HTMLElement;
  protected galleryElement: HTMLElement;

  constructor(protected pageElement: HTMLElement){
    this.cartButton = this.pageElement.querySelector('.header__basket');
    this.cartCounter = this.cartButton.querySelector('.header__basket-counter');
    this.galleryElement = this.pageElement.querySelector('.gallery');
  }

  getCartButtonElement(){
    return this.cartButton;
  }
  setCartProductsCount(productCount: number){
    this.cartCounter.textContent = productCount.toString();
  }

  initGallery(cardElements: HTMLElement[]){
    this.galleryElement.innerHTML = '';

    cardElements.forEach(cardElement => {
      this.galleryElement.appendChild(cardElement)
  });
  }
}