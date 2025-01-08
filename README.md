# Web-ларёк
интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и делать заказы.  
[Посмотреть проект Web-ларёк.](https://impullsss.github.io/web-larek-frontend/)


## Описание

## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

В проекте применен принцип MVP (Model-View-Presenter), который обеспечивает четкое разделение ответственностей между классами Model и View каждый класс выполняет свою определенную роль:

Model - работа с загрузкой данных по API, сохранение и работа с данными полученными от пользователя.

View - отображает интерфейс для взаимодействия с пользователем, отлавливает и сообщает о произошедших событиях.

EventEmitter выступает в роли Представителя (Presenter) - связывает модели данных с отображением интерфейсов при сработке какого нибудь события, управляя взаимодействием между ними.

### Стек технологий:
    HTML, SCSS, TS, Webpack

### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

### Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Описание базовых классов

### Класс `Api` имеет следующие свойства и методы.

Методы:
- `constructor(baseUrl: string, options: RequestInit = {})`- принимает базовый URL и глобальные опции для всех запросов(опционально).
- `handleResponse(response: Response): Promise<object>` - обработчик ответа сервера.
- `get(uri: string)` - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - принимает изменяющеюся часть url-адреса, принимает данные в виде объекта для отправки на сервер, type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'.

### Класс `EventEmitter` - брокер событий, implements от IEvents и имеет следующие методы.

Класс EventEmitter реализует паттерн «Observer/Наблюдатель» и обеспечивает работу событий, его методы позволяют устанавливать и снимать слушатели событий, вызвать слушатели при возникновении события.

Методы:
- `on` - для подписки на событие.
- `off` - для отписки от события.
- `emit` - уведомления подписчиков о наступлении события соответственно.
- `onAll` - для подписки на все события.
- `offAll` - сброса всех подписчиков.
- `trigger` - генерирует заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса `EventEmitter`.

## Описание классов Model, которые позволяют хранить и обрабатывать данные с сервера и от пользователей.


### Класс `CartModel` хранит и работает с данными полученными от пользователя.

Методы:
- `getCount` - возвращает количество товаров в корзине.
- `getTotalSum` - считает и возвращает сумму синапсов всех товаров в корзине.
- `addСard` - добавляет товар в корзину.
- `deleteCard` - удаляет товар из корзины.
- `clear` - очищает/удаляет все товары из корзины.

### Класс `CardModel` принимает и хранит данные продуктов полученные с сервера.

Метод:
- `getActiveCard` - получает данные карточки которую открыл пользователь.

### Класс `OrderModel` хранит данные полученные от пользователя.

Методы:
- `setOrderAddress` - принимаем/сохраняет адрес пользователя.
- `validateOrder` - проверяет адрес пользователя / и способ оплаты.
- `setOrderData` - принимаем/сохраняет номер телефона/почту пользователя.
- `validateContacts` - проверяет номер телефона/почту пользователя.
- `getOrderLot` - возвращает объект данных пользователя с выбранными товарами.
- `setStage` - устанавливает этап оформления заказа.
- `getStage` - получение текущего этапа оформления заказа.

## Классы View позволяют отображать элементы страницы с полученными данными, позволяют взаимодействовать с пользователем.

### Класс `CartView` управляет отображением корзины.

Методы:
- `renderCart` - отрисовывает корзину.

### Класс `CartItem` управляет отображением элементов(продуктов) в корзине.

Метод:
- `setCardItemData` - принимает данные для отрисовки карточки в корзину.
- `renderCardItem` - отрисовывает карточку в корзине.

### Класс `CardView` управляет отображением карточки товара на веб странице.

Методы:
- `setCardData` - принимает данные для отрисовки карточки в корзину.
- `renderCard` - отрисовывает карточку в корзине.


### Класс `OrderView` управляет отображением содержимого модального окна и позволяет принять от пользователя метод оплаты и адрес.

Метод:
- `paymentSelection` - устанавливаем обводку вокруг выбранного метода оплаты.


### Класс `ModalView` управляет отображением модальных окон.

Методы:
- open - отображает модальное окон.
- close - закрывает модальное окно.

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Типы данных и интерфейсы

### Тип описывающий все возможные категории товара
```
type ProductCategory = 'софт-скил'|'другое'|'дополнительное'|'хард-скил'|'кнопка';
```
### Интерфейс описывающий карточку товара в магазине
```
interface Product {
    id:string; // уникальный ID
    description:string; // описание товара
    title:string;   // название
    category:ProductCategory;  // категория товара
    price:number | null // цена товара, может быть null
}
```
### Интерфейс описывающий корзину с товаром в магазине
```
interface Order {
    payment?: string; // Способ оплаты
    address?: string;// Адрес доставки
    phone?: string; // Телефон
    email?: string; // Электронная почта
    total?: string | number; // Сумма заказа
    items:string[]; // Массив ID купленных товаров
}
```
### Интерфейс описывающий потдверждение товара
```
interface OrderSuccess {
    id:string;  // уникальный ID
    total:number;  // Сумма заказа
  }
```
