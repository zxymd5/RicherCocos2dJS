var ItemEmergency = Item.extend({

    carGoAnim: null,
    carStopAnim: null,
    arrCarGoAnim: [],
    arrCarStopAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_EMERGENCY

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("car_01.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.car_plist, res.car_png)

        for (var i = 1; i <= 2; i++) {
            this.name = "car_0" + i + ".png"
            this.arrCarGoAnim.push(spriteFrameCache.getSpriteFrame(name))
        }

        for (var i = 3; i <= 4; i++) {
            this.name = "car_0" + i + ".png"
            this.arrCarStopAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("car_go_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrCarGoAnim, 0.1), "car_go_animation");
        }
        this.carGoAnim = cc.animate(cc.animationCache.getAnimation("car_go_animation"))

        if(!cc.animationCache.getAnimation("car_stop_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrCarStopAnim, 0.5), "car_stop_animation");
        }
        this.carStopAnim = cc.animate(cc.animationCache.getAnimation("car_stop_animation"))
    }

})