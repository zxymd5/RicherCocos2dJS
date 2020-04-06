var ItemStretcher = Item.extend({

    stretcherEmptyAnim: null,
    stretcherFullAnim: null,
    arrStretcherEmptyAnim: [],
    arrStretcherFullAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_STRETCHER

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("stretcher01_empty.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.stretcher_empty_plist, res.stretcher_empty_png)
        spriteFrameCache.addSpriteFrames(res.stretcher_plist, res.stretcher_png)

        for (var i = 1; i <= 8; i++) {
            this.name = "stretcher0" + i + "_empty.png"
            this.arrStretcherEmptyAnim.push(spriteFrameCache.getSpriteFrame(name))
        }

        for (var i = 1; i <= 8; i++) {
            this.name = "stretcher0" + i + ".png"
            this.arrStretcherFullAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("stretcher_empty_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrStretcherEmptyAnim, 0.1), "stretcher_empty_animation");
        }
        this.stretcherEmptyAnim = cc.animate(cc.animationCache.getAnimation("stretcher_empty_animation"))

        if(!cc.animationCache.getAnimation("stretcher_full_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrStretcherFullAnim, 0.1), "stretcher_full_animation");
        }
        this.stretcherFullAnim = cc.animate(cc.animationCache.getAnimation("stretcher_full_animation"))
    }

})