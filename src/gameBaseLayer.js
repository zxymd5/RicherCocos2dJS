var GameBaseLayer = cc.Layer.extend({

    btnGo: null,
    btnSkill: null,

    map_level: null,
    saveJsonName: null,

    arrStockPoint1: [],
    arrStockPoint2: [],
    arrStockPoint3: [],
    arrStockPoint4: [],
    arrStockPoint5: [],
    arrStock: [],

    arrWayLayerPassPoint: [],

    player1_money_label: null,
    player1_strength_label: null,
    player2_money_label: null,
    player2_strength_label: null,

    itemCrab: null,
    itemBall: null,
    itemStrengthUp: null,
    itemEmergency: null,
    itemStretcher: null,
    itemFog: null,

    player1: null,
    player2: null,

    arrBgMusic: [],
    arrPlayer2Effect1: [],
    arrPlayer2Effect2: [],
    arrPlayer2Effect3: [],
    arrPlayer2Effect4: [],
    arrPlayer2Effect5: [],
    arrPlayer2Effect6: [],

    arrPlayer2Effect7: [],
    arrPlayer2Effect8: [],
    arrPlayer2Effect9: [],
    arrPlayer2Effect10: [],
    arrPlayer2Effect11: [],
    arrPlayer2Effect12: [],
    arrPlayer2Effect13: [],

    arrPlayer1Effect1: [],
    arrPlayer1Effect2: [],
    arrPlayer1Effect3: [],
    arrPlayer1Effect4: [],
    arrPlayer1Effect5: [],
    arrPlayer1Effect6: [],

    arrPlayer1Effect7: [],
    arrPlayer1Effect8: [],
    arrPlayer1Effect9: [],
    arrPlayer1Effect10: [],
    arrPlayer1Effect11: [],
    arrPlayer1Effect12: [],
    arrPlayer1Effect13: [],

    arrNextPlayerEffect: [],

    arrDigiteRound: [],
    arrRefreshRound: [],
    gameRoundCount: 0,

    buyLandX: 0,
    buyLandY: 0,
    transferLandTag: 0,

    circleSprite: null,

    scaleby1ForBuyLand: null,
    scaleby2ForBuyLand: null,
    foot1Sprite: null,
    foot2Sprite: null,
    starFish1Sprite: null,
    starFish2Sprite: null,
    heart1Sprite: null,
    heart2Sprite: null,
    landFadeOut: null,
    landFadeIn: null,
    arrDisplay: [],
    popDialogLottery: null,
    arrRandomAskEvent: [],

    ctor: function () {
        this._super()
    },

    initGameController: function() {
        var gameController = RicherGameController.getInstance()
        this.addChild(gameController)
    },

    initLayer: function () {
        GameBaseLayer.wayLayer = GameBaseLayer.map.getLayer("way")
        GameBaseLayer.landLayer = GameBaseLayer.map.getLayer("land")
    },

    initTiledGrid: function () {
        GameBaseLayer.tiledColsCount = 22
        GameBaseLayer.tiledRowsCount = 22
        GameBaseLayer.arrCanPassGrid = new Array(22)
        for (var i = 0; i < GameBaseLayer.tiledRowsCount; i++) {
            GameBaseLayer.arrCanPassGrid[i] = new Array(22)
        }

        for (var i = 0; i < GameBaseLayer.tiledRowsCount; i++) {
            for (var j = 0; j < GameBaseLayer.tiledColsCount; j++) {
                GameBaseLayer.arrCanPassGrid[i][j] = false
            }
        }
    },
    initRandomAskEvent: function() {
        var arrEvent = ["tax_rebates", "pay_taxes", "loss_strength", "physical_recovery", "investment_dividends",
            "investment_loss", "storm_skill_up", "step_skill_up", "transfer_skill_up"]
        for (var i = 0; i< arrEvent.length; i++) {
            this.arrRandomAskEvent.push(getText(arrEvent[i]))
        }
    },
    addDigiteRoundSprite: function() {
        this.gameRoundCount = 0
        cc.spriteFrameCache.addSpriteFrames(res.digital_round_plist, res.digital_round_png)
        for (var i = 0; i < 10; i++) {
            var name = "digital_" + i + ".png"
            this.arrDigiteRound.push(cc.spriteFrameCache.getSpriteFrame(name))
        }
    },
    calWayPassToGrid: function () {
        var mapSize = GameBaseLayer.wayLayer.getLayerSize()
        for (var j = 0; j < mapSize.width; j++) {
            for (var i = 0; i < mapSize.height; i++) {
                var sprite = GameBaseLayer.wayLayer.getTileAt(cc.p(j, i))
                if (sprite) {
                    var x = sprite.getPositionX()
                    var y = sprite.getPositionY()
                    var col = x / GameBaseLayer.tiledWidth
                    var row = y / GameBaseLayer.tiledHeight
                    GameBaseLayer.arrCanPassGrid[row][col] = true
                    this.arrWayLayerPassPoint.push(sprite.getPosition())
                }
            }
        }
    },
    addRightBanner: function () {
        var rightBanner = new cc.Sprite(res.rightBanner_png)
        rightBanner.setAnchorPoint(cc.p(0, 0))
        rightBanner.setPosition(cc.p(GameBaseLayer.tableStartPositionX - 10, 0))
        this.addChild(rightBanner)
    },
    drawTable: function (tableCount) {
        var draw = new cc.DrawNode()
        this.addChild(draw)
        for (var i = 0; i < tableCount; i++) {
            draw.drawSegment(cc.p(GameBaseLayer.tableStartPositionX,
                GameBaseLayer.tableStartPositionY - 2 * i * GameBaseLayer.tableHeight),
                cc.p(GameBaseLayer.tableStartPositionX + 3 * GameBaseLayer.tableWidth,
                    GameBaseLayer.tableStartPositionY - 2 * i * GameBaseLayer.tableHeight),
                1, cc.color(0, 255, 0, 255))

            draw.drawSegment(cc.p(GameBaseLayer.tableStartPositionX,
                GameBaseLayer.tableStartPositionY - 2 * (i + 1) * GameBaseLayer.tableHeight),
                cc.p(GameBaseLayer.tableStartPositionX + 3 * GameBaseLayer.tableWidth,
                    GameBaseLayer.tableStartPositionY - 2 * (i + 1) * GameBaseLayer.tableHeight),
                1, cc.color(0, 255, 0, 255))

            draw.drawSegment(cc.p(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
                GameBaseLayer.tableStartPositionY - (2 * i + 1) * GameBaseLayer.tableHeight),
                cc.p(GameBaseLayer.tableStartPositionX + 3 * GameBaseLayer.tableWidth,
                    GameBaseLayer.tableStartPositionY - (2 * i + 1) * GameBaseLayer.tableHeight),
                1, cc.color(0, 255, 0, 255))

            draw.drawSegment(cc.p(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
                GameBaseLayer.tableStartPositionY - 2 * i * GameBaseLayer.tableHeight),
                cc.p(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
                    GameBaseLayer.tableStartPositionY - 2 * (i + 1) * GameBaseLayer.tableHeight),
                1, cc.color(0, 255, 0, 255))
        }
    },
    addPathMark: function () {
        var mark1 = new cc.Sprite(res.pathMark1_png)
        mark1.setAnchorPoint(0, 0)
        mark1.setVisible(false)
        this.addChild(mark1)
        GameBaseLayer.arrPathMark.push(mark1)

        var mark2 = new cc.Sprite(res.pathMark2_png)
        mark2.setAnchorPoint(0, 0)
        mark2.setVisible(false)
        this.addChild(mark2)
        GameBaseLayer.arrPathMark.push(mark2)

        var mark3 = new cc.Sprite(res.pathMark3_png)
        mark3.setAnchorPoint(0, 0)
        mark3.setVisible(false)
        this.addChild(mark3)
        GameBaseLayer.arrPathMark.push(mark3)

        var mark4 = new cc.Sprite(res.pathMark4_png)
        mark4.setAnchorPoint(0, 0)
        mark4.setVisible(false)
        this.addChild(mark4)
        GameBaseLayer.arrPathMark.push(mark4)

        var mark5 = new cc.Sprite(res.pathMark5_png)
        mark5.setAnchorPoint(0, 0)
        mark5.setVisible(false)
        this.addChild(mark5)
        GameBaseLayer.arrPathMark.push(mark5)

        var mark6 = new cc.Sprite(res.pathMark6_png)
        mark6.setAnchorPoint(0, 0)
        mark6.setVisible(false)
        this.addChild(mark6)
        GameBaseLayer.arrPathMark.push(mark6)
    },
    // todo
    addPlayer: function () {
        this.addPlayerInfo()

        this.player1 = new RicherPlayer(config.PLAYER_1_NAME, config.PLAYER_1_TAG, false, 200000, 100)
        var rand1 = ((Math.random() * this.arrWayLayerPassPoint.length) | 0)
        var startForPlayer1 = this.arrWayLayerPassPoint[rand1]
        startForPlayer1.y += GameBaseLayer.tiledHeight
        this.player1.setPosition(startForPlayer1)
        this.player1.setAnchorPoint(0, 0.5)

        var strText = "$ " + this.player1.money
        this.player1_money_label.setString(strText)

        strText = "+ " + this.player1.strength
        this.player1_strength_label.setString(strText)
        this.addChild(this.player1)
        GameBaseLayer.arrPlayers.push(this.player1)

        this.player2 = new RicherPlayer(config.PLAYER_2_NAME, config.PLAYER_2_TAG, false, 200000, 200)
        var rand2 = ((Math.random() * this.arrWayLayerPassPoint.length) | 0)
        var startForPlayer2 = this.arrWayLayerPassPoint[rand2]
        startForPlayer2.y += GameBaseLayer.tiledHeight
        this.player2.setPosition(startForPlayer2)
        this.player2.setAnchorPoint(0, 0.5)

        strText = "$ " + this.player2.money
        this.player2_money_label.setString(strText)

        strText = "+ " + this.player2.strength
        this.player2_strength_label.setString(strText)
        this.addChild(this.player2)
        GameBaseLayer.arrPlayers.push(this.player2)

    },
    // todo
    addGoButton: function () {
        var menu = new cc.Menu()
        menu.setPosition(cc.p(0, 0))
        this.addChild(menu)

        this.btnGo = new cc.MenuItemImage(res.goNormal_png, res.goPressed_png, this.goButtonCallback, this)
        this.btnGo.setPosition(GameBaseLayer.tableStartPositionX + 2 * GameBaseLayer.tableWidth, GameBaseLayer.tableStartPositionY - 6 * GameBaseLayer.tableHeight)
        this.btnGo.setTag(GameBaseLayer.goButtonTag)
        menu.addChild(this.btnGo)

        this.btnSkill = new cc.MenuItemImage(res.skillBtnNormal_png, res.skillBtnPressed_png, this.goButtonCallback, this)
        this.btnSkill.setPosition(GameBaseLayer.tableStartPositionX + 2 * GameBaseLayer.tableWidth + 20,
            GameBaseLayer.tableStartPositionY - 6 * GameBaseLayer.tableHeight - 80)
        this.btnSkill.setTag(GameBaseLayer.skillButtonTag)
        menu.addChild(this.btnSkill)

        var btnSave = new cc.MenuItemImage(res.saveNormal_png, res.savePressed_png, this.goButtonCallback, this)
        btnSave.setPosition(cc.winSize.width, 0)
        btnSave.setAnchorPoint(1, 0)
        btnSave.setTag(GameBaseLayer.saveButtonTag)
        menu.addChild(btnSave)

        var btnBack = new cc.MenuItemImage(res.backNormal_png, res.backPressed_png, this.backButtonCallback, this)
        btnBack.setPosition(20, cc.winSize.height - 2 * btnBack.height)
        btnBack.setAnchorPoint(0, 0)
        btnBack.setScale(0.8)
        menu.addChild(btnBack)

        var btnAudio = new cc.MenuItemImage(res.audioOn_png, res.audioOff_png, this.goButtonCallback, this)
        btnAudio.setPosition(cc.p(20,
            cc.winSize.height - 2 * btnBack.height - 1.5 * btnAudio.height))
        btnAudio.setAnchorPoint(0, 0)
        btnAudio.setTag(GameBaseLayer.audioButtonTag)
        btnAudio.setScale(0.8)
        var musicOn = cc.sys.localStorage.getItem("music_on") || "NO"
        if (musicOn === "YES") {
            btnAudio.unselected()
        } else {
            btnAudio.selected()
        }
        menu.addChild(btnAudio)

        var btnStep1 = new cc.MenuItemImage(res.step1Normal_png, res.step1Pressed_png, this.goButtonCallback, this)
        btnStep1.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep1.setAnchorPoint(0.5, 0)
        btnStep1.setVisible(false)
        btnStep1.setTag(GameBaseLayer.step1_tag)
        menu.addChild(btnStep1)

        var btnStep2 = new cc.MenuItemImage(res.step2Normal_png, res.step2Pressed_png, this.goButtonCallback, this)
        btnStep2.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep2.setAnchorPoint(0.5, 0)
        btnStep2.setVisible(false)
        btnStep2.setTag(GameBaseLayer.step2_tag)
        menu.addChild(btnStep2)

        var btnStep3 = new cc.MenuItemImage(res.step3Normal_png, res.step3Pressed_png, this.goButtonCallback, this)
        btnStep3.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep3.setAnchorPoint(0.5, 0)
        btnStep3.setVisible(false)
        btnStep3.setTag(GameBaseLayer.step3_tag)
        menu.addChild(btnStep3)

        var btnStep4 = new cc.MenuItemImage(res.step4Normal_png, res.step4Pressed_png, this.goButtonCallback, this)
        btnStep4.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep4.setAnchorPoint(0.5, 0)
        btnStep4.setVisible(false)
        btnStep4.setTag(GameBaseLayer.step4_tag)
        menu.addChild(btnStep4)

        var btnStep5 = new cc.MenuItemImage(res.step5Normal_png, res.step5Pressed_png, this.goButtonCallback, this)
        btnStep5.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep5.setAnchorPoint(0.5, 0)
        btnStep5.setVisible(false)
        btnStep5.setTag(GameBaseLayer.step5_tag)
        menu.addChild(btnStep5)

        var btnStep6 = new cc.MenuItemImage(res.step6Normal_png, res.step6Pressed_png, this.goButtonCallback, this)
        btnStep6.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        btnStep6.setAnchorPoint(0.5, 0)
        btnStep6.setVisible(false)
        btnStep6.setTag(GameBaseLayer.step6_tag)
        menu.addChild(btnStep6)
    },
    // todo
    goButtonCallback: function (sender) {
        playEffect(soundRes.click_01_wav, false)
        var tag = sender.getTag()
        if (tag === GameBaseLayer.goButtonTag) {
            var randNumber = ((Math.random() * 6) | 0) + 1
            RouteNavigation.getPath(this.player1, randNumber, GameBaseLayer.arrCanPassGrid, GameBaseLayer.tiledRowsCount, GameBaseLayer.tiledColsCount)
            var arrCol = RouteNavigation.arrPathCols
            var arrRow = RouteNavigation.arrPathRows

            cc.log("arrRow: %o, arrCol: %o", arrRow, arrCol)

            var event = new cc.EventCustom(config.eventCustom.MSG_GO)
            event.setUserData(String(config.eventTag.MSG_GO_HIDE_TAG))
            cc.eventManager.dispatchEvent(event)
            this.player1.startGo(arrRow, arrCol)
        }


    },
    // todo
    backButtonCallback: function () {
        var event = new cc.EventCustom(config.eventCustom.MSG_GO)
        event.setUserData("test msg go")
        cc.eventManager.dispatchEvent(event)
    },
    addPlayerInfo: function () {
        var player1Logo = new cc.Sprite(res.player1_png)
        player1Logo.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth / 2,
            GameBaseLayer.tableStartPositionY - GameBaseLayer.tableHeight)
        this.addChild(player1Logo)

        this.player1_money_label = new cc.LabelTTF()
        this.player1_money_label.setString("$");
        this.player1_money_label.setAnchorPoint(cc.p(0, 0.5));
        this.player1_money_label.setFontSize(20);
        this.player1_money_label.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
            GameBaseLayer.tableStartPositionY - GameBaseLayer.tableHeight / 2);
        this.addChild(this.player1_money_label);

        this.player1_strength_label = new cc.LabelTTF()
        this.player1_strength_label.setString("+")
        this.player1_strength_label.setAnchorPoint(cc.p(0, 0.5))
        this.player1_strength_label.setFontSize(20);
        this.player1_strength_label.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
            GameBaseLayer.tableStartPositionY - GameBaseLayer.tableHeight / 2 * 3);
        this.addChild(this.player1_strength_label);

        var player2Logo = new cc.Sprite(res.player2_png)
        player2Logo.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth / 2,
            GameBaseLayer.tableStartPositionY - 3 * GameBaseLayer.tableHeight)
        this.addChild(player2Logo)

        this.player2_money_label = new cc.LabelTTF()
        this.player2_money_label.setString("$");
        this.player2_money_label.setAnchorPoint(cc.p(0, 0.5));
        this.player2_money_label.setFontSize(20);
        this.player2_money_label.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
            GameBaseLayer.tableStartPositionY - GameBaseLayer.tableHeight / 2 * 5);
        this.addChild(this.player2_money_label);

        this.player2_strength_label = new cc.LabelTTF()
        this.player2_strength_label.setString("+")
        this.player2_strength_label.setAnchorPoint(cc.p(0, 0.5))
        this.player2_strength_label.setFontSize(20);
        this.player2_strength_label.setPosition(GameBaseLayer.tableStartPositionX + GameBaseLayer.tableWidth,
            GameBaseLayer.tableStartPositionY - GameBaseLayer.tableHeight / 2 * 7);
        this.addChild(this.player2_strength_label);

    },
    registerEvent: function () {

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_GO,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_BUY,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_PAY_TOLLS,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_RANDOM_ASK_EVENT,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_BLOCK_WAY_EVENT,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_ROUND_COUNT,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_REST,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_STRENGTH_UP,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_LOTTERY,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_STOCK,
                callback: this.receivedNotificationOMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_GAME_OVER,
                callback: this.receivedNotificationOMsg
            }), this)

    },
    createPopupDialog: function() {
        var popDialog = new PopupLayer(cc.p(cc.winSize.width / 2 - 200, cc.winSize.height / 2 - 110), cc.size(400, 220))
        popDialog.addBackground(res.dialogBg_png)

        popDialog.addLabel(cc.p(200, 190), getText("dialog_title"), "Arial", 25, config.popupLayer.titleTag)
        popDialog.addLabel(cc.p(200, 110), getText("dialog_content"), "Marker Felt", 20, config.popupLayer.contentTag)

        popDialog.addButton(cc.p(-320, -200), res.popupBtnBg1_png, res.popupBtnBg2_png, getText("ok"), tagRes.BtnOkTag, this.buyLandCallback)
        popDialog.addButton(cc.p(-70, -200), res.popupBtnBg1_png, res.popupBtnBg2_png, getText("cancel"), tagRes.BtnCancelTag, this.buyLandCallback)

        popDialog.setVisible(false)
        this.addChild(popDialog)
        return popDialog
    },
    doSomeForParticle: function() {
        this.landFadeOut = cc.fadeOut(0.1)
        this.landFadeIn = cc.fadeIn(0.1)

        this.scaleby1ForBuyLand = cc.scaleBy(0.1, 1.5);
        this.scaleby2ForBuyLand = cc.scaleBy(0.5, 0.7);

        this.foot1Sprite = new cc.Sprite(res.player1Particle1_png);
        this.addChild(this.foot1Sprite);
        this.foot1Sprite.setAnchorPoint(cc.p(0,0));

        this.foot2Sprite = new cc.Sprite(res.player2Particle1_png);
        this.addChild(this.foot2Sprite);
        this.foot2Sprite.setAnchorPoint(cc.p(0,0));

        this.starFish1Sprite = new cc.Sprite(res.player1Particle2_png);
        this.addChild(this.starFish1Sprite);
        this.starFish1Sprite.setAnchorPoint(cc.p(0,0));

        this.starFish2Sprite = new cc.Sprite(res.player2Particle2_png);
        this.addChild(this.starFish2Sprite);
        this.starFish2Sprite.setAnchorPoint(cc.p(0,0));

        this.heart1Sprite = new cc.Sprite(res.player1Particle3_png);
        this.addChild(this.heart1Sprite);
        this.heart1Sprite.setAnchorPoint(cc.p(0,0));

        this.heart2Sprite = new cc.Sprite(res.player2Particle3_png);
        this.addChild(this.heart2Sprite);
        this.heart2Sprite.setAnchorPoint(cc.p(0,0));
    },
    receivedNotificationOMsg: function (event) {
        var obj = event.getCurrentTarget()

        var arrMessage = event.getUserData().split("-")
        var retMsgType = parseInt(arrMessage[0])
        if (arrMessage.length > 3) {
            var playerTag = parseInt(arrMessage[3])

            switch (playerTag) {
                case config.PLAYER_1_TAG: {
                    obj.player1.stop_x = parseFloat(arrMessage[1])
                    obj.player1.stop_y = parseFloat(arrMessage[2])
                    break;
                }
                case config.PLAYER_2_TAG: {
                    obj.player2.stop_x = parseFloat(arrMessage[1])
                    obj.player2.stop_y = parseFloat(arrMessage[2])
                    break;
                }
            }
        }

        switch (retMsgType) {
            case config.eventTag.MSG_BUY_BLANK_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])
                switch (playerTag) {
                    case config.PLAYER_1_TAG: {
                        obj.transferLandTag = 0
                        obj.showBuyLandDialog(config.eventTag.MSG_BUY_BLANK_TAG)
                        break;
                    }
                    case config.PLAYER_2_TAG: {
                        playEffectRandomly(obj.arrPlayer2Effect11, false)
                        obj.buyLand(config.eventTag.MSG_BUY_BLANK_TAG, obj.buyLandX, obj.buyLandY,
                            obj.foot2Sprite, obj.player2_building_1_tiledID, obj.player2, res.player2Particle1_plist)
                        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                        cc.eventManager.dispatchEvent(event)
                        break;
                    }
                }
                break;
            }
            case config.eventTag.MSG_BUY_LAND_1_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])

                switch (playerTag) {
                    case config.PLAYER_1_TAG: {
                        obj.transferLandTag = 0
                        obj.showBuyLandDialog(config.eventTag.MSG_BUY_LAND_1_TAG)
                        break
                    }
                    case config.PLAYER_2_TAG: {
                        playEffectRandomly(obj.arrPlayer2Effect9, false)
                        obj.buyLand(config.eventTag.MSG_BUY_LAND_1_TAG, obj.buyLandX, obj.buyLandY,
                            obj.foot2Sprite, obj.player2_building_2_tiledID, obj.player2, res.player2Particle1_plist)
                        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                        cc.eventManager.dispatchEvent(event)
                        break
                    }
                }

                break;
            }
            case config.eventTag.MSG_BUY_LAND_2_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])

                switch (playerTag) {
                    case config.PLAYER_1_TAG:{
                        obj.transferLandTag = 0
                        obj.showBuyLandDialog(config.eventTag.MSG_BUY_LAND_2_TAG)
                        break
                    }
                    case config.PLAYER_2_TAG: {
                        playEffectRandomly(obj.arrPlayer2Effect9, false)
                        obj.buyLand(config.eventTag.MSG_BUY_LAND_2_TAG, obj.buyLandX, obj.buyLandY,
                            obj.heart2Sprite, obj.player2_building_3_tiledID, obj.player2, res.player2Particle1_plist)
                        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                        cc.eventManager.dispatchEvent(event)
                        break;
                    }
                }

                break;
            }
            case config.eventTag.MSG_GO_SHOW_TAG:
            {
                if(this.gameRoundCount !== 0 && this.gameRoundCount % config.LOTTERY_ROUND_FREQUENTLY === 0)
                {
                    this.scheduleOnce(this.popPublishLottery,2.0);

                }else
                {
                    this.showGoButton();
                }
                break;
            }
            case config.eventTag.MSG_GO_HIDE_TAG: {
                obj.btnGo.runAction(cc.moveBy(0.3, cc.p(obj.btnGo.width * 2, 0)))
                obj.btnSkill.runAction(cc.moveBy(0.3, cc.p(obj.btnSkill.width * 2, 0)))
                break;
            }
            case config.eventTag.MSG_PAY_TOLLS_1_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])
                obj.payTolls(config.eventTag.MSG_PAY_TOLLS_1_TAG, obj.buyLandX, obj.buyLandY, playerTag)
                break
            }
            case config.eventTag.MSG_PAY_TOLLS_2_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])
                obj.payTolls(config.eventTag.MSG_PAY_TOLLS_2_TAG, obj.buyLandX, obj.buyLandY, playerTag)
                break;
            }
            case config.eventTag.MSG_PAY_TOLLS_3_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])
                obj.payTolls(config.eventTag.MSG_PAY_TOLLS_3_TAG, obj.buyLandX, obj.buyLandY, playerTag)
                break;
            }
            case config.eventTag.MSG_ROUND_COUNT_TAG: {
                obj.gameRoundCount++
                obj.refreshRoundDisplay()
                break
            }
            case config.eventTag.MSG_REST_TAG: {
                obj.buyLandX = parseFloat(arrMessage[1])
                obj.buyLandY = parseFloat(arrMessage[2])
                var playerTag = parseInt(arrMessage[3])
                switch(playerTag)
                {
                    case config.PLAYER_1_TAG:
                    {
                        this.player1.isMyTurn = false

                        var text = getText("in_hospital_remain") + " " + this.player1.restTimes + " " + getText("rich_day")
                        var toast = new ToastLayer(text, 2.0, this.player1.getPosition(), cc.callFunc(function (target) {
                            var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                            event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                            cc.eventManager.dispatchEvent(event)
                        }, this))
                        this.addChild(toast)

                        break;
                    }
                    case config.PLAYER_2_TAG:
                    {
                        this.player2.isMyTurn = false
                        var text = getText("in_hospital_remain") + " " + this.player2.restTimes + " " + getText("rich_day")
                        var toast = new ToastLayer(text, 2.0, this.player2.getPosition(), cc.callFunc(function (target) {
                            var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                            event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                            cc.eventManager.dispatchEvent(event)
                        }, this))
                        this.addChild(toast)
                        break;
                    }
                }
                break
            }
            case config.eventTag.MSG_RANDOM_ASK_EVENT_TAG:{
                var playerTag = parseInt(arrMessage[3])
                switch (playerTag) {
                    case config.PLAYER_1_TAG:
                    {
                        this.doRandomAskEvent(this.player1)
                        this.scheduleOnce(this.sendMSGDealAroundLand, 2.0)
                        break
                    }
                    case config.PLAYER_2_TAG:
                    {
                        this.doRandomAskEvent(this.player2)
                        this.scheduleOnce(this.sendMSGDealAroundLand, 2.0)
                        break
                    }
                }
                break
            }
            //todo
            case config.eventTag.MSG_STRENGTH_UP30_TAG:
            {

                break
            }
            case config.eventTag.MSG_BLOCK_WAY_EVENT_TAG: {
                var playerTag = parseInt(arrMessage[3])
                switch (playerTag) {
                    case config.PLAYER_1_TAG: {
                        obj.doBlockWayEvent(obj.player1)
                        break;
                    }
                    case config.PLAYER_2_TAG: {
                        obj.doBlockWayEvent(obj.player2)
                        break;
                    }
                    default:
                        break;
                }
                break;
            }
        }

    },
    sendMSGDealAroundLand: function(dt) {
        var event = new cc.EventCustom(config.eventCustom.MSG_AROUND_LAND)
        event.setUserData(String(config.eventTag.MSG_AROUND_LAND_TAG))
        cc.eventManager.dispatchEvent(event)
    },
    doRandomAskEvent: function(player) {
        var randomNumber = (Math.random() * (this.arrRandomAskEvent.length)) | 0
        switch (randomNumber) {
            case 0:
            {
                this.refreshMoneyLabel(player, 10000)
                break
            }
            case 1:
            {
                if (player.getTag() === config.PLAYER_1_TAG) {
                    playEffectRandomly(this.arrPlayer2Effect13, false)
                } else if (player.getTag() === config.PLAYER_2_TAG) {
                    playEffectRandomly(this.arrPlayer1Effect13, false)
                }
                this.refreshMoneyLabel(player, -20000)
                break
            }
            case 2:
            {
                this.refreshStrengthLabel(player, -100)
                break
            }
            case 3:
            {
                this.refreshStrengthLabel(player, 100)
                break
            }
            case 4:
            {
                playEffect(soundRes.p1_speaking00181_wav, false)
                this.refreshMoneyLabel(player, 20000)
                break
            }
            case 5:
            {
                playEffect(soundRes.p1_speaking00182_wav, false)
                this.refreshMoneyLabel(player, -30000)
                break
            }
            case 6:
            {
                player.arrSkill[0]++
                break
            }
            case 7:
            {
                player.arrSkill[1]++
                break
            }
            case 8:
            {
                player.arrSkill[2]++
                break
            }
        }

        var toast = new ToastLayer(this.arrRandomAskEvent[randomNumber], 2.0, this.player1.getPosition(), null)
        this.addChild(toast)
    },
    doItemStrengthUp: function(strengthUp, playerTag)
    {
        playEffect(soundRes.particle_mp3, false)
        var strengthValue = 0;
        switch(strengthUp)
        {
            case config.eventTag.MSG_STRENGTH_UP30_TAG:
            {
                strengthValue = 30;
                break;
            }

            case config.eventTag.MSG_STRENGTH_UP50_TAG:
            {
                strengthValue = 50;
                break;
            }

            case config.eventTag.MSG_STRENGTH_UP80_TAG:
            {
                strengthValue = 80;
                break;
            }
        }
        switch (playerTag) {
            case config.PLAYER_1_TAG:
            {
                this.itemStrengthUp.setVisible(true)
                this.itemStrengthUp.setPosition(cc.p(this.player1.x - 5, this.player1.y))
                var action = cc.sequence(this.itemStrengthUp.normalAnim,
                    cc.callFunc(function (target) {
                        target.itemStrengthUp.setVisible(false)
                    }, this))
                this.itemStrengthUp.runAction(action)
                var toast = new ToastLayer(getText("strength_up") + " " + strengthValue, 2.0, this.player1.getPosition(), null)
                this.addChild(toast)
                this.refreshStrengthLabel(this.player1, strengthValue)
                this.scheduleOnce(this.sendMSGDealAroundLand, 3.0)
                break
            }
            case config.PLAYER_2_TAG:
            {
                this.itemStrengthUp.setVisible(true)
                this.itemStrengthUp.setPosition(cc.p(this.player2.x, this.player2.y))
                var action = cc.sequence(this.itemStrengthUp.normalAnim,
                    cc.callFunc(function (target) {
                        target.itemStrengthUp.setVisible(false)
                    }, this))
                this.itemStrengthUp.runAction(action)
                var toast = new ToastLayer(getText("strength_up") + " " + strengthValue, 2.0, this.player2.getPosition(), null)
                this.addChild(toast)
                this.refreshStrengthLabel(this.player2, strengthValue)
                this.scheduleOnce(this.sendMSGDealAroundLand, 3.0)
                break
            }
        }
    },
    showGoButton: function() {
        this.btnGo.runAction(cc.moveBy(0.3, cc.p(-obj.btnGo.width * 2, 0)))
        this.btnSkill.runAction(cc.moveBy(0.3, cc.p(-obj.btnSkill.width * 2, 0)))
    },
    refreshRoundDisplay: function () {
        for (var i = 0; i < this.arrRefreshRound.length; i++) {
            this.arrRefreshRound[i].setVisible(false);
        }

        this.arrRefreshRound = []
        var count = this.gameRoundCount
        var st;

        if (count === 0) {
            st = cc.Sprite.create(this.arrDigiteRound[0])
            this.addChild(st)
            this.arrRefreshRound.push(st)
        }
        while (count != 0) {
            st = cc.Sprite.create(this.arrDigiteRound[count%10]);
            this.addChild(st);
            this.arrRefreshRound.push(st)
            count = count/10;
        }
        this.arrRefreshRound.reverse()

        for(var i = 0;i < this.arrRefreshRound.length;i++)
        {
            var sp = this.arrRefreshRound[i];
            sp.setPosition(cc.p((GameBaseLayer.tableStartPositionX + 50) + (i * 25), 50));
            sp.setVisible(true);
        }


        this.updateStockVec();
    },
    updateStockVec: function() {
        var valule1 = ((Math.random() * 800) | 0) + 10
        var valule2 = ((Math.random() * 800) | 0) + 10
        var valule3 = ((Math.random() * 800) | 0) + 10
        var valule4 = ((Math.random() * 800) | 0) + 10
        var valule5 = ((Math.random() * 800) | 0) + 10

        if(this.arrStockPoint1.length > 13)
        {
            for(var i = 0; i < 13; i++)
            {
                this.arrStockPoint1[i] = this.arrStockPoint1[i + 1]
                this.arrStockPoint2[i] = this.arrStockPoint2[i + 1]
                this.arrStockPoint3[i] = this.arrStockPoint3[i + 1]
                this.arrStockPoint4[i] = this.arrStockPoint4[i + 1]
                this.arrStockPoint5[i] = this.arrStockPoint5[i + 1]

            }
            this.arrStockPoint1[13] = valule1
            this.arrStockPoint2[13] = valule2
            this.arrStockPoint3[13] = valule3
            this.arrStockPoint4[13] = valule4
            this.arrStockPoint5[13] = valule5
        }else
        {
            this.arrStockPoint1.push(valule1);
            this.arrStockPoint2.push(valule2);
            this.arrStockPoint3.push(valule3);
            this.arrStockPoint4.push(valule4);
            this.arrStockPoint5.push(valule5);
        }
    },
    payTolls: function(payTag, x, y, playerTag) {
        var money = 0
        if (payTag === config.eventTag.MSG_PAY_TOLLS_1_TAG) {
            money = config.LAND_BLANK_MONEY
        }
        if (payTag === config.eventTag.MSG_PAY_TOLLS_2_TAG) {
            money = config.LAND_LEVEL_1_MONEY
        }
        if (payTag === config.eventTag.MSG_PAY_TOLLS_3_TAG) {
            money = config.LAND_LEVEL_2_MONEY
        }

        this.arrDisplay = []

        var landOwner = this.getPlayerByTiled(this.buyLandX, this.buyLandY)
        switch (playerTag) {
            case config.PLAYER_1_TAG:
            {
                playEffectRandomly(this.arrPlayer1Effect1, false);
                var retMoney = this.displayArea(x, y, this.player1, GameBaseLayer.player2_building_1_tiledID, GameBaseLayer.player2_building_2_tiledID, GameBaseLayer.player2_building_3_tiledID);
                if(landOwner.restTimes > 0)
                {
                    playEffectRandomly(this.arrPlayer1Effect10, false);

                    var toast = new ToastLayer(getText("in_hospital"), 2.0, this.player1.getPosition(), cc.callFunc(function (target) {
                        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                        cc.eventManager.dispatchEvent(event)
                    }, this))
                    this.addChild(toast)

                    return;
                }
                this.refreshMoneyLabel(landOwner, money + retMoney);
                this.refreshMoneyLabel(this.player1,-(money + retMoney));

                var msg = "+" + (money + retMoney)

                var toast = new ToastLayer(msg, 3.0, landOwner.getPosition(), null)
                this.addChild(toast)

                msg = "-" + (money + retMoney)
                var player1Toast = new ToastLayer(msg, 2.0, this.player.getPosition(), cc.callFunc(function (target) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                    event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                    cc.eventManager.dispatchEvent(event)
                }, this))
                this.addChild(player1Toast)
                this.transferLandTag = payTag;
                this.arrNextPlayerEffect = this.arrPlayer2Effect8;
                this.scheduleOnce(this.playNextEffectArr, 2);
                break
            }
            case config.PLAYER_2_TAG:
            {
                playEffectRandomly(this.arrPlayer2Effect1, false);
                var retMoney = this.displayArea(x, y, this.player2, GameBaseLayer.player1_building_1_tiledID, GameBaseLayer.player1_building_2_tiledID, GameBaseLayer.player1_building_3_tiledID);
                if(landOwner.restTimes > 0)
                {
                    playEffectRandomly(this.arrPlayer2Effect10, false)

                    var toast = new ToastLayer(getText("in_hospital"), 2.0, this.player2.getPosition(), cc.callFunc(function (target) {
                        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                        cc.eventManager.dispatchEvent(event)
                    }, this))
                    this.addChild(toast)
                    return;
                }
                this.refreshMoneyLabel(landOwner, money + retMoney);
                this.refreshMoneyLabel(this.player2, -(money + retMoney));

                var msg = "+" + (money + retMoney)
                var toast = new ToastLayer(msg, 3.0, landOwner.getPosition(), null)
                this.addChild(toast)

                msg = "-" + (money + retMoney)
                var player2Toast = new ToastLayer(msg, 2.0, this.player2.getPosition(), cc.callFunc(function (target) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                    event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                    cc.eventManager.dispatchEvent(event)
                }, this))
                this.addChild(player2Toast)
                this.arrNextPlayerEffect = this.arrPlayer1Effect8;
                this.scheduleOnce(this.playNextEffectArr, 2);
                break
            }
        }

    },
    displayArea: function(x, y, player, building_1_tiledID, building_2_tiledID, building_3_tiledID) {
        playEffect(soundRes.blockWay_wav, false)
        var sumMoney = 0
        var retX = GL2map(player.getPosition(), GameBaseLayer.map).x
        if (x === retx) {
            var leftX = x - 1;
            var rightX = x + 1;
            var leftGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(leftX, y));
            var rightGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(rightX, y));
            this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(x, y)));
            while (leftGID !== 0 && (leftGID === GameBaseLayer.building_1_tiledID || leftGID === GameBaseLayer.building_2_tiledID || leftGID === GameBaseLayer.building_3_tiledID)) {
                if (leftGID === GameBaseLayer.building_1_tiledID) {
                    sumMoney += config.LAND_BLANK_MONEY;
                }
                if (leftGID === GameBaseLayer.building_2_tiledID) {
                    sumMoney += config.LAND_LEVEL_1_MONEY;
                }
                if (leftGID === GameBaseLayer.building_3_tiledID) {
                    sumMoney += config.LAND_LEVEL_2_MONEY;
                }
                this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(leftX, y)));
                leftX -= 1;
                leftGID = landLayer.getTileGIDAt(cc.p(leftX, y));

                if (leftGID == 0) {
                    break;
                }
            }

            while (rightGID !== 0 && (rightGID === GameBaseLayer.building_1_tiledID || rightGID === GameBaseLayer.building_2_tiledID || rightGID === GameBaseLayer.building_3_tiledID)) {
                if (rightGID === GameBaseLayer.building_1_tiledID) {
                    sumMoney += config.LAND_BLANK_MONEY;
                }
                if (rightGID === GameBaseLayer.building_2_tiledID) {
                    sumMoney += config.LAND_LEVEL_1_MONEY;
                }
                if (rightGID === GameBaseLayer.building_3_tiledID) {
                    sumMoney += config.LAND_LEVEL_2_MONEY;
                }
                this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(rightX, y)));
                rightX += 1;
                rightGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(rightX, y));

                if (rightGID === 0) {
                    break;
                }
                log("rightGID: %d", rightGID);
            }
        }

        var retY = GL2map(player.getPosition(), GameBaseLayer.map).y
        if (y == retY) {
            var upY  = y - 1;
            var downY = y + 1;
            var upGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(x,upY));
            var downGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(x,downY));
            this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(x,y)));
            while(upGID !== 0 && (upGID === GameBaseLayer.building_1_tiledID || upGID === GameBaseLayer.building_2_tiledID || upGID === GameBaseLayer.building_3_tiledID))
            {
                if(upGID === GameBaseLayer.building_1_tiledID)
                {
                    sumMoney += config.LAND_BLANK_MONEY;
                }
                if(upGID === GameBaseLayer.building_2_tiledID)
                {
                    sumMoney += config.LAND_LEVEL_1_MONEY;
                }
                if(upGID === GameBaseLayer.building_3_tiledID)
                {
                    sumMoney += config.LAND_LEVEL_2_MONEY;
                }
                this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(x,upY)));
                upY -= 1;
                upGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(x,upY));

                if(upGID == 0)
                {
                    break;
                }
                log("leftGID: %d" ,upGID);
            }
            while(downGID !== 0 && (downGID === GameBaseLayer.building_1_tiledID || downGID === GameBaseLayer.building_2_tiledID || downGID === GameBaseLayer.building_3_tiledID))
            {
                if(downGID === GameBaseLayer.building_1_tiledID)
                {
                    sumMoney += config.LAND_BLANK_MONEY;
                }
                if(downGID === GameBaseLayer.building_2_tiledID)
                {
                    sumMoney += config.LAND_LEVEL_1_MONEY;
                }
                if(downGID === GameBaseLayer.building_3_tiledID)
                {
                    sumMoney += config.LAND_LEVEL_2_MONEY;
                }
                this.arrDisplay.push(GameBaseLayer.landLayer.getTileAt(cc.p(x,downY)));
                downY += 1;
                downGID = GameBaseLayer.landLayer.getTileGIDAt(cc.p(x,downY));

                if(downGID == 0)
                {
                    break;
                }
                log("rightGID: %d" ,downGID);
            }
        }
        for (var i = 0; i < this.arrDisplay.length; i++) {
            this.arrDisplay[i].runAction(cc.sequence(this.landFadeOut.clone(), this.landFadeIn.clone()))
        }

    },
    getPlayerByTiled: function(x, y) {
        var gid = GameBaseLayer.landLayer.getTileGIDAt(cc.p(x, y))
        if (gid === GameBaseLayer.player1_building_1_tiledID || gid === GameBaseLayer.player1_building_2_tiledID || gid === GameBaseLayer.player1_building_3_tiledID)
        {
            return this.player1
        }
        if (gid === GameBaseLayer.player2_building_1_tiledID || gid === GameBaseLayer.player2_building_2_tiledID || gid === GameBaseLayer.player2_building_3_tiledID)
        {
            return this.player2
        }
    },
    showBuyLandDialog: function(landTag) {
        var showMessage = ""
        switch (landTag) {
            case config.eventTag.MSG_BUY_BLANK_TAG: {
                showMessage = getText("buy_land_msg") + " " + config.LAND_BLANK_MONEY
                break
            }
            case config.eventTag.MSG_BUY_LAND_1_TAG: {
                showMessage = getText("buy_land_msg") + " " + config.LAND_LEVEL_1_MONEY
                break
            }
            case config.eventTag.MSG_BUY_LAND_2_TAG: {
                showMessage = getText("buy_land_msg") + " " + config.LAND_LEVEL_2_MONEY
                break
            }
        }
        var popDialog = this.createPopupDialog();
        popDialog.dataTag = landTag
        popDialog.setLabelContentText(showMessage, config.popupLayer.contentTag)
        popDialog.setVisible(true)
    },
    buyLandCallback: function(node) {
        playEffect(soundRes.click_01_wav, false)
        if (node.getTag() === tagRes.BtnOkTag) {
            switch (node.getParent().dataTag) {
                case config.eventTag.MSG_BUY_BLANK_TAG: {
                    playEffectRandomly(this.arrPlayer1Effect11, false)
                    this.buyLand(config.eventTag.MSG_BUY_BLANK_TAG, this.buyLandX, this.buyLandY, this.foot1Sprite,
                        GameBaseLayer.player1_building_1_tiledID, this.player1, res.player1Particle1_plist)
                    break;
                }
                case config.eventTag.MSG_BUY_LAND_1_TAG: {
                    playEffectRandomly(this.arrPlayer1Effect9, false)
                    this.buyLand(config.eventTag.MSG_BUY_LAND_1_TAG, this.buyLandX, this.buyLandY, this.starFish1Sprite,
                        GameBaseLayer.player1_building_2_tiledID, this.player1, res.player1Particle1_plist)
                    break;
                }
                case config.eventTag.MSG_BUY_LAND_2_TAG: {
                    playEffectRandomly(this.arrPlayer1Effect9, false)
                    this.buyLand(config.eventTag.MSG_BUY_LAND_1_TAG, this.buyLandX, this.buyLandY, this.heart1Sprite,
                        GameBaseLayer.player1_building_3_tiledID, this.player1, res.player1Particle1_plist)
                    break;
                }
            }
            node.getParent().getParent().removeFromParent()

            var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
            event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
            cc.eventManager.dispatchEvent(event)
        } else {
            node.getParent().getParent().removeFromParent()
            var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
            event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
            cc.eventManager.dispatchEvent(event)
        }
    },
    buyLand: function (buyTag, x, y, landSprite, landLevel, player, particlelistName) {
        var money = 0
        if (buyTag === config.eventTag.MSG_BUY_BLANK_TAG) {
            money = config.LAND_BLANK_MONEY
        }
        if (buyTag === config.eventTag.MSG_BUY_LAND_1_TAG) {
            money = config.LAND_LEVEL_1_MONEY
        }
        if (buyTag === config.eventTag.MSG_BUY_LAND_2_TAG) {
            money = config.LAND_LEVEL_2_MONEY
        }

        var pointOfGL = map2GL(cc.p(x, y), GameBaseLayer.map)
        landSprite.setVisible(true)
        landSprite.setPosition(pointOfGL)

        var pointOfMap = cc.p(x, y)
        landSprite.runAction(cc.sequence(this.scaleby1ForBuyLand, this.scaleby2ForBuyLand,
            cc.callFunc(function (target, data) {
                target.playParticle(data[1], data[8])
                data[2].setVisible(false)
                GameBaseLayer.landLayer.setTileGID(data[3], cc.p(x, y))
                target.refreshMoneyLabel(data[6], data[7])
            }, this, [pointOfMap, pointOfGL, landSprite, landLevel, x, y, player, money, particlelistName])))
    },
    registerBlockWaySchedule: function () {
        this.schedule(this.updateBlockWaySprites, 10.0)
    },
    playParticle: function(point, plistName) {
        var particleSystemFoot = new cc.ParticleSystem(plistName)
        point.x += GameBaseLayer.tiledWidth / 2
        point.y += GameBaseLayer.tiledHeight / 2
        particleSystemFoot.setPosition(point)
        particleSystemFoot.setAutoRemoveOnFinish(true)
        var batch = new cc.ParticleBatchNode(particleSystemFoot.texture)
        batch.addChild(particleSystemFoot)
        this.addChild(batch)
    },
    updateBlockWaySprites: function (dt) {
        var _rand1 = ((Math.random() * (this.arrWayLayerPassPoint.length)) | 0)
        var position = this.arrWayLayerPassPoint[_rand1]
        position.x -= 5;
        position.y += GameBaseLayer.tiledHeight;
        this.itemCrab.setVisible(true);
        this.itemCrab.setPosition(position);
        this.itemCrab.setAnchorPoint(cc.p(0, 0.6));


        var _rand2 = ((Math.random() * (this.arrWayLayerPassPoint.length)) | 0)
        var position2 = this.arrWayLayerPassPoint[_rand2]
        this.itemBall.setVisible(true);
        this.itemBall.setPosition(position2);
        this.itemBall.setAnchorPoint(cc.p(0, 0));
    },
    doBlockWayEvent: function (player) {
        cc.log("player: %o", player)

        var crabPos = this.itemCrab.getPosition()
        crabPos.x += this.itemCrab.width / 2
        crabPos.y -= this.itemCrab.height / 2

        // if (player.getBoundingBox().containsPoint(crabPos)) {
        if (cc.rectContainsPoint(player.getBoundingBox(), crabPos)) {
            playEffect(soundRes.m120_mp3, false)
            if (player.getTag() === config.PLAYER_2_TAG) {
                playEffectRandomly(this.arrPlayer2Effect6, false)
                this.arrNextPlayerEffect = this.arrPlayer1Effect7
                this.scheduleOnce(this.playNextEffectArr, 2.0)
            } else if (player.getTag() === config.PLAYER_1_TAG) {
                playEffectRandomly(this.arrPlayer1Effect6, false)
                this.arrNextPlayerEffect = this.arrPlayer2Effect7
                this.scheduleOnce(this.playNextEffectArr, 2.0)
            }

            this.itemCrab.setPosition(-200, -200)
            player.restTimes = ((Math.random() * 5 + 1) | 0)

            this.itemEmergency.setVisible(true)
            this.itemEmergency.setPosition(GameBaseLayer.tableStartPositionX, player.getPositionY())

            this.itemFog.setVisible(true)
            this.itemFog.setPosition(player.getPosition())

            var repeat0 = cc.repeat(this.itemFog.normalAnim, 2)
            this.itemFog.runAction(repeat0)

            var moveBy = cc.moveBy(1.0, cc.p(-(GameBaseLayer.tableStartPositionX - player.getPositionX()), 0))
            var moveBy2 = cc.moveBy(0.5, cc.p(-60, 0))
            var repeate = cc.repeat(this.itemEmergency.carGoAnim, 5)
            var repeate2 = cc.repeat(this.itemEmergency.carStopAnim, 1)

            var spawnAction = cc.sequence(cc.spawn(moveBy, repeate), cc.spawn(moveBy2, repeate2), cc.callFunc(this.endCarGo, this))
            this.itemEmergency.runAction(spawnAction)

            if (player.getTag() === config.PLAYER_1_TAG) {
                this.scheduleOnce(this.setPlayer1Invisible, 2.5)
            } else if (player.getTag() === config.PLAYER_2_TAG) {
                this.scheduleOnce(this.setPlayer2Invisible, 2.5)
            }

            var msg = getText("player_hurt") + " " + player.restTimes + " " + getText("rich_day")
            var toast = new ToastLayer(msg, 2.0, player.getPosition(), null)
            this.addChild(toast)
        } else if (cc.rectIntersectsRect(player.getBoundingBox(), this.itemBall.getBoundingBox())) {
            if (player.getTag() === config.PLAYER_2_TAG) {
                playEffectRandomly(this.arrPlayer2Effect12, false)
            } else if (player.getTag() === config.PLAYER_1_TAG) {
                playEffectRandomly(this.arrPlayer1Effect12, false)
            }
            this.itemBall.setPosition(cc.p(-200, -200))
            this.refreshMoneyLabel(player, 10000)
            var msg = getText("pick_ball") + " 10000"
            var toast = new ToastLayer(msg, 2.0, player.getPosition(), cc.callFunc(function (target) {
                var event = new cc.EventCustom(config.eventCustom.MSG_AROUND_LAND)
                event.setUserData(String(config.eventTag.MSG_AROUND_LAND_TAG))
                cc.eventManager.dispatchEvent(event)
            }, this))
            this.addChild(toast)
        } else {
            var event = new cc.EventCustom(config.eventCustom.MSG_HANDLE_PROP_EVENT)
            event.setUserData(String(config.eventTag.MSG_HANDLE_PROP_EVENT_TAG))
            cc.eventManager.dispatchEvent(event)
        }

    },
    endCarGo: function () {
        this.itemStretcher.setVisible(true)
        this.itemStretcher.setPosition(this.itemEmergency.getPosition())
        var moveBy = cc.moveBy(0.5, cc.p(60, 0));
        var scaleBy = cc.scaleBy(0.5, 0.8);
        var repeate = cc.repeat(this.itemStretcher.stretcherEmptyAnim, 1);
        var scaleBy2 = cc.scaleBy(0.5, 1.25);
        var moveBy2 = cc.moveBy(0.5, cc.p(-60, 0));
        var repeate2 = cc.repeat(this.itemStretcher.stretcherFullAnim, 1);
        var spawnAction = cc.sequence(cc.spawn(moveBy, scaleBy, repeate),
            cc.spawn(moveBy2, scaleBy2, repeate2), cc.callFunc(this.startCarGoAgain, this));
        this.itemStretcher.runAction(spawnAction);
    },
    startCarGoAgain: function () {
        this.itemStretcher.setVisible(false)

        var moveBy = cc.moveBy(1.0, cc.p(-this.itemEmergency.getPositionX(), 0))
        var repeate = cc.repeat(this.itemEmergency.carGoAnim, 5)
        var spawanAction = cc.sequence(cc.spawn(moveBy, repeate), cc.callFunc(this.endCarGoLast, this))
        this.itemEmergency.runAction(spawanAction)
    },
    endCarGoLast: function () {
        this.itemEmergency.setVisible(false)
        var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
        event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
        cc.eventManager.dispatchEvent(event)
    },
    setPlayer1Invisible: function (t) {
        this.player1.setVisible(false)
        this.itemFog.setVisible(false)
    },
    setPlayer2Invisible: function (t) {
        this.player2.setVisible(false)
        this.itemFog.setVisible(false)
    },
    initItemSprite: function () {
        this.itemCrab = new ItemCrab()
        this.addChild(this.itemCrab)
        this.itemCrab.runAction(cc.repeatForever(this.itemCrab.normalAnim))
        this.itemCrab.setVisible(false)

        this.itemBall = new ItemBall()
        this.addChild(this.itemBall)
        this.itemBall.runAction(cc.repeatForever(this.itemBall.normalAnim))
        this.itemBall.setVisible(false)

        this.itemStrengthUp = new ItemStrengthUp()
        this.addChild(this.itemStrengthUp)
        this.itemStrengthUp.setAnchorPoint(cc.p(0, 0.5))
        this.itemStrengthUp.setVisible(false)

        this.itemEmergency = new ItemEmergency()
        this.addChild(this.itemEmergency)
        this.itemEmergency.setVisible(false)

        this.itemFog = new ItemFog()
        this.addChild(this.itemFog);
        this.itemFog.setVisible(false);

        this.itemStretcher = new ItemStretcher()
        this.addChild(this.itemStretcher);
        this.itemStretcher.setVisible(false);
        this.itemStretcher.setAnchorPoint(cc.p(0, 0.9));
    },
    initAudioEffect: function () {
        this.arrBgMusic = [soundRes.bg01_mp3, soundRes.bg02_mp3, soundRes.bg03_mp3]
        this.schedule(this.playBgMusic, 5.0)

        //交过路费声音0-6
        this.arrPlayer2Effect1 = [soundRes.p2_speaking01_wav, soundRes.p2_qisiwole_wav, soundRes.p2_xinhaokonga_wav,
            soundRes.p2_buhuiba_wav, soundRes.p2_payhigh_wav, soundRes.p2_qiangqiana_wav,
            soundRes.p2_hebaochuxie_wav]

        //抢夺别人地块7-10
        this.arrPlayer2Effect2 = [soundRes.p2_bieguaiwo_wav, soundRes.p2_speaking02_wav, soundRes.p2_tiger_wav, soundRes.p2_nidejiushode_wav]

        //房屋被抢夺11-14
        this.arrPlayer2Effect3 = [soundRes.p2_zhenmianmu_wav, soundRes.p2_wodediqi_wav, soundRes.p2_haoqifu_wav, soundRes.p2_wangfa_wav]

        //摧毁别人房屋15-18
        this.arrPlayer2Effect4 = [soundRes.p2_nigaiwochai_wav, soundRes.p2_kanwode_wav, soundRes.p2_hairenle_wav, soundRes.p2_baochou_wav]

        //房屋被摧毁19-22
        this.arrPlayer2Effect5 = [soundRes.p2_wodeyangfang_wav, soundRes.p2_qifurenjia_wav, soundRes.p2_shaqiandao_wav,
            soundRes.p2_lianxiangxiyu_wav, soundRes.p2_haojiugaihao_wav]

        //螃蟹伤人23-26
        this.arrPlayer2Effect6 = [soundRes.p2_yunqicha_wav, soundRes.p2_hairenjing_wav, soundRes.p2_xiaohuang_wav, soundRes.p2_yisheng_wav]

        //看到别人住院27-28
        this.arrPlayer2Effect7 = [soundRes.p2_duoxiuxi_wav, soundRes.p2_xiuxijitian_wav]

        //收取过路费29-34
        this.arrPlayer2Effect8 = [soundRes.p2_renbuweiji_wav, soundRes.p2_xiaoqi_wav, soundRes.p2_rongxing_wav,
            soundRes.p2_manyi_wav, soundRes.p2_xiaofupo_wav, soundRes.p2_duogei_wav]

        //升级房子35-36
        this.arrPlayer2Effect9 = [soundRes.p2_higher_wav, soundRes.p2_wanzhanggaolou_wav]

        //不交过路费37-38
        this.arrPlayer2Effect10 = [soundRes.p2_notpay_wav, soundRes.p2_yimaobugei_wav]

        //买地39-42
        this.arrPlayer2Effect11 = [soundRes.p2_buyit_wav, soundRes.p2_haodekaishi_wav, soundRes.p2_rangnizhu_wav, soundRes.p2_maiwoba_wav]

        //捡到珍珠43-44
        this.arrPlayer2Effect12 = [soundRes.p2_deyideyitian_wav, soundRes.p2_hengcai_wav]

        //对方被罚收税45-48
        this.arrPlayer2Effect13 = [soundRes.p2_toushui_wav, soundRes.p2_falvzhicai_wav, soundRes.p2_guoku_wav, soundRes.p2_nashui_wav]

        //交过路费声音
        this.arrPlayer1Effect1 = [soundRes.p1_speaking00435_wav, soundRes.p1_speaking00461_wav, soundRes.p1_speaking00475_wav,
            soundRes.p1_speaking01060_wav, soundRes.p1_speaking01062_wav]

        //抢夺别人地块
        this.arrPlayer1Effect2 = [soundRes.p1_speaking00429_wav]

        //房屋被抢夺
        this.arrPlayer1Effect3 = [soundRes.p1_speaking00430_wav, soundRes.p1_speaking00464_wav, soundRes.p1_speaking00469_wav,
            soundRes.p1_speaking00470_wav, soundRes.p1_speaking00476_wav]

        //摧毁别人房屋
        this.arrPlayer1Effect4 = [soundRes.p1_speaking00433_wav, soundRes.p1_speaking00437_wav]

        //房屋被摧毁
        this.arrPlayer1Effect5 = [soundRes.p1_speaking00462_wav, soundRes.p1_speaking00463_wav, soundRes.p1_speaking00466_wav,
            soundRes.p1_speaking00468_wav, soundRes.p1_speaking00474_wav, soundRes.p1_speaking01061_wav]

        //螃蟹伤人
        this.arrPlayer1Effect6 = [soundRes.p1_speaking00449_wav, soundRes.p1_speaking01054_wav, soundRes.p1_speaking01055_wav,
            soundRes.p1_speaking01071_wav]

        //看到别人住院
        this.arrPlayer1Effect7 = [soundRes.p1_speaking01073_wav]

        //收取过路费
        this.arrPlayer1Effect8 = [soundRes.p1_speaking00453_wav, soundRes.p1_speaking01059_wav, soundRes.p1_speaking01057_wav]

        //升级房子
        this.arrPlayer1Effect9 = [soundRes.p1_speaking01051_wav, soundRes.p1_speaking01066_wav]

        //不交过路费
        this.arrPlayer1Effect10 = [soundRes.p1_speaking00446_wav, soundRes.p1_speaking00477_wav]

        //买地
        this.arrPlayer1Effect11 = [soundRes.p1_speaking00458_wav, soundRes.p1_speaking01067_wav, soundRes.p1_speaking01051_wav]

        //捡到珍珠
        this.arrPlayer1Effect12 = [soundRes.p1_speaking01052_wav, soundRes.p1_speaking01063_wav]

        //对方被罚收税
        this.arrPlayer1Effect13 = [soundRes.p1_speaking00452_wav]

    },
    playBgMusic: function () {
        if (!cc.audioEngine.isMusicPlaying() && cc.sys.localStorage.getItem("music_on") !== "NO") {
            var index = ((Math.random() * this.arrBgMusic.length) | 0)
            cc.audioEngine.playMusic(this.arrBgMusic[index], true)
        }
    },
    playNextEffectArr: function (t) {
        playEffectRandomly(this.arrNextPlayerEffect, false)
    },
    refreshMoneyLabel: function (player, money) {
        var tag = player.getTag()
        player.money = money
        var strMoney
        if (tag === config.PLAYER_1_TAG) {
            strMoney = "$ " + money
            this.player1_money_label.setString(strMoney)
        }
        if (tag === config.PLAYER_2_TAG) {
            strMoney = "$ " + money
            this.player2_money_label.setString(strMoney)
        }
    },
    refreshStrengthLabel: function(player, strength) {
        var tag = player.getTag();
        var totalStrength = player.strength + strength;
        if(totalStrength > 100) totalStrength = 100;
        if(totalStrength < 0) totalStrength = 0;
        player.strength = totalStrength

        if(tag === config.PLAYER_1_TAG)
        {
            this.player1_strength_label.setString("+ " + player.strength)
        }
        if(tag === config.PLAYER_2_TAG)
        {
            this.player2_strength_label.setString("+ " + player.strength)
        }
    },
    initPopPublishLottery: function () {
        this.popDialogLottery = new CustomizedPopupLayer()
        this.popDialogLottery.addBackground(res.dialogBg_png)
        this.popDialogLottery.setContentSize(cc.size(400, 400))
        this.popDialogLottery.addTitle(getText("publish_lottery"), 20)
        this.popDialogLottery.addContent("", 20, 60, 250)
        this.popDialogLottery.popType = config.popType.LOTTERY_PUBLISH
        this.popDialogLottery.arrPlayers = this.arrPlayers
        this.popDialogLottery.setTag(100)
        this.addChild(this.popDialogLottery)
        this.popDialogLottery.setVisible(false)
    },
    popPublishLottery: function(dt) {
        this.popDialogLottery.setVisible(true);
        this.popDialogLottery.addPlayersLottery();
        this.popDialogLottery.runPublishAnmi();
    }
})

GameBaseLayer.drawPathColor = function (arrRow, arrCol) {

    for (var i = 1; i < arrRow.length; i++) {
        GameBaseLayer.arrPathMark[i - 1].setPosition(cc.p(arrCol[i] * 32, arrRow[i] * 32));
        GameBaseLayer.arrPathMark[i - 1].setVisible(true);
    }
}

GameBaseLayer.tiledWidth = 32
GameBaseLayer.tiledHeight = 32
GameBaseLayer.tableStartPositionX = 650
GameBaseLayer.tableStartPositionY = 450
GameBaseLayer.tableWidth = 50
GameBaseLayer.tableHeight = 40

GameBaseLayer.goButtonTag = 700
GameBaseLayer.skillButtonTag = 701
GameBaseLayer.skillStormTag = 702
GameBaseLayer.skillStepTag = 703
GameBaseLayer.skillTransferTag = 704
GameBaseLayer.saveButtonTag = 705
GameBaseLayer.audioButtonTag = 706
GameBaseLayer.stepBaseTag = 800
GameBaseLayer.step1_tag = 801
GameBaseLayer.step2_tag = 802
GameBaseLayer.step3_tag = 803
GameBaseLayer.step4_tag = 804
GameBaseLayer.step5_tag = 805
GameBaseLayer.step6_tag = 806

GameBaseLayer.tiledColsCount = null
GameBaseLayer.tiledRowsCount = null
GameBaseLayer.arrCanPassGrid = []
GameBaseLayer.arrPlayers = []
GameBaseLayer.arrPathMark = []
GameBaseLayer.landLayer = null
GameBaseLayer.wayLayer = null
GameBaseLayer.map = null

GameBaseLayer.blank_land_tiledID = null
GameBaseLayer.strength_30_tiledID = null
GameBaseLayer.strength_50_tiledID = null
GameBaseLayer.strength_80_tiledID = null

GameBaseLayer.randomEvent_tiledID = null
GameBaseLayer.lottery_tiledID = null
GameBaseLayer.stock_tiledID = null

GameBaseLayer.player1_building_1_tiledID = null
GameBaseLayer.player1_building_2_tiledID = null
GameBaseLayer.player1_building_3_tiledID = null

GameBaseLayer.player2_building_1_tiledID = null
GameBaseLayer.player2_building_2_tiledID = null
GameBaseLayer.player2_building_3_tiledID = null