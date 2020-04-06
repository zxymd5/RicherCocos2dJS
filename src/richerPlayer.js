var RicherPlayer = cc.Sprite.extend({
    comeFromRow: -1,
    comeFromCol: -1,
    stop_x: -100,
    stop_y: 0,
    name: null,
    enemy: false,
    money: 0,
    strength: 0,
    isMyTurn: false,
    restTimes: 0,
    arrPlayerAnimLeft: [],
    arrPlayerAnimRight: [],
    arrPlayerAnimDown: [],
    arrPlayerAnimUp: [],
    left: null,
    right: null,
    down: null,
    up: null,
    arrSkillRain: [],
    arrSkillTransfer: [],
    rainSkill: null,
    transferSkill: null,
    arrSkill: [],
    arrLottery: [],

    ctor: function(name, tag, enemy, money, strength)
    {
        this._super()
        this.init(name, tag, enemy, money, strength)
    },
    // todo
    init: function(name, tag, enemy, money, strength)
    {
        this.setTag(tag)
        this.addPlayerAnimation()

        var spf = null
        switch (tag) {
            case config.PLAYER_1_TAG:{
                spf = cc.spriteFrameCache.getSpriteFrame("player1_anim_01.png")
                break;
            }
            case config.PLAYER_2_TAG:{
                spf = cc.spriteFrameCache.getSpriteFrame("player2_anim_02.png")
                break;
            }
            default:
                break;
        }
        this.setPlayerAnimate()
        this.initWithSpriteFrame(spf)
        this.name = name
        this.enemy = enemy
        this.money = money
        this.strength = strength
        this.isMyTurn = true
        this.restTimes = 0

        this.arrSkill.push([1, 1, 1])
        this.addSkillAnimation()
        return true
    },
    addPlayerAnimation: function() {
        var spriteFrameCache = cc.spriteFrameCache
        var tag = this.getTag()
        switch (tag) {
            case config.PLAYER_1_TAG:
            {
                spriteFrameCache.addSpriteFrames(res.player1Anim_plist, res.player1Anim_png)
                break;
            }
            case config.PLAYER_2_TAG:
            {
                spriteFrameCache.addSpriteFrames(res.player2Anim_plist, res.player2Anim_png)
                break;
            }
            default:
                break;
        }

        var name = null
        for (var i = 1; i <= 4; i++) {
            name = "player" + tag +"_anim_0" + i + ".png"
            this.arrPlayerAnimLeft.push(spriteFrameCache.getSpriteFrame(name))
        }
        for (var i = 5; i <= 8; i++) {
            name = "player" + tag +"_anim_0" + i + ".png"
            this.arrPlayerAnimRight.push(spriteFrameCache.getSpriteFrame(name))
        }
        for (var i = 9; i <= 12; i++) {
            if(i < 10) {
                name = "player" + tag +"_anim_0" + i + ".png"
            } else {
                name = "player" + tag +"_anim_" + i + ".png"
            }

            this.arrPlayerAnimDown.push(spriteFrameCache.getSpriteFrame(name))
        }
        for (var i = 13; i <= 16; i++) {
            name = "player" + tag +"_anim_" + i + ".png"
            this.arrPlayerAnimUp.push(spriteFrameCache.getSpriteFrame(name))
        }
    },
    setPlayerAnimate: function() {
        var tag = this.getTag()
        var left_animation = "left_animation_" + tag
        var right_animation = "right_animation_" + tag
        var down_animation = "down_animation_" + tag
        var up_animation = "up_animation_" + tag

        if(!cc.animationCache.getAnimation(left_animation))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrPlayerAnimLeft, 0.07),left_animation);
        }
        if(!cc.animationCache.getAnimation(right_animation))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrPlayerAnimRight, 0.07),right_animation);
        }
        if(!cc.animationCache.getAnimation(down_animation))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrPlayerAnimDown, 0.07),down_animation);
        }
        if(!cc.animationCache.getAnimation(up_animation))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrPlayerAnimUp, 0.07),up_animation);
        }

        this.left = cc.animate(cc.animationCache.getAnimation(left_animation))
        this.right = cc.animate(cc.animationCache.getAnimation(right_animation))
        this.down = cc.animate(cc.animationCache.getAnimation(down_animation))
        this.up = cc.animate(cc.animationCache.getAnimation(up_animation))
    },
    addSkillAnimation: function() {
        var spriteFrameCache = cc.spriteFrameCache
        spriteFrameCache.addSpriteFrames(res.rain_plist, res.rain_png)
        spriteFrameCache.addSpriteFrames(res.change_plist, res.change_png)

        var name
        for (var i=1; i<=19; i++)
        {
            if(i < 10)
            {
                name = "rain_0" + i + ".png"
            } else {
                name = "rain_" + i + ".png"
            }
            this.arrSkillRain.push(spriteFrameCache.getSpriteFrame(name))
        }

        for (var i=1; i<=32; i++)
        {
            if(i < 10)
            {
                name = "change_0" + i + ".png"
            } else {
                name = "change_" + i + ".png"
            }
            this.arrSkillTransfer.push(spriteFrameCache.getSpriteFrame(name))
        }

        if(!cc.animationCache.getAnimation("rain_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrSkillRain, 0.07),"rain_animation");
        }
        if(!cc.animationCache.getAnimation("transfer_animation"))
        {
            cc.animationCache.addAnimation(new cc.Animation(this.arrSkillTransfer, 0.07),"transfer_animation");
        }

        this.rainSkill = cc.animate(cc.animationCache.getAnimation("rain_animation"))
        this.transferSkill = cc.animate(cc.animationCache.getAnimation("transfer_animation"))
    },
    // todo
    startGo: function (arrRow, arrCol) {
        var fadeout = cc.fadeOut(0.2);
        var fadein = cc.fadeIn(0.2);
        GameBaseLayer.drawPathColor(arrRow, arrCol)
        this.isMyTurn = false
        this.runAction(
            cc.sequence(
                fadeout,
                fadein,
                cc.callFunc(function (target, data) {
                    RicherGameController.getInstance().startRealGo(data[0], data[1], target)
                }, this, [arrRow, arrCol])
            )
        )
    }
})