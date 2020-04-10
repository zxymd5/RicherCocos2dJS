var MapChooseLayer = cc.Layer.extend({
    ctor: function () {
        this._super()

        var background = new cc.Sprite(res.mapStateBackground2_png)
        background.setAnchorPoint(0, 0)
        this.addChild(background)

        var scrollView = new ccui.ScrollView()
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
        scrollView.setTouchEnabled(true)
        scrollView.setBounceEnabled(true)
        scrollView.setContentSize(cc.size(cc.winSize.width, cc.winSize.height))
        this.addChild(scrollView)

        var centerPoint = cc.p(cc.winSize.width / 2, cc.winSize.height / 2)

        scrollView.setInnerContainerSize(cc.size(config.mapCount * cc.winSize.width, cc.winSize.height))
        var beachView = new ccui.ImageView()
        beachView.loadTexture(res.mapBeachItem_png)
        beachView.setPosition(centerPoint)
        beachView.setTouchEnabled(true)
        beachView.setTag(tagRes.BeachMapTag)
        beachView.addClickEventListener(this.onChooseMap)
        scrollView.addChild(beachView)

        var seaView = new ccui.ImageView()
        seaView.loadTexture(res.mapSeaItem_png)
        seaView.setPosition(centerPoint.x + cc.winSize.width, centerPoint.y)
        seaView.setTouchEnabled(true)
        seaView.setTag(tagRes.SeaMapTag)
        seaView.addClickEventListener(this.onChooseMap)
        scrollView.addChild(seaView)

        var snowView = new ccui.ImageView()
        snowView.loadTexture(res.mapSnowItem_png)
        snowView.setPosition(centerPoint.x + cc.winSize.width * 2, centerPoint.y)
        snowView.setTouchEnabled(true)
        snowView.setTag(tagRes.SnowMapTag)
        snowView.addClickEventListener(this.onChooseMap)
        scrollView.addChild(snowView)

        var item = new cc.MenuItemImage(res.backNormal_png, res.backPressed_png, this.onGoback, this);
        item.setPosition(cc.p(cc.winSize.width / 2 - item.width / 2, item.height / 2 - cc.winSize.height / 2))
        var menu = new cc.Menu(item)
        this.addChild(menu)

    },
    onChooseMap: function (sender) {
        switch (sender.getTag()) {
            case tagRes.SeaMapTag: {
                var scene = new cc.TransitionFadeBL(1.5, new SeaScene())
                cc.director.pushScene(scene)
            }
                break;
            case tagRes.BeachMapTag: {
                var scene = new cc.TransitionFadeBL(1.5, new BeachScene())
                cc.director.pushScene(scene)
            }
                break;
            case tagRes.SnowMapTag: {
                var scene = new cc.TransitionFadeBL(1.5, new SnowScene())
                cc.director.pushScene(scene)
            }
                break;
            default:
                break;
        }
    },
    onGoback: function (sender) {
        cc.director.popScene()
    }
})

var MapChooseScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var layer = new MapChooseLayer()
        this.addChild(layer)
    }
});