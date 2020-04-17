var ToastLayer = cc.LayerColor.extend({
    callbackFunc: null,

    ctor: function(msg, time, point, callbackFunc) {
        this._super()
        this.setColor(cc.color(100, 100, 100, 255))
        this.setOpacity(0)
        this.callbackFunc = callbackFunc

        var label = new cc.LabelTTF(msg, "Arial", 20)
        label.setColor(cc.color.WHITE)
        label.ignoreAnchorPointForPosition(false)
        label.setAnchorPoint(cc.p(0, -0.4))

        var size = label.getContentSize()
        size.width += 15
        size.height += 20
        this.setContentSize(size)
        this.setPosition(point)
        this.addChild(label)
        this.retain()

        var seq1 = cc.sequence(cc.fadeIn(time / 5), cc.delayTime(time / 5 * 1.5), cc.fadeOut(time / 5 * 2.5), cc.callFunc(this.removeToast, this))
        var move = cc.moveBy(time / 5, cc.p(0, 50))
        var move2 = cc.moveBy(time / 3, cc.p(0, - 50))
        var seq2 = cc.sequence(move.clone().easing(cc.easeSineIn()), cc.delayTime(time / 5 * 2), move2.clone().easing(cc.easeSineOut()))
        var spawn = cc.spawn(seq1, seq2)
        var action = cc.repeat(spawn, 1)
        this.runAction(action)
    },
    removeToast: function() {
        this.removeFromParent(true)
        if(this.callbackFunc) {
            this.callbackFunc._function()
        }
    }
})