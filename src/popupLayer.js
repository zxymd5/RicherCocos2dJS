var PopupLayer = cc.Layer.extend({

    dataTag: 0,
    callbackFunc2: null,
    cbListener: null,

    ctor: function (position, size) {
        this._super()
        this.attr({
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y
        })

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                return true;
            },
            onTouchMoved: function (touch, event) {
                // var target = event.getCurrentTarget();
                // var pos = touch.getDelta();
                // var newScale = cc.clampf(target._spp.getScale() + pos.x * 0.01, 0.1, 2);
                // target._spp.setScale(newScale);
                // target._sp.setScale(newScale);
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });
        cc.eventManager.addListener(touchListener, this);

    },
    addBackground: function(backgroundImg) {
        var background = new cc.Sprite(backgroundImg)
        background.setScale(this.width / background.width, this.height / background.height)
        background.setPosition(this.width / 2, this.height / 2)
        this.addChild(background)
    },
    addLabel: function(position, content, fontName, fontSize, tag) {
        var label = new cc.LabelTTF(content, fontName, fontSize)
        label.setFontFillColor(cc.color.BLACK)
        label.setPosition(position);
        label.setTag(tag)
        this.addChild(label)
    },
    setLabelContentText(text, tag) {
      this.getChildByTag(tag).setString(text)
    },
    addButton: function (position, normalImg, pressImg, text, tag, callbackFunc) {
        var item = new cc.MenuItemImage(normalImg, pressImg, callbackFunc, this);
        item.setTag(tag)
        item.setPosition(position)
        var size = item.getContentSize()
        var label = new cc.LabelTTF(text, "Arial", 20)
        label.setColor(cc.color.BLACK)
        label.setPosition(cc.p(size.width / 2, size.height / 2))
        item.addChild(label)

        var menu = new cc.Menu(item)
        this.addChild(menu)
    },

    addButton2: function (position, normalImg, pressImg, text, tag) {
        var item = new cc.MenuItemImage(normalImg, pressImg, this.onButton2, this);
        item.setTag(tag)
        item.setPosition(position)
        var size = item.getContentSize()
        var label = new cc.LabelTTF(text, "Arial", 20)
        label.setColor(cc.color.BLACK)
        label.setPosition(cc.p(size.width / 2, size.height / 2))
        item.addChild(label)

        var menu = new cc.Menu(item)
        this.addChild(menu)
    },
    onButton2: function (sender) {
        if (this.callbackFunc2) {
            this.callbackFunc2._function(sender)
        }
    }
})