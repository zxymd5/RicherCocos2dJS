var MenuLayer = cc.LayerColor.extend({

    ctor: function () {
        this._super(cc.color(255, 255, 255, 255))

        this.addBackgroundSprite()
        this.addMenuSprite()

    },
    addBackgroundSprite: function () {
        var menuLogo = new cc.Sprite(res.menu_logo_png)
        menuLogo.setPosition(cc.winSize.width / 2, cc.winSize.height)
        menuLogo.setAnchorPoint(cc.p(0.5, 1))
        menuLogo.setScale(0.6)
        this.addChild(menuLogo)

        var rainbow = new cc.Sprite(res.rainbow_png)
        rainbow.setPosition(5, cc.winSize.height - 20)
        rainbow.setAnchorPoint(cc.p(0, 1))
        rainbow.setScale(0.3)
        this.addChild(rainbow)

        var rainbowMove = cc.moveBy(1, cc.p(8, 0))
        var rainbowMoveReverse = rainbowMove.reverse()
        var rainbowAction = new cc.sequence(rainbowMove, rainbowMoveReverse)
        rainbow.runAction(rainbowAction.repeatForever())
    },
    addMenuSprite: function () {
        var lblSingleGame = new cc.LabelTTF(getText("single_game"), "Marker Felt", 20)
        var btnSingleGame = new cc.ControlButton(lblSingleGame, new cc.Scale9Sprite(res.normal_menu_png))
        btnSingleGame.setBackgroundSpriteForState(new cc.Scale9Sprite(res.press_menu_png), cc.CONTROL_STATE_HIGHLIGHTED)
        btnSingleGame.setPosition(cc.winSize.width / 2, cc.winSize.height - 180)
        btnSingleGame.setPreferredSize(cc.size(222, 50))
        btnSingleGame.addTargetWithActionForControlEvents(this, this.onMenuTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN)
        btnSingleGame.setTag(tagRes.BtnSingleGameTag)
        this.addChild(btnSingleGame)

        var lblMultiGame = new cc.LabelTTF(getText("multi_game"), "Marker Felt", 20)
        var btnMultiGame = new cc.ControlButton(lblMultiGame, new cc.Scale9Sprite(res.normal_menu_png))
        btnMultiGame.setBackgroundSpriteForState(new cc.Scale9Sprite(res.press_menu_png), cc.CONTROL_STATE_HIGHLIGHTED)
        btnMultiGame.setPosition(cc.winSize.width / 2, cc.winSize.height - 240)
        btnMultiGame.setPreferredSize(cc.size(222, 50))
        btnMultiGame.addTargetWithActionForControlEvents(this, this.onMenuTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN)
        btnMultiGame.setTag(tagRes.BtnMultiGameTag)
        this.addChild(btnMultiGame)

        var musicOn = cc.sys.localStorage.getItem("music_on")
        var lblMusic = new cc.LabelTTF(getText(musicOn !== "NO" ? "music_on" : "music_off"), "Marker Felt", 20)
        var btnMusic = new cc.ControlButton(lblMusic, new cc.Scale9Sprite(res.normal_menu_png))
        btnMusic.setBackgroundSpriteForState(new cc.Scale9Sprite(res.press_menu_png), cc.CONTROL_STATE_HIGHLIGHTED)
        btnMusic.setPosition(cc.winSize.width / 2, cc.winSize.height - 300)
        btnMusic.setPreferredSize(cc.size(222, 50))
        btnMusic.addTargetWithActionForControlEvents(this, this.onMenuTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN)
        btnMusic.setTag(tagRes.BtnMusicTag)
        this.addChild(btnMusic)

        var lblQuitGame = new cc.LabelTTF(getText("quit_game"), "Marker Felt", 20)
        var btnQuitGame = new cc.ControlButton(lblQuitGame, new cc.Scale9Sprite(res.normal_menu_png))
        btnQuitGame.setBackgroundSpriteForState(new cc.Scale9Sprite(res.press_menu_png), cc.CONTROL_STATE_HIGHLIGHTED)
        btnQuitGame.setPosition(cc.winSize.width / 2, cc.winSize.height - 420)
        btnQuitGame.setPreferredSize(cc.size(222, 50))
        btnQuitGame.addTargetWithActionForControlEvents(this, this.onMenuTouchDown, cc.CONTROL_EVENT_TOUCH_DOWN)
        btnQuitGame.setTag(tagRes.BtnQuitGameTag)
        this.addChild(btnQuitGame)
    },
    onMenuTouchDown: function (sender, controlEvent) {
        playEffect(soundRes.click_wav, false)
        switch (sender.getTag()) {
            case tagRes.BtnSingleGameTag: {
                cc.director.pushScene(new MapChooseScene())
                break;
            }
            case tagRes.BtnMultiGameTag: {
                var toast = new ToastLayer("You really wanna exit?", 10, cc.p(100, 100), cc.callFunc(this.testCallback, this))
                this.addChild(toast)
                break;
            }
            case tagRes.BtnMusicTag: {
                var musicOn = cc.sys.localStorage.getItem("music_on") || "NO"
                if(musicOn !== "YES") {
                    cc.sys.localStorage.setItem("music_on", "YES")
                    sender.setTitleForState(getText("music_on"), cc.CONTROL_STATE_NORMAL)
                } else {
                    cc.sys.localStorage.setItem("music_on", "NO")
                    sender.setTitleForState(getText("music_off"), cc.CONTROL_STATE_NORMAL)
                }
                break;
            }
            case tagRes.BtnQuitGameTag: {
                this.popupQuitDialog()
                break;
            }
            default:
                break;
        }
    },
    quitLayerCallback: function(node) {
        playEffect(soundRes.click_wav, false)
        if(node.getTag() === tagRes.BtnOkTag) {
            cc.director.runScene(new MenuScene())
        } else {
            node.getParent().getParent().removeFromParent()
        }
    },
    testCallback: function()
    {
        var k = 0
    },
    popupQuitDialog: function() {

        var popupDialog = new PopupLayer(cc.p(cc.winSize.width / 2 - 200, cc.winSize.height / 2 - 110), cc.size(400, 220))
        popupDialog.addBackground(res.dialogBg_png)

        popupDialog.addLabel(cc.p(200, 190), getText("dialog_title"), "Arial", 25, config.popupLayer.titleTag)
        popupDialog.addLabel(cc.p(200, 110), getText("dialog_content"), "Marker Felt", 20, config.popupLayer.contentTag)

        popupDialog.addButton(cc.p(-320, -200), res.popupBtnBg1_png, res.popupBtnBg2_png, getText("ok"), tagRes.BtnOkTag, this.quitLayerCallback)
        popupDialog.addButton(cc.p(-70, -200), res.popupBtnBg1_png, res.popupBtnBg2_png, getText("cancel"), tagRes.BtnCancelTag, this.quitLayerCallback)

        popupDialog.addButton2(cc.p(-200, -200), res.popupBtnBg1_png, res.popupBtnBg2_png, getText("cancel"), tagRes.BtnCancelTag)
        popupDialog.callbackFunc2 = cc.callFunc(this.callbackFunc2, this)
        this.addChild(popupDialog)
    },
    callbackFunc2: function(sender) {
        cc.log("sender.getTag: " + sender.getTag())
        var m = 5
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var layer = new MenuLayer()
        this.addChild(layer)
    }
});