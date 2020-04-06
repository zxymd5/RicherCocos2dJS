var ItemStrengthUp = Item.extend({

    normalAnim: null,
    arrItemAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_STRENGTH_UP

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("strength_up_01.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.strength_up_plist, res.strength_up_png)

        for (var i = 1; i <= 14; i++) {
            if(i < 10) {
                this.name = "crab_0" + i + ".png"
            } else {
                this.name = "crab_" + i + ".png"
            }
            this.arrItemAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("strength_up_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrItemAnim, 0.1), "strength_up_animation");
        }

        this.normalAnim = cc.animate(cc.animationCache.getAnimation("strength_up_animation"))
    }

})