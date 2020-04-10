var RicherGameController = cc.Layer.extend({

    stepHasGone: null,
    stepsCount: null,
    isAnimFinished: null,
    nextRow: null,
    nextCol: null,
    currentRow: null,
    currentCol: null,

    moveBy: null,
    repeate: null,
    spawnAction: null,
    callEndGoFunc: null,

    arrRow: [],
    arrCol: [],
    _richerPlayer: null,

    oneRoundDone: null,
    positionAroundEnd: [],

    ctor: function () {
        this._super()
        this.init()
    },
    init: function() {
        this.callEndGoFunc = cc.callFunc(this.endGo, this)
        this.registerNotificationObserver()
        this.oneRoundDone = false
        this.positionAroundEnd = new Array(4)
        for (var i = 0; i < 4; i++) {
            this.positionAroundEnd[i] = new Array(2)
        }
        return true
    },
    startRealGo: function(arrRow, arrCol, richerPlayer) {
        this.currentRow = arrRow[0];
        this.currentCol = arrCol[0];
        this.nextRow = 0;
        this.nextCol = 0;

        this.arrRow = arrRow;
        this.arrCol = arrCol;
        this._richerPlayer =richerPlayer;
        this.stepHasGone = 0;
        this.stepsCount = arrRow.length - 1;
        this.moveOneStep(richerPlayer);
    },
    endGo: function() {
        GameBaseLayer.arrPathMark[this.stepHasGone].setVisible(false)
        this.stepHasGone++
        if(this.stepHasGone >= this.stepsCount) {
            var event = new cc.EventCustom(config.eventCustom.MSG_BLOCK_WAY_EVENT)
            var data = config.eventTag.MSG_BLOCK_WAY_EVENT_TAG + "-0.0-0.0-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }

        this.currentRow = this.nextRow;
        this.currentCol = this.nextCol;
        var titleSize = GameBaseLayer.wayLayer.getLayerSize();
        var passId = GameBaseLayer.wayLayer.getTileGIDAt(cc.p(this.currentCol,titleSize.height - this.currentRow - 1));
        if(passId === GameBaseLayer.lottery_tiledID)
        {
            var msg = config.eventTag.MSG_LOTTERY_TAG + "-" + 1.0 + "-" + 1.0 + "-" + this._richerPlayer.getTag() + "-" + config.moveTag.MOVEPASS

            var event = new cc.EventCustom(config.eventCustom.MSG_LOTTERY)
            event.setUserData(msg)
            cc.eventManager.dispatchEvent(event)
            return;
        }

        if(passId === GameBaseLayer.stock_tiledID)
        {
            var msg = config.eventTag.MSG_STOCK_TAG + "-" + 1.0 + "-" + 1.0 + "-" + this._richerPlayer.getTag() + "-" + config.moveTag.MOVEPASS

            var event = new cc.EventCustom(config.eventCustom.MSG_STOCK)
            event.setUserData(msg)
            cc.eventManager.dispatchEvent(event)
            return;
        }

        this.moveOneStep(this._richerPlayer);
    },
    registerNotificationObserver: function() {
        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_PICKONE_TOGO,
                callback: this.receivedMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_AROUND_LAND,
                callback: this.receivedMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_HANDLE_PROP_EVENT,
                callback: this.receivedMsg
            }), this)

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: this,
                eventName: config.eventCustom.MSG_MOVE_ONE_STEP,
                callback: this.receivedMsg
            }), this)
    },
    moveOneStep: function (richerPlayer) {
        playEffect(soundRes.walk_mp3, false)
        this.nextRow = this.arrRow[this.stepHasGone + 1]
        this.nextCol = this.arrCol[this.stepHasGone + 1]
        var distanceRow = this.nextRow - this.currentRow
        var distanceCol = this.nextCol - this.currentCol

        if(distanceRow > 0)//up
        {
            this.moveBy = cc.moveBy(RicherGameController.playerGoTotalTime,cc.p(0, GameBaseLayer.tiledHeight));
            this.repeate = cc.repeat(richerPlayer.up,1);
        }
        if(distanceRow < 0)//down
        {
            this.moveBy = cc.moveBy(RicherGameController.playerGoTotalTime, cc.p(0, -GameBaseLayer.tiledHeight));
            this.repeate = cc.repeat(richerPlayer.down,1);
        }
        if(distanceCol > 0)//right
        {
            this.moveBy = cc.moveBy(RicherGameController.playerGoTotalTime,cc.p(GameBaseLayer.tiledWidth,0));
            this.repeate = cc.repeat(richerPlayer.right,1);
        }
        if(distanceCol <0)//left
        {
            this.moveBy = cc.moveBy(RicherGameController.playerGoTotalTime,cc.p(-GameBaseLayer.tiledWidth,0));
            this.repeate = cc.repeat(richerPlayer.left,1);
        }

        this.spawnAction = cc.sequence(cc.spawn(this.moveBy, this.repeate),this.callEndGoFunc);
        richerPlayer.runAction(this.spawnAction);

    },
    receivedMsg: function (event) {
        var retMsgType = parseInt(event.getUserData())
        var obj = event.getCurrentTarget()

        if(retMsgType === config.eventTag.MSG_PICKONE_TOGO_TAG)
        {
            obj.pickOnePlayerToGo()
        }

        if (retMsgType === config.eventTag.MSG_AROUND_LAND_TAG) {
            obj.aroundLandEvent()
        }

        if(retMsgType === config.eventTag.MSG_HANDLE_PROP_EVENT_TAG) {
            obj.handlePropEvent()
        }

        if(retMsgType === config.eventTag.MSG_MOVE_ONE_STEP_TAG)
        {
            obj.moveOneStep(this._richerPlayer)
        }
    },
    pickOnePlayerToGo: function() {
        for (var i = 0; i < GameBaseLayer.arrPlayers.length; i++) {
            if (GameBaseLayer.arrPlayers[i].money <= 0) {
                var event = new cc.EventCustom(config.eventCustom.MSG_GAME_OVER)
                var data = config.eventTag.MSG_GAME_OVER_TAG + "-0.0-0.0-" + GameBaseLayer.arrPlayers[i].getTag()
                event.setUserData(data)
                cc.eventManager.dispatchEvent(event)
                return;
            }
        }

        for (var i = 0; i < GameBaseLayer.arrPlayers.length; i++) {
            var player = GameBaseLayer.arrPlayers[i]
            if (player.isMyTurn && player.restTimes > 0) {
                var event = new cc.EventCustom(config.eventCustom.MSG_REST)
                var data = config.eventTag.MSG_REST_TAG + "-0.0-0.0-" + GameBaseLayer.arrPlayers[i].getTag()
                event.setUserData(data)
                cc.eventManager.dispatchEvent(event)
                return;
            }

            if (player.isMyTurn && player.restTimes === 0) {
                player.setVisible(true)

                if (player.getTag() === config.PLAYER_1_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_GO)
                    event.setUserData(String(config.eventTag.MSG_GO_HIDE_TAG))
                    cc.eventManager.dispatchEvent(event)
                    return;
                }

                 if(player.stop_x > 0) {
                     var gid = GameBaseLayer.landLayer.getTileGIDAt(cc.p(player.stop_x, player.stop_y))
                     if (gid !== GameBaseLayer.blank_land_tiledID && gid !== GameBaseLayer.player2_building_1_tiledID &&
                        gid !== GameBaseLayer.player2_building_2_tiledID && gid !== GameBaseLayer.player2_building_3_tiledID)
                     {
                         var playerStrength = player.strength;
                         var randomSkill_index = ((Math.random() * 3) | 0);
                         var needLostStrength = 0;
                         var landLevel = 0;
                         if(gid === GameBaseScene.player1_building_1_tiledID)
                         {
                             landLevel =  GameBaseScene.player2_building_1_tiledID;
                         }
                         if(gid === GameBaseScene.player1_building_2_tiledID)
                         {
                             landLevel =  GameBaseScene.player2_building_2_tiledID;
                         }
                         if(gid === GameBaseScene.player1_building_3_tiledID)
                         {
                             landLevel =  GameBaseScene.player2_building_3_tiledID;
                         }

                         switch (randomSkill_index) {
                             case 0:
                             {
                                 needLostStrength = 80 - player.arrSkill[0] * 10
                                 break
                             }
                             case 2:
                             {
                                 needLostStrength = 110 - player.arrSkill[2] * 10
                                 break
                             }
                         }
                         if (playerStrength >= needLostStrength) {
                             var msg = config.eventTag.MSG_USE_SKILL_TAG + "-" + player.stop_x + "-"
                                        + player.stop_y + "-" + player.getTag() + "-" + randomSkill_index
                                        + "-" + needLostStrength + "-" + landLevel
                             var event = new cc.EventCustom(config.eventCustom.MSG_USE_SKILL)
                             event.setUserData(msg)
                             cc.eventManager.dispatchEvent(event)
                             return;
                         }

                     }
                 }

                var randNumber = ((Math.random() * 6 + 1) | 0)
                RouteNavigation.getPath(player,randNumber,GameBaseLayer.arrCanPassGrid,GameBaseLayer.tiledRowsCount,GameBaseLayer.tiledColsCount);
                player.startGo(RouteNavigation.arrPathRows, RouteNavigation.arrPathCols);
                return;
            }
        }

        this.oneRoundDone = true
        this.resetPlayerGoTurn()
    },
    aroundLandEvent: function () {
        var playerEnd_X = this.arrCol[this.stepsCount]*32;
        var playerEnd_Y = this.arrRow[this.stepsCount]*32 + 32;
        // up
        this.positionAroundEnd[0][0] = playerEnd_X;
        this.positionAroundEnd[0][1] = playerEnd_Y + 32;

        // down
        this.positionAroundEnd[1][0] = playerEnd_X;
        this.positionAroundEnd[1][1] = playerEnd_Y - 32;

        // left
        this.positionAroundEnd[2][0] = playerEnd_X - 32;
        this.positionAroundEnd[2][1] = playerEnd_Y;

        // right
        this.positionAroundEnd[3][0] = playerEnd_X + 32;
        this.positionAroundEnd[3][1] = playerEnd_Y;

        for (var i = 0; i < 4; i++) {
            var ptMap = GL2map(cc.p(this.positionAroundEnd[i][0], this.positionAroundEnd[i][1]), GameBaseLayer.map)
            var titleId = GameBaseLayer.landLayer.getTileGIDAt(ptMap);

            var x = ptMap.x;
            var y = ptMap.y;
            this._richerPlayer.stop_x = x;
            this._richerPlayer.stop_y = y;
            if (titleId === GameBaseLayer.blank_land_tiledID) {
                var event = new cc.EventCustom(config.eventCustom.MSG_BUY)
                var data =  config.eventTag.MSG_BUY_BLANK_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                event.setUserData(data)
                cc.eventManager.dispatchEvent(event)
                break
            }
            if (titleId === GameBaseLayer.player1_building_1_tiledID) {
                if (this._richerPlayer.getTag() === config.PLAYER_1_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_BUY)
                    var data =  config.eventTag.MSG_BUY_LAND_1_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_1_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
            if (titleId === GameBaseLayer.player1_building_2_tiledID) {
                if (this._richerPlayer.getTag() === config.PLAYER_1_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_BUY)
                    var data =  config.eventTag.MSG_BUY_LAND_2_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_2_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
            if (titleId === GameBaseLayer.player1_building_3_tiledID) {
                if (this._richerPlayer.getTag() !== config.PLAYER_1_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_3_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                    event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
            if (titleId === GameBaseLayer.player2_building_1_tiledID) {
                if (this._richerPlayer.getTag() === config.PLAYER_2_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_BUY)
                    var data =  config.eventTag.MSG_BUY_LAND_1_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_1_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
            if (titleId === GameBaseLayer.player2_building_2_tiledID) {
                if (this._richerPlayer.getTag() === config.PLAYER_2_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_BUY)
                    var data =  config.eventTag.MSG_BUY_LAND_2_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_2_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
            if (titleId === GameBaseLayer.player2_building_3_tiledID) {
                if (this._richerPlayer.getTag() !== config.PLAYER_2_TAG) {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PAY_TOLLS)
                    var data =  config.eventTag.MSG_PAY_TOLLS_3_TAG + "-" + x + "-" + y + "-" + this._richerPlayer.getTag()
                    event.setUserData(data)
                    cc.eventManager.dispatchEvent(event)
                } else {
                    var event = new cc.EventCustom(config.eventCustom.MSG_PICKONE_TOGO)
                    event.setUserData(String(config.eventTag.MSG_PICKONE_TOGO_TAG))
                    cc.eventManager.dispatchEvent(event)
                }
                break
            }
        }
    },
    handlePropEvent: function() {
        this.oneRoundDone =false;
        var playerEnd_X = this.arrCol[this.stepsCount]*32;
        var playerEnd_Y = this.arrRow[this.stepsCount]*32 + 32;
        var pointInMap = GL2map(cc.p(playerEnd_X,playerEnd_Y), GameBaseLayer.map)
        var endId = GameBaseLayer.wayLayer.getTileGIDAt(pointInMap)
        if (endId === GameBaseLayer.randomEvent_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_RANDOM_ASK_EVENT)
            var data =  config.eventTag.MSG_RANDOM_ASK_EVENT_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        if (endId === GameBaseLayer.strength_30_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_STRENGTH_UP)
            var data =  config.eventTag.MSG_STRENGTH_UP30_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        if (endId === GameBaseLayer.strength_50_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_STRENGTH_UP)
            var data =  config.eventTag.MSG_STRENGTH_UP50_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        if (endId === GameBaseLayer.strength_80_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_STRENGTH_UP)
            var data =  config.eventTag.MSG_STRENGTH_UP80_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        if (endId === GameBaseLayer.lottery_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_LOTTERY)
            var data =  config.eventTag.MSG_LOTTERY_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        if (endId === GameBaseLayer.stock_tiledID) {
            var event = new cc.EventCustom(config.eventCustom.MSG_STOCK)
            var data =  config.eventTag.MSG_STOCK_TAG + "-" + pointInMap.x + "-" + pointInMap.y + "-" + this._richerPlayer.getTag()
            event.setUserData(data)
            cc.eventManager.dispatchEvent(event)
            return
        }
        this.aroundLandEvent()
    },
    resetPlayerGoTurn: function() {
        for (var i = 0; i < GameBaseLayer.arrPlayers.length; i++) {
            var player = GameBaseLayer.arrPlayers[i]
            player.isMyTurn = true

            player.restTimes--
            if (player.restTimes < 0) {
                player.restTimes = 0
            }
        }
        var event = new cc.EventCustom(config.eventCustom.MSG_ROUND_COUNT)
        event.setUserData(String(config.eventTag.MSG_ROUND_COUNT_TAG))
        cc.eventManager.dispatchEvent(event)
        this.pickOnePlayerToGo()
    }
})

RicherGameController.instance = null

RicherGameController.getInstance = function () {
    if (!RicherGameController.instance) {
        RicherGameController.instance = new RicherGameController()
    }
    return RicherGameController.instance
}

RicherGameController.playerGoTotalTime = 0.28
RicherGameController.playerGoPerFrameTime = 0.07
