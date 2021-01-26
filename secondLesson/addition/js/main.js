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
    constructor(size = 'big', filling = 'cheese') {
        this.size = new Size(size);
        this.filling = new Filling(filling);
    }
    /**
     * Метод добавляет приправу или майонез
     * @param {string} value может быть 'seasoning' или 'mayo'
     */
    addOptional(value = 'seasoning') {
        this.optional = new Optional(value);
    }
    /**
     * Метод возврвщает текущую цену или калорийность бургера
     * @param {string} value может быть 'price' или 'calorie'
     */
    getCurrentValue(value) {
        let sum = 0;
        for (let propertyName in this) {
            sum += this[propertyName][value];
        }
        return sum;
    }

}
class Size {
    constructor(value = 'big') {
        this.value = value;
        switch (value) {
            case 'big':
                this.price = 100;
                this.calorie = 40;
                break
            case 'small':
                this.price = 50;
                this.calorie = 20;
                break
        }
    }
}
class Filling {
    constructor(value = 'cheese') {
        this.value = value;
        switch (value) {
            case 'cheese':
                this.price = 10;
                this.calorie = 20;
                break
            case 'salat':
                this.price = 20;
                this.calorie = 5;
                break
            case 'potato':
                this.price = 15;
                this.calorie = 10;
                break
        }
    }
}
class Optional {
    constructor(value = 'seasoning') {
        this.value = value;
        switch (value) {
            case 'seasoning':
                this.price = 15;
                this.calorie = 0;
                break
            case 'mayo':
                this.price = 20;
                this.calorie = 5;
                break
        }
    }
}