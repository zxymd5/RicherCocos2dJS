var SkillCard = cc.Sprite.extend({

    layerColorBG: null,
    labelInfo: null,
    labelName: null,
    labelGrade: null,
    labelStrength: null,

    skillName: null,
    skillGrade: null,
    strength: null,
    info: null,
    callback: null,

    ctor: function(skillName, skillGrade, strength, info, width, height, x, y, tag, image) {
        this._super()
        this.cardInit(skillName, skillGrade, strength, info, width, height, x, y, tag, image)
    },
    cardInit: function(skillName, skillGrade, strength, info, width, height, x, y, tag, image) {
        this.skillName = skillName
        this.skillGrade = skillGrade
        this.strength = strength
        this.info = info

        this.layerColorBG = new cc.LayerColor(cc.color(100,120,90,255), width, height)
        this.layerColorBG.setPosition(cc.p(x, y))

        var skillImage = new cc.Sprite(image)
        skillImage.setPosition(0, this.layerColorBG.height)
        this.layerColorBG.addChild(skillImage)

        this.labelName = new cc.LabelTTF(skillName, "", 15);
        this.labelName.setColor(cc.color(200,200,200));
        this.labelName.setPosition(cc.p(this.layerColorBG.width/2 - this.labelName.width / 2,
                                this.layerColorBG.height - 5));
        this.labelName.setAnchorPoint(cc.p(0, 1))
        this.layerColorBG.addChild(this.labelName);

        this.labelGrade = new cc.LabelTTF(skillGrade, "", 15);
        this.labelGrade.setColor(cc.color(200,200,200));
        this.labelGrade.setPosition(cc.p(5, this.layerColorBG.height / 2));
        this.labelGrade.setAnchorPoint(cc.p(0, 0))
        this.layerColorBG.addChild(this.labelGrade);

        var checkItem = new cc.MenuItemImage(res.checkNormal_png, res.checkPressed_png, this.buttonCallback, this)
        checkItem.setTag(tag)
        checkItem.setPosition(cc.p(this.layerColorBG.width - checkItem.width, this.layerColorBG.height / 2))
        var menu = new cc.Menu()
        menu.setPosition(cc.p(0, 0))
        this.layerColorBG.addChild(menu)
        menu.addChild(checkItem)

        this.labelStrength = new cc.LabelTTF(strength, "", 15);
        this.labelStrength.setColor(cc.color(200,200,200));
        this.labelStrength.setPosition(cc.p(5, this.layerColorBG.height / 2 - 20));
        this.labelStrength.setAnchorPoint(cc.p(0,0));
        this.layerColorBG.addChild(this.labelStrength);
        
        if (!info) {
            this.labelInfo = new cc.LabelTTF(info, "", 15);
            this.labelInfo.setColor(cc.color(200,200,200));
            this.labelInfo.setPosition(cc.p(5, this.layerColorBG.height / 2 - 40));
            this.labelInfo.setAnchorPoint(cc.p(0,0));
            this.layerColorBG.addChild(this.labelInfo);
        }
        this.addChild(this.layerColorBG)
    },
    buttonCallback: function(sender)
    {
        if (this.callback) {
            this.callback._function(sender)
        }
    }

})