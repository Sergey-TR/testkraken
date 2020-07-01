class List {
     constructor(url, container, basket) {
         this.url = 'https://raw.githubusercontent.com/Sergey-TR/testrepo/master' + url;
         this.container = container;
         this.items = [];
         this._init(basket);
     }

     _init(basket = false) {
         this._get(this.url)
             .then(data => {
                 this.items = !basket ? data : data.contents;
                 // this.items = data.length ? data : data.contents;
                 //catalog => [...], basket => {... contents: [...]}
                 this._render();
                 this._handleEvents();
                 console.log(this.constructor.name, this)
         })
     }

     _get(url) {
         return fetch(url).then(data => data.json());     }

     _render() {
         let htmlStr = '';
         this.items.forEach (item => {
             htmlStr += new connect[this.constructor.name](item).render();
         })
         document.querySelector(this.container).innerHTML = htmlStr;      
     }

     _handleEvents() { 
         return ''
     }
 }

 class Item {
     constructor(item) {
         this.item = item;     }

     render() {
         return `<div class="catalog-item">
                     <img src="${this.item.img}" alt="${this.item.product_name}">
                     <div class="desc">
                         <h3>${this.item.product_name}</h3>
                         <p>${this.item.price} $ per hour</p>
                         <button 
                             class="buy-btn" 
                             name="buy"
                             data-name="${this.item.product_name}"
                             data-price="${this.item.price}"
                             data-id="${this.item.id_product}"
                             data-img_sm="${this.item.img_sm}"
                         >TAKE</button>
                     </div>
                 </div>`
     }
 }
 class Catalog extends List {
     constructor(basket, url = '/dataCatalog.json', container = '.catalog-items') {
         super(url, container);         this.basket = basket;
     }
     _handleEvents() {
         document.querySelector(this.container).addEventListener('click', evt => {
             if (evt.target.name == 'buy') {
                 this.basket.add(evt.target.dataset);
             }
         });
     }
 }

 class Basket extends List {
     constructor(url = '/getBasket.json', container = '.basket-item', basket = true) {
         super(url, container, basket);
     }
     _handleEvents() {
         document.querySelector(this.container).addEventListener('click', evt => {
             if (evt.target.name == 'remove') {
                 this.remove(evt.target.dataset.id);
             }
         });

         document.querySelector('.my_account_check').addEventListener('click', evt => {
            document.querySelector('.catalog-items').classList.toggle('invisible');
        })
     }

     add(item) {
         let find = this.items.find(el => el.id_product == item.id);
         if (find) {
            find.quantity++;
             this._render();
        } else {
             let itemNew = { img_sm: item.img_sm, id_product: item.id, product_name: item.name, price: +item.price, quantity: 1 };
             this.items.push(itemNew);
             this._render();
         }
         
         let totalSumm = 0;
         let mutch = 0;
        
        for (let key in this.items) {
            totalSumm += this.items[key].price * this.items[key].quantity;
            mutch += this.items[key].quantity;
        }
    
        document.querySelector('.span_total').textContent = totalSumm;
        document.querySelector('.cart__total_span').textContent = mutch;
        
    }

     remove(itemId) {
         let find = this.items.find(el => el.id_product == itemId);
         if (find.quantity == 1) {
            this.items.splice(this.items.indexOf(find), 1);
        } else {
            find.quantity--;
        }
        this._render();
         //console.log('попытка удалить ' + itemId)
         let totalSumm = +document.querySelector('.span_total').textContent;
         let mutch = +document.querySelector('.cart__total_span').textContent;
            totalSumm -= find.price;
            mutch --;
    
        document.querySelector('.span_total').textContent = totalSumm;
        document.querySelector('.cart__total_span').textContent = mutch;
     }
 }

 class CatalogItem extends Item {}

 class BasketItem extends Item {
     constructor(item) {
         super(item)
     }

     render() {
         return `<div class="basket-item">
                     <img src="${this.item.img_sm}" alt="${this.item.product_name}">
                     <div class="product-desc">
                         <p class="product-title">${this.item.product_name}</p>
                         <p class="product-amount">${this.item.quantity} X ${this.item.price}</p>
                         <p class="product-price">summ <span class="product-price-span">${this.item.price * this.item.quantity}</span></p>
                     </div>
                     <div class="right-block">
                         
                         <button class="del-btn" name="remove" data-id="${this.item.id_product}">&times;</button>
                     </div>
                 </div>`
     }
 }


 let connect = {
     'Catalog': CatalogItem,
     'Basket': BasketItem
 }

 //export default () => {
     let basket = new Basket();
     let catalog = new Catalog(basket);
 //} 