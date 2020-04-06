var CustomizedPopupLayer = cc.Layer.extend({

    menu: null,
    contentPadding: 0,
    contentPaddingTop: 0,
    callbackListener: null,
    callback: null,
    background: null,
    backgroundScale9: null,
    lblContent: null,
    lblTitle: null,
    popType: null,
    arrLotteryCard: [],
    arrSelectedNumber: [],
    turnBg: null,
    awardLayer: null,
    arrPlayers: [],
    elliRtt1: null,
    elliRtt2: null,
    circle1: null,
    circle2: null,
    lottNumber: 0,
    lotterySelected: 0,

    ctor: function () {
        this._super()

        this.setContentSize(cc.size(0, 0))
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });
        cc.eventManager.addListener(touchListener, this);

    },
    addBackground: function(backgroundImage) {
        this.background = new cc.Sprite(backgroundImage)
        // this.background.setScale(this.width / background.width, this.height / background.height)
        // background.setPosition(this.width / 2, this.height / 2)
        // this.addChild(background)

        this.backgroundScale9 = new cc.Scale9Sprite(backgroundImage)
        // backgroundScale9.setScale(this.width / backgroundScale9.width, this.height / backgroundScale9.height)
        // backgroundScale9.setPosition(this.width / 2, this.height / 2)
        // this.addChild(backgroundScale9)
    },


    addTitle: function(title, fontSize) {
        this.lblTitle = new cc.LabelTTF(title, "", fontSize)
        this.lblTitle.setFontFillColor(cc.color.BLACK)
        // this.addChild(this.lblTitle)
    },
    addContent: function(text, fontSize, padding, paddingTop)
    {
        this.lblContent = new cc.LabelTTF(text, "", fontSize)
        this.contentPadding = padding
        this.contentPaddingTop = paddingTop
    },
    addLotteryContext: function(size){
      var center = {
          width: (cc.winSize.width - size.width) / 2,
          height: (cc.winSize.height - size.height) / 2
      }
      for (var row = 0; row < 10; row++) {
          for (var col = 0; col < 3; col++) {
              var card = new LotteryCard()
              card.cardInit((row + 1) + col * 10, 40, 40, center.width + 20 + row * (size.width / 11), (cc.winSize.height / 2 + 30) - 40 * col)
              card.setTag(row + 1 + col * 10)
              card.callback = cc.callFunc(this.refreshBallBackGround, this)
              this.addChild(card)
              this.arrLotteryCard.push(card)

              for (var i = 0; i < this.arrSelectedNumber.length; i++) {
                  if (this.arrSelectedNumber[i] === (row + 1) + col * 10) {
                      card.setVisible(false)
                  }
              }
          }
      }
    },
    addPublishLotteryContext: function(size) {
        this.turnBg = new cc.Sprite(res.turnBg_png)
        this.turnBg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
        this.addChild(this.turnBg)

        var arrow = new cc.Sprite(res.turnArrow_png)
        arrow.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.557))
        arrow.setScale(0.5)
        this.addChild(arrow)

        this.awardLayer = new cc.LayerColor(cc.color(0, 0, 0, 100))
        this.awardLayer.setPosition(cc.p(0, 0))
        this.awardLayer.setTag(100)
        this.addChild(this.awardLayer, 10)
        this.awardLayer.setVisible(false)
        this.addPlayersInfo(size)
    },
    onTurnEnd: function() {
        this.elliRtt1.removeFromParent(true)
        this.elliRtt2.removeFromParent(true)
        this.circle1.removeFromParent(true)
        this.circle2.removeFromParent(true)

        this.scheduleOnce(this.dismissFromParent, 4.0)

        for (var i = 0; i < this.arrPlayers.length; i++) {
            var player = this.arrPlayers[i]
            for (var j = 0; j < player.arrLottery.length; j++) {
                if (player.arrLottery[i] === this.lottNumber) {
                    player.money = player.money + config.LOTTERY_WIN_MONEY
                    this.getChildByTag(100).setVisible(true)
                    var pngDisplay = player.getTag() === config.PLAYER_1_TAG ? res.lotteryP1_png : res.lotteryP2_png
                    var award = new cc.Sprite(pngDisplay)
                    award.setAnchorPoint(cc.p(0.5, 0))
                    award.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
                    this.awardLayer.addChild(award)

                    var move = cc.moveBy(2, cc.p(0, -this.getPositionX() * 2))
                    var bounce = move.clone().easing(cc.easeBounceOut())
                    award.runAction(cc.sequence(bounce, cc.callFunc(function(target, data) {
                        data[0].removeFromParent(true)
                        target.getChildByTag(100).setVisible(false)
                    }, this, [award])))
                }
            }
            player.arrLottery = []
        }
        playEffect(soundRes.p1_meirendejiang_wav, false)
    },
    dismissFromParent: function(dt) {
        this.turnBg.runAction(cc.rotateBy(0, -(30 - this.lottNumber + 1) * 12))
        var event = new cc.EventCustom(config.eventCustom.MSG_DIMISS_DIALOG)
        event.setUserData(String(config.eventTag.MSG_DIMISS_DIALOG_PUBLISH_LOTTERY_TAG))
        cc.eventManager.dispatchEvent(event)
        this.setVisible(false)
    },
    addPlayersInfo: function(size) {
        var center = {
            width: (cc.winSize.width - size.width) / 2,
            height: (cc.winSize.height - size.height) / 2
        }
        var j = 0
        for (var i = 0; i < this.arrPlayers.length; i++)
        {
            var player = this.arrPlayers[i]
            var tag = player.getTag()
            var playerLogo
            switch (tag) {
                case config.PLAYER_1_TAG:
                {
                    playerLogo = res.player1_png
                    break;
                }
                case config.PLAYER_2_TAG:
                {
                    playerLogo = res.player2_png
                    break;
                }
            }
            var playerSprite = new cc.Sprite(playerLogo)
            playerSprite.setPosition(center.width + 20, (cc.winSize.height / 2 + 50) + j * 50)
            playerSprite.setScale(0.8)
            this.addChild(playerSprite)
            j++
        }
        
    },
    refreshBallBackGround: function (node) {
        var nodeTag = node.getTag()
        for (var i = 0; i < this.arrLottery.length; i++) {
            var lotteryCardTag = this.arrLottery[i].getTag()

            if (nodeTag !== lotteryCardTag) {
                node.unselected()
            }
        }
        this.lotterySelected = nodeTag
        arrMenuItem = this.menu.getChildren()
        for (var i = 0; i< arrMenuItem.length; i++) {
            if (arrMenuItem[i].getTag() !== 0) {
                arrMenuItem[i].setTag(nodeTag)
                break;
            }
        }
    },
    onEnter: function () {
        this._super()
        var center = cc.p(cc.winSize.width / 2, cc.winSize.height / 2)
        var contentSize
        if (cc.sizeEqualToSize(this.getContentSize(), cc.size(0, 0))) {
            this.background.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
            this.addChild(this.background, 0, 0)
            contentSize = this.background.getTexture().getContentSize()
        } else {

        }
    }

})