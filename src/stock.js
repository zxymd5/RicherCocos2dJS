var Stock = cc.Sprite.extend({
    stockCode: null,
    stockName: null,
    nowPrice: 0,
    makedealprice: 0,
    percent: 0,
    storeNumber: 0,
    stockMap: [],

    ctor: function(stockCode, stockName, nowPrice, makedealprice, percent, storeNumber) {
        this._super()
        this.stockCode = stockCode
        this.stockName = stockName
        this.nowPrice = nowPrice
        this.makedealprice = makedealprice
        this.percent = percent
        this.storeNumber = storeNumber
    },
})