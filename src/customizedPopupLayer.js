var CustomizedPopupLayer = cc.Layer.extend({

    menu: null,
    contentPadding: 0,
    contentPaddingTop: 0,
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
    arrPlayerLottery: [],
    touchListener: null,

    ctor: function () {
        this._super()

        this.setContentSize(cc.SizeZero)
        this.menu = new cc.Menu()
        this.menu.setPosition(cc.POINT_ZERO)
        this.touchListener = cc.EventListener.create({
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
        // cc.eventManager.addListener(this.touchListener, this);

    },
    setVisible: function(visible) {
      this._super()
      if (visible) {
          cc.eventManager.addListener(this.touchListener, this);
      }else {
          cc.eventManager.removeListener(this.touchListener);
      }
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
    addButton: function(normalImg, selectedImg, title, tag) {
        var center = cc.p(cc.winSize.width / 2, cc.winSize.height / 2)
        var item = new cc.MenuItemImage(normalImg, selectedImg, this.buttonCallback, this)
        item.setTag(tag)
        item.setPosition(center)

        var labelSize = item.getContentSize()
        var label = new cc.LabelTTF(title, "", 20)
        label.setColor(cc.color.BLACK)
        label.setPosition(cc.p(labelSize.width / 2, labelSize.height / 2))
        item.addChild(label)

        this.menu.addChild(item)
        this.addChild(this.menu)
    },
    buttonCallback: function(sender) {
        if (this.callback) {
            this.callback._function(sender)
        }
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
    setHasSelectedLotteryNumber: function(arrNum) {
        for (var i = 0; i < arrNum.length; i++) {
            this.arrSelectedNumber.push(arrNum[i])
        }
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
    addPlayersLottery: function() {
        for (var i = 1; i <= 30; i++) {
            if (this.getChildByTag(1000 + i)) {
                this.removeChildByTag(1000 + i)
            }
        }

        var size = this.getContentSize()
        var center = {
            width: (cc.winSize.width - size.width) / 2,
            height: (cc.winSize.height - size.height) / 2
        }

        for (var j = 0; j < this.arrPlayers.length; j++) {
            var player = this.arrPlayers[i]
            this.arrPlayerLottery = []
            for (var i = 0; i < player.arrLottery.length; i++) {
                var lblLotteryNumber = new cc.LabelTTF(String(player.arrLottery[i]), "", 15)
                lblLotteryNumber.setPosition(cc.p(center.width + 20 + (i + 1) * 20, cc.winSize.height / 2 + 30 + j * 50))
                lblLotteryNumber.setColor(cc.color(255, 100, 100))
                lblLotteryNumber.setTag(1000 + player.arrLottery[i])
                this.arrPlayerLottery.push(lblLotteryNumber)
                this.addChild(lblLotteryNumber)
            }
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
    runPublishAnmi: function() {
        playEffect(soundRes.mashangkaijiang_wav, false)
        this.scheduleOnce(this.realRunPublishAnmi, 3.0)
    },
    realRunPublishAnmi: function() {
        var lottNumber = (Math.random() * 30 + 1) | 0
        var angleRotate = (30 - lottNumber + 1) * 12 + 7200
        var rotateBy = cc.rotateBy(6, angleRotate)
        var action = rotateBy.clone().easing(cc.easeExponentialOut());
        this.turnBg.runAction(cc.sequence(action, cc.callFunc(this.onTurnEnd, this)))

        this.elliRtt1 = new cc.ParticleSystem(res.whiteBall_plist)
        this.addChild(this.elliRtt1)
        this.elliRtt2 = new cc.ParticleSystem(res.yellowBall_plist)
        this.addChild(this.elliRtt2)

        var config = {
            ellipseA: 100,
            ellipseB: 50,
            centerPos: this.turnBg.getPosition(),
            isAntiClockwise: true,
            startAngle: 0,
            selfAngle: 45
        }
        this.elliRtt1.runAction(new EllipseBy(2.5, config).repeatForever())

        var config2 = JSON.parse(JSON.stringify(config))
        config2.startAngle = 180
        config2.selfAngle = -45
        this.elliRtt2.runAction(new EllipseBy(2.5, config2).repeatForever())

        this.circle1 = new cc.ParticleSystem(res.bigCircle_plist)
        this.circle1.setPosition(this.turnBg.getPosition())
        this.addChild(this.circle1)
        this.circle1.runAction(cc.rotateBy(4, angleRotate))

        this.circle2 = new cc.ParticleSystem(res.smallCircle_plist)
        this.circle2.setPosition(this.turnBg.getPosition())
        this.addChild(this.circle2)
        this.circle2.runAction(cc.rotateBy(4, angleRotate))

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
            this.backgroundScale9.setContentSize(this.getContentSize())
            this.backgroundScale9.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
            this.addChild(this.backgroundScale9, 0, 0)
            contentSize = this.getContentSize()
        }

        this.addChild(this.menu)
        var btnWidth = contentSize.width / (this.menu.getChildrenCount() + 1)
        var arrChildren = this.menu.getChildren()

        for(var j = 0; j < arrChildren.length; ++j)
        {
            arrChildren[j].setPosition(cc.p(cc.winSize.width / 2 - contentSize.width / 2 + btnWidth * (j + 1),
                cc.winSize.height / 2 - contentSize.height / 3))
        }

        if (this.lblTitle)
        {
            var pos = {
                x: center.x,
                y: center.y + contentSize.height / 2 - 20
            }

            this.lblTitle.setPosition(pos);
            this.lblTitle.setColor(cc.color(0, 0, 0))
            this.addChild(this.lblTitle);
        }
        
        switch (this.popType) {
            case config.popType.LOTTERY:
            {
                this.addLotteryContext(contentSize)
                break
            }
            case config.popType.LOTTERY_PUBLISH:
            {
                this.addPublishLotteryContext(contentSize)
                break
            }
            default:
            {
                if (this.lblContent) {
                    this.lblContent.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
                    this.lblContent.setDimensions(cc.size(contentSize.width - this.contentPadding * 2,
                        contentSize.height - this.contentPaddingTop));
                    this.lblContent.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                    this.lblContent.setColor(cc.color(0,0,0));
                    this.addChild(this.lblContent)
                }
            }
        }

        var popAction = new cc.Sequence(cc.scaleTo(0, 0), cc.scaleTo(0.15, 1.05),
            cc.scaleTo(0.08, 0.95), cc.scaleTo(0.08, 1.0))

        this.runAction(popAction)
    },
    onExit: function () {
        this._super()
        cc.eventManager.removeListener(this.touchListener);
    }

})