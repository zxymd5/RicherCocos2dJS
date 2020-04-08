var StockCellCard = cc.Sprite.extend({

    labelInfo: null,
    layerColorBG: null,
    info: null,
    menu: null,
    ballMenuImage: null,
    callback: null,


    ctor: function(info, widht, height, cardSpriteX, cardSpriteY, colorTag) {
        this._super()
        this.cardInit(info, widht, height, cardSpriteX, cardSpriteY, colorTag)
    },
    cardInit: function(info, width, height, cardSpriteX, cardSpriteY, colorTag) {
        this.info = info
        if (colorTag > 0) {
            this.layerColorBG = new cc.LayerColor(cc.color(255,10,10,255), width - 5, height - 5)
        } else {
            this.layerColorBG = new cc.LayerColor(cc.color(100,120,90,255), width - 5, height - 5)
        }
        this.layerColorBG.setPosition(cc.p(cardSpriteX, cardSpriteY))
        if (info)
        {
            this.labelInfo = new cc.LabelTTF(info, "", 20);
            this.labelInfo.setColor(cc.color(200,200,200));
            this.labelInfo.setPosition(cc.p(this.layerColorBG.width/2,this.layerColorBG.height/2));
            this.layerColorBG.addChild(this.labelInfo);
        }
        this.addChild(this.layerColorBG)
    },
    setInfo: function(info)
    {
        this.info = info
        this.labelInfo.setString(info)
    }
})