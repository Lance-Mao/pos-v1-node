function getShoppingList(cart) {
    let list = '***<没钱赚商店>购物清单***';
    let list_offer = '----------------------' + '\n' + '挥泪赠送商品：';
    let sum = 0;
    let save = 0;
    cart.forEach(item => {
        let subtotal = (item.num - item.offer) * item.price;
        list += '\n' + '名称：' + item.name + '，数量：' + item.num + item.unit + '，单价：' + item.price.toFixed(2) + '(元)，小计：' + subtotal.toFixed(2) + '(元)';
        sum += subtotal;
        if (item.offer > 0) {
            list_offer += '\n' + '名称：' + item.name + '，数量：' + item.offer + item.unit;
            save += item.offer * item.price;
        }

    });
    list = list + '\n' + list_offer + '\n' + '----------------------' + '\n' + '总计：' + sum.toFixed(2) + '(元)' + '\n' + '节省：' + save.toFixed(2) + '(元)' + '\n' + '**********************';
    console.log(list);
}

function getCartList(barcodes, allItems) {
    let sureNum = allItems.filter(item => barcodes[item.barcode] ? item.num = Number(barcodes[item.barcode]) : "");
    sureNum.filter(item => item.offer = Math.floor(barcodes[item.barcode] / 3));

    return getShoppingList(sureNum);
}

function getBarcodeList(inputs, allItems) {
    var barcodes = {};
    inputs.map(input => {
        if (barcodes[input]) {
            barcodes[input]++;
        } else if (input.indexOf('-') !== -1) {
            barcodes[input.split("-")[0]] = Number(input.split("-")[1]);
        } else {
            barcodes[input] = 1;
        }
    });

    return getCartList(barcodes, allItems);
}

module.exports = function printInventory(inputs, allItems) {
    return getBarcodeList(inputs, allItems);
};
