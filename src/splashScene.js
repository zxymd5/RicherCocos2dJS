
var SplashLayer = cc.Layer.extend({
    rich1: null,
    rich2: null,
    man: null,
    woman: null,
    spriteSize: null,

    ctor:function () {

        this._super()

        var visibleSize = cc.winSize

        this.rich1 = new cc.Sprite(res.fu1_png)
        this.rich2 = new cc.Sprite(res.fu2_png)
        this.man = new cc.Sprite(res.weng_png)
        this.woman = new cc.Sprite(res.po_png)

        this.spriteSize = this.rich1.getContentSize()
        this.man.setPosition(cc.p(visibleSize.width / 2 - (2 * this.spriteSize.width),
            visibleSize.height / 2))
        this.rich2.setPosition(cc.p(visibleSize.width / 2 - this.spriteSize.width,
                visibleSize.height / 2))
        this.woman.setPosition(cc.p(visibleSize.width / 2, visibleSize.height / 2))
        this.rich1.setPosition(cc.p(visibleSize.width / 2 + this.spriteSize.width,
            visibleSize.height / 2))

        this.man.setAnchorPoint(0, 0.5)
        this.rich1.setAnchorPoint(0, 0.5)
        this.rich2.setAnchorPoint(0, 0.5)
        this.woman.setAnchorPoint(0, 0.5)

        this.addChild(this.man)
        this.addChild(this.woman)
        this.addChild(this.rich1)
        this.addChild(this.rich2)

        this.scheduleOnce(this.startMoveSprites, 1.0)

        return true
    },
    startMoveSprites: function() {

        var moveLeft = cc.moveBy(0.5, cc.p(-this.spriteSize.width, 0))
        this.rich1.runAction(moveLeft)

        var moveRight = cc.moveBy(0.5, cc.p(this.spriteSize.width, 0))
        this.woman.runAction(cc.sequence(moveRight, cc.callFunc(this.moveRich2, this)))
    },
    moveRich2: function() {
        var moveLeft = cc.moveBy(0.5, cc.p(-this.spriteSize.width, 0))
        this.rich1.runAction(moveLeft)

        var moveRight = cc.moveBy(0.5, cc.p(this.spriteSize.width, 0))
        this.rich2.runAction(cc.sequence(moveRight, cc.callFunc(this.moveMan, this)))
    },
    moveMan: function() {
        var moveLeft = cc.moveBy(0.5, cc.p(-this.spriteSize.width, 0))
        this.rich1.runAction(moveLeft)

        var moveRight = cc.moveBy(0.5, cc.p(this.spriteSize.width, 0))
        this.man.runAction(cc.sequence(moveRight, cc.callFunc(this.doFadeOut, this)))
    },
    doFadeOut: function() {
        var fadeOutAct = cc.fadeOut(1)
        this.man.runAction(fadeOutAct)
        this.rich2.runAction(fadeOutAct.clone())
        this.woman.runAction(fadeOutAct.clone())

        this.rich1.runAction(cc.sequence(fadeOutAct.clone(), cc.callFunc(this.gotoMenuScene)))
    },
    gotoMenuScene: function() {
        cc.director.pushScene(new MenuScene())
    }
});

var SplashScene = cc.Scene.extend({
    onEnter:function () {
        this._super()
        var layer = new SplashLayer()
        this.addChild(layer)
    }
});

