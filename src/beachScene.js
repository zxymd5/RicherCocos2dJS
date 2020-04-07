var BeachLayer = GameBaseLayer.extend({
    ctor: function () {
        this._super()

        this.initGameController()
        this.addMap()
        this.initLayer()
        this.initTiledGrid()
        this.initPropTiledID()
        this.calWayPassToGrid()
        this.addRightBanner()
        this.drawTable(2)
        this.addPathMark()
        this.addPlayer()
        this.addGoButton()
        this.registerEvent()
        this.addDigiteRoundSprite()
        this.refreshRoundDisplay()
        this.initItemSprite()
        // this.initPopDialog()
        this.registerBlockWaySchedule()
        this.initPopPublishLottery()
        this.initAudioEffect()

    },
    addMap: function() {
        GameBaseLayer.map = new cc.TMXTiledMap(res.beach_tmx)
        this.addChild(GameBaseLayer.map)
    },
    initPropTiledID: function() {
        GameBaseLayer.blank_land_tiledID   = 1;
        GameBaseLayer.strength_30_tiledID  = 4;
        GameBaseLayer.strength_50_tiledID  = 5;
        GameBaseLayer.strength_80_tiledID  = 6;

        GameBaseLayer.randomEvent_tiledID  = 7;
        GameBaseLayer.lottery_tiledID      = 8;
        GameBaseLayer.stock_tiledID        = 9;

        GameBaseLayer.player2_building_1_tiledID = 10;
        GameBaseLayer.player2_building_2_tiledID = 11;
        GameBaseLayer.player2_building_3_tiledID = 12;

        GameBaseLayer.player1_building_1_tiledID = 13;
        GameBaseLayer.player1_building_2_tiledID = 14;
        GameBaseLayer.player1_building_3_tiledID = 15;

        this.map_level = 1;
        this.saveJsonName = "beach_save.json";
    }
})

var BeachScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var layer = new BeachLayer()
        this.addChild(layer)
    }
});