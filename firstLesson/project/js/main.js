const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
// Функция для формирования верстки каждого товара
// Добавил разметку псевдо-рандомной тематической картинки
const renderProduct = (item = products[parseInt(Math.random() * products.length)]) => {
    let randomNum = new Date().getTime();
    console.log(randomNum);
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <p>${item.pric}</p>
                <img class="product-img" src='https://loremflickr.com/320/240/${item.title.toLocaleLowerCase()}?random=${randomNum}' alt='${item.title.toLocaleLowerCase()}'>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    // запятые появляются так как метод map трансформирует массив products, по правилу,
    // указанному в renderProduct(...), тем самым возврящая МАССИВ,
    // элементы которого (в данном случае - строки разметки продуктов) разделяются запятой, как в любом массиве;
    console.log(productsList);
    // document.querySelector('.products').innerHTML = productsList;

    // полученный массив (элементы-строки и запятые - разделители элементов) вставляется в .products в качестве текста разметки;
    // пусть функция getGluedArr(list) выполняет распаковку массива и конкатенацию его элементов-строк в одну строку;
    const textHTML = getGluedArr(productsList);
    document.querySelector('.products').innerHTML = textHTML;
};
const getGluedArr = list => {
    let resultString = '';
    list.forEach(item => resultString += item);
    return resultString;
};

renderPage(products);