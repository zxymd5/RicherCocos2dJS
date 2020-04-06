var ItemBall = Item.extend({

    normalAnim: null,
    arrItemAnim: [],
    name: null,

    ctor: function() {
        this._super()
        this.itemType = config.itemType.ITEM_BALL

        this.addItemSpriteFrameCache()
        var spf = cc.spriteFrameCache.getSpriteFrame("ball_01.png")
        this.initWithSpriteFrame(spf)

        this.setItemAnimate()

    },
    addItemSpriteFrameCache: function () {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.ball_plist, res.ball_png)

        for (var i = 1; i <= 3; i++) {
            this.name = "ball_0" + i + ".png"
            this.arrItemAnim.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setItemAnimate: function() {
        if(!cc.animationCache.getAnimation("ball_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrItemAnim, 0.4), "ball_animation");
        }

        this.normalAnim = cc.animate(cc.animationCache.getAnimation("ball_animation"))
    }

})