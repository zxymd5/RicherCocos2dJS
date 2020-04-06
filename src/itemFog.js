var ItemFog = Item.extend({

    normalAnim: null,
    arrItemAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_FOG

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("fog_01.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.fog_plist, res.fog_png)

        for (var i = 1; i <= 7; i++) {
            this.name = "fog_0" + i + ".png"
            this.arrItemAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("fog_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrItemAnim, 0.2), "fog_animation");
        }

        this.normalAnim = cc.animate(cc.animationCache.getAnimation("fog_animation"))
    }

})