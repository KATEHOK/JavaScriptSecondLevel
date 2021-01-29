'use strict'
// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий).
// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий).
// Дополнительно гамбургер можно
// ### Посыпать приправой (+15 рублей, +0 калорий)
// ### Полить майонезом (+20 рублей, +5 калорий)
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
class Burger {
    constructor() {
        this.size = new Param(document.querySelector('[name="size"]:checked'));
        this.filling = new Param(document.querySelector('[name="filling"]:checked'));
        this.toppings = this._fillToppings();
    }
    _fillToppings() {
        let toppings = [];
        document.querySelectorAll('[name="topping"]:checked').forEach(function (item) {
            if (item) {
                toppings.push(new Param(item));
            }
        });
        return toppings;
    }
    getFullValue(value = 'price') {
        return this.toppings.reduce((sum, item) => sum += +item[value], +this.size[value] + +this.filling[value]);
    }
}
class Param {
    constructor(element) {
        this.name = element.dataset.name;
        this.price = element.dataset.price;
        this.calorie = element.dataset.calorie;
    }
}

const packBtn = document.querySelector('#pack');
const priceSpan = document.querySelector('#price');
const calorieSpan = document.querySelector('#calorie');
let burger = null;
packBtn.addEventListener('click', () => {
    burger = new Burger();
    priceSpan.textContent = burger.getFullValue('price');
    calorieSpan.textContent = burger.getFullValue('calorie');
});