'use strict';

let unityBtns = document.querySelectorAll('.product__btn');
unityBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        let img = event.srcElement.dataset.img;
        unity.addProduct({
            id: id,
            price: price,
            name: name,
            img: img
        });
    });
});

let unity = {
    products: {},

    /**
     * Функция собирает инфо о продукте и добавляет в корзину
     * @param {{id: string, price: string, name: string}} product 
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.putProductInCart(product);
        this.putProductInMyCart();
        this.putProductInBigCart(product); //будет "отрисовывать" товар в bigCart
        this.putTotalSum();
        this.putTotalSumBc(product);
        this.addRemoveProdCart();
        this.addRemoveAllCart(); //сделать кнопку общего удаления и разобраться времени не хватило, наверное получилось
    },
    /**
     * очищаем объект products и вызываем метод подсчета суммы товара, а так же метод удаления товаров из таблицы
     */
    removeAllProdFromCart() {
        unity.products = {};
        unity.putTotalSum();
        unity.muchDelete();
        unity.removeAllRows();
    },
    /**
     * функция обнуляет общее количество товара в корзине
     */
    muchDelete() {
        document.querySelector('.much').textContent = 0;
    },
    /**
     * удаляем tbody, тем самым очищаем таблицу,а потом создаем новый tbody
     * ВОТ ЗДЕСЬ ЕСТЬ ВОРОС, У МЕНЯ НЕ ПОЛУЧИЛОСЬ ВСТАВИТЬ TBODY КУДА НАДО, ПОЧЕМУ ТО
     * НЕ ВСТАВЛЯЛОСЬ, НО И ТАК ВСЕ РАБОТАЕТ
     */
    removeAllRows() {
        let allProd = document.querySelector('tbody');
        allProd.remove();
        let newBody = document.createElement('tbody');
        let table = document.querySelector('table');
        table.insertAdjacentElement("beforeend", newBody);

    },
    /**
     * добаиляем кнопку общего сброса и назначаем слушатель событий клик
     */
    addRemoveAllCart() {

        let cleanAllCart = document.querySelector('.allClean');
        cleanAllCart.addEventListener('click', unity.removeAllProdFromCart);
    },

    /**
     * функция обрабатывает событие клик по кнопке удалить товар
     * @param {clickMouse} event 
     */
    removeProductListener(event) {
        //this будет указывать на кнопку productCleanBtn, а не на весь объект unity
        //нам нужен объект, поэтому здесь обращаемся конкретно к объекту unity
        unity.removeProduct(event);
        unity.removeMuch();
        unity.putTotalSum();
    },
    /**
     * функция удаляет продукт из списка продуктов unity и из корзины
     * @param {clickMouse} event 
     */
    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromUnity(id);
        this.removeProductFromCart(id);
    },
    /**
     * функция удаляет товар из корзины, если количество = 1, удаляет всю строку
     * если > 1 уменьшает на 1
     * @param {string} id 
     */
    removeProductFromCart(id) {
        //получаем строку товара, элемент
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1) {
            //если = 1, удаляем всю строку, parentNode указывает на всю строку
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },

    removeProductFromUnity(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    },
    /**
     * добавляем слушателя событий на кнопку удалить класс - productCleanBtn
     */
    addRemoveProdCart() {
        let clearBtns = document.querySelectorAll('.productCleanBtn');
        for (let i = 0; i < clearBtns.length; i++) {
            //this  перед removeProductListener указывает на одну и туже функцию
            // если без него буден несколько одинаковых
            clearBtns[i].addEventListener('click', this.removeProductListener);
        }
    },
    /**
     * функция уменьшает общее количество товара в корзине, после удаления товара
     */
    removeMuch() {
        document.querySelector('.much').textContent = this.removeMuchProducts();
    },

    removeMuchProducts() {
        let reduceMuch = document.querySelector('.much').textContent;
        reduceMuch = reduceMuch - 1;
        return reduceMuch;
    },
    /**
     * функция считает общее количество товаров в корзине
     */
    putProductInMyCart() {
        document.querySelector('.much').textContent = this.getMuchProducts();
    },

    getMuchProducts() {
        let much = 0;
        for (let key in this.products) {
            let muchOne = this.products[key].count
            much += muchOne;
        }
        return much;
    },
    /**
    * Метод должен передовать сумму в большую корзину, но передает только по одному продукту. КСТАТИ КАК ЕГО ЗДЕСЬ ВЫБИРАТЬ
    */
    putTotalSumBc(product) {
        document.querySelector('.bigCartProdSum').textContent = this.getToyalSum();
    },
    /**
     * Функция передает сумму продуктов в корзину
     */
    putTotalSum() {
        document.querySelector('.total').textContent = this.getToyalSum();
    },

    getToyalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },
    /**
     * Функция добавляет продукт в объект с продуктами в корзину
     * @param {{id: string, price: string, name: string}} product 
     */
    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }

    },
    /**
     * Функция отрисовывает объект в корзине, если он есть, то увеличивает на 1
     * @param {{id: string, price: string, name: string}} product 
     * @returns
     */
    putProductInCart(product) {
        let productHave = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productHave) {
            productHave.textContent++;
            return;
        }
        let productRow = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td class="productCount" data-id="${product.id}">1</td>
            <td><i class="fas fa-trash-alt productCleanBtn" data-id="${product.id}"></i></td>
        </tr>
        `;
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

    putProductInBigCart(product) {

        let prodHaveId = document.querySelectorAll('.bigCartProdId');
        for (let i = 0; i < prodHaveId.length; i++) {
            if (prodHaveId[i]) {
                if (prodHaveId[i].textContent == `${product.id}`) {
                    let prodHaveCount = document.querySelectorAll('.bigCartProdCount');
                    for (let j = 0; j < prodHaveCount.length; j++) {
                        prodHaveCount[i].textContent++;
                        return;
                    }
                }
                
            }
        };

        let prodBigCart = document.createElement('div');
        prodBigCart.className = 'bigCartProduct';
        bigCart.append(prodBigCart);

        let prodBigCartId = document.createElement('div');
        prodBigCartId.className = 'bigCartProdId';
        prodBigCart.appendChild(prodBigCartId).textContent = `${product.id}`;
        
        let prodBigCartImg = document.createElement('div');
        prodBigCartImg.className = 'bigCartProdImg';
        prodBigCart.appendChild(prodBigCartImg).innerHTML = `${product.img}`
        
        let prodBigCartName = document.createElement('div');
        prodBigCartName.className = 'bigCartProdName';
        prodBigCart.appendChild(prodBigCartName).textContent = `${product.name}`;
        
        let prodBigCartPrice = document.createElement('div');
        prodBigCartPrice.className = 'bigCartProdPrice';
        prodBigCart.appendChild(prodBigCartPrice).textContent = `${product.price}`;

        let prodBigCartCount = document.createElement('div');
        prodBigCartCount.className = 'bigCartProdCount';
        prodBigCart.appendChild(prodBigCartCount).textContent = 1;
        
        let prodBigCartSum = document.createElement('div');
        prodBigCartSum.className = 'bigCartProdSum';
        prodBigCart.appendChild(prodBigCartSum).textContent = this.putTotalSumBc(product);
        
        let prodBigCartDelete = document.createElement('div');
        prodBigCartDelete.className = 'bigCartProdDelete';
        prodBigCart.appendChild(prodBigCartDelete).innerHTML = '<i class="fas fa-trash-alt productCleanBtn" data-id="${product.id}"></i>'; 
    },

};
