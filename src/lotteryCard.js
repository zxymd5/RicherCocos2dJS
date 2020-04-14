var LotteryCard = cc.Sprite.extend({

    lotteryNumber: 0,
    layerColorBG: null,
    ballMenuImage: null,
    labelLotteryNumber: null,
    callback: null,


    ctor: function()
    {
        this._super()
    },

    cardInit: function(numbers, width, height, cardSpriteX, cardSpriteY)
    {
        this.lotteryNumber = numbers
        this.layerColorBG = new cc.LayerColor(cc.color(100,100,100,255), width - 5, height - 5)
        this.layerColorBG.setPosition(cc.p(cardSpriteX, cardSpriteY))
        if (this.lotteryNumber > 0) {
            this.ballMenuImage = new cc.MenuItemImage(res.ltDefaultBall_png, res.ltBullBall_png, this.ballButtonCallback, this)
            this.ballMenuImage.setTag(this.lotteryNumber)
            this.ballMenuImage.setPosition(cc.p(this.layerColorBG.width/2, this.layerColorBG.height/2));

            this.labelLotteryNumber = new cc.LabelTTF(String(this.lotteryNumber),"HiraKakuProN-W6",25);
            this.labelLotteryNumber.setColor(cc.color(200,200,200));
            this.labelLotteryNumber.setPosition(cc.p(this.layerColorBG.width/2, this.layerColorBG.height/2));
            this.ballMenuImage.addChild(this.labelLotteryNumber)

            var menu = new cc.Menu(this.ballMenuImage)
            menu.setPosition(cc.p(0, 0))
            this.layerColorBG.addChild(menu)
            this.setTag(this.lotteryNumber)
        }
        this.addChild(this.layerColorBG)
    },
    ballButtonCallback: function (sender) {
        playEffect(soundRes.lottery_wav, false)
        this.ballMenuImage.selected()
        if (this.callback) {
            this.callback._function(sender)
        }
    },
    setLotteryNumber: function (num) {
        this.lotteryNumber = num
        if (this.lotteryNumber > 0) {
            this.labelLotteryNumber.setString(String(this.lotteryNumber))
        }
    },
    setUnseleted: function () {
        this.ballMenuImage.unselected()
    }

})