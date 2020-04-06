var ItemCrab = Item.extend({

    normalAnim: null,
    arrItemAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_CRAB

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("crab_01.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.crab_plist, res.crab_png)

        for (var i = 1; i <= 4; i++) {
            this.name = "crab_0" + i + ".png"
            this.arrItemAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("normal_crab_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrItemAnim, 0.5), "normal_crab_animation");
        }

        this.normalAnim = cc.animate(cc.animationCache.getAnimation("normal_crab_animation"))
    }

})