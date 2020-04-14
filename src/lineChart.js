var LineChart = cc.LayerColor.extend({

    richerPlayer: null,
    selectedTag: -1,
    tableView: null,
    drawNode: null,
    arrStockPoint1: [],
    arrStockPoint2: [],
    arrStockPoint3: [],
    arrStockPoint4: [],
    arrStockPoint5: [],
    arrStock: [],
    playerStockMap: [],
    lblPlayerMoney: null,
    leftArrow: null,
    rightArrow: null,
    arrPoint: [],
    maxValue1: null,
    spaceRatio: 0,
    leftRatioX: 0,
    layerHeight1: 0,
    moveTag: -1,

    ctor: function() {
        this._super()
        this.init(cc.color(0, 0, 0, 255))

    },
    initChart: function(player, arrStockPoint1, arrStockPoint2, arrStockPoint3, arrStockPoint4, arrStockPoint5) {
        this.arrStockPoint1 = arrStockPoint1
        this.arrStockPoint2 = arrStockPoint2
        this.arrStockPoint3 = arrStockPoint3
        this.arrStockPoint4 = arrStockPoint4
        this.arrStockPoint5 = arrStockPoint5

        this.richerPlayer = player
        this.playerStockMap = player.stockMap
        this.initStockVector(this.playerStockMap)
        this.drawNode = new cc.DrawNode()
        this.addChild(this.drawNode)

        this.tableView = new cc.TableView(this, cc.size(650, 160));
        this.tableView.setPosition(10, cc.winSize.height * 1 / 2)
        this.tableView.setDelegate(this);
        this.addChild(this.tableView);
        this.tableView.reloadData();

        this.initMenu()

        this.selectedTag = 0

        var tableY = cc.winSize.height * 1 / 2
        this.leftArrow.setPosition(600 + this.leftArrow.width, tableY + this.selectedTag * 32)
        this.rightArrow.setPosition(10, tableY + this.selectedTag * 32)

        this.setData(this.getStockPoint(this.selectedTag))
        this.drawPic()

        return true
    },
    drawPic: function() {
        this.drawNode.clear()
        var maxValue = this.getMaxValue(this.arrPoint)
        var maxValue2 = (((maxValue + 100) / 100) * 100) | 0
        this.maxValue1 = (maxValue2 / 10) | 0
        this.spaceRatio = 0.08
        this.leftRatioX = 0.1

        var fontSize = 20
        var fontName = "Thonburi"
        var layerSize = cc.size(cc.winSize.width, cc.winSize.height * 1 / 2)

        this.layerHeight1 = 30
        var layerHeight = this.layerHeight1
        var layerWidth = layerSize.width
        var count = layerSize.width / 50

        for (var i = 0; i < 11; i++) {
            var bPoint = cc.p(layerWidth * this.leftRatioX, layerHeight)
            var ePoint = cc.p(layerWidth * this.leftRatioX + (count - 2) * 50, layerHeight)

            var label = new cc.LabelTTF(String(this.maxValue1 * i), fontName, fontSize)
            label.setPosition(cc.p(layerWidth * 0.05, layerHeight))
            label.setTag(100 + i)
            this.addChild(label)
            this.drawNode.drawSegment(bPoint, ePoint, 0.5, cc.color(100, 100, 200, 200))
            layerHeight += layerSize.height * this.spaceRatio
        }

        var layer_wd = layerSize.width * this.leftRatioX;
        for (var i = 0; i < count; i++) {
            var bPoint = cc.p(layer_wd, this.layerHeight1);
            var ePoint = cc.p(layer_wd, layerSize.height * this.spaceRatio * 10 + this.layerHeight1);
            if(i % 2 === 0)
            {
                this.drawNode.drawSegment(bPoint, ePoint, 0.5, cc.color(100, 100, 200, 200));
            }

            var labelX = new cc.LabelTTF(String(i), "Thonburi", 20);
            labelX.setPosition(cc.p(ePoint.x, 0));
            labelX.setAnchorPoint(cc.p(0,0));
            labelX.setTag(100 + 11 + i);
            this.addChild(labelX);
            layer_wd += 50;
        }

        this.drawLine(this.arrPoint, cc.color(0, 255, 255, 255), cc.color(255, 0, 255, 255));
    },
    drawLine: function(arrPoint, lineColor, dotColor) {
        var layerSize = cc.size(cc.winSize.width,cc.winSize.height * 1 /2);
        var layerWidth = layerSize.width;
        var tempWidth = layerSize.height * spaceRatio;
        var tempWidth2 = 0;
        var tempHeight1 = this.maxValue1
        var ratio = tempWidth/tempHeight1

        var beforPoint = arrPoint[0]
        var currentPoint
        for (var j = 1; j < arrPoint.length; j++) {
            var bPoint = beforPoint
            bPoint = cc.p(bPoint.x + layerWidth * this.leftRatioX,
                bPoint.y * ratio + this.layerHeight1 + tempWidth2)

            currentPoint = arrPoint[j]
            var ePoint = currentPoint
            ePoint = cc.p(ePoint.x + layerWidth * this.leftRatioX,
                    ePoint.y * ratio + this.layerHeight1 + tempWidth2)
            this.drawNode.drawSegment(bPoint, ePoint, 0.8, cc.color.RED)
            beforPoint = currentPoint
        }

        beforPoint = arrPoint[0]
        this.drawNode.setDrawColor(dotColor.r, dotColor.g, dotColor.b, dotColor.a)
        var bPoint = beforPoint
        bPoint = cc.p(bPoint.x + layerWidth * this.leftRatioX, bPoint.y * ratio + this.layerHeight1 + tempWidth2)
        this.drawNode.drawDot(bPoint, 5, cc.color.YELLOW)

        for (var i = 1; i < arrPoint.length; i++) {
            currentPoint = arrPoint[i]
            var ePoint = currentPoint
            ePoint = cc.p(ePoint.x + layerWidth * this.leftRatioX,
                ePoint.y * ratio + this.layerHeight1 + tempWidth2)
            this.drawNode.drawDot(ePoint, 5, cc.color.YELLOW)
        }

    },
    getMaxValue: function(arrPoint) {
        var maxY = 1
        for (var i = 0; i < arrPoint.length; i++) {
            var num = arrPoint[i].y
            if (maxY < Math.abs(num)){
                maxY = Math.abs(num)
            }
        }
        return maxY
    },
    getStockFromMap: function(key, stockMap) {
        var stock = null
        for (var i = 0; i < stockMap.length; i++)
        {
            if (stockMap[i].key === key) {
                stock = stockMap[i].stock
                break
            }
        }
        return stock
    },
    initStockVector: function(stockMap) {
        this.arrStock = []

        var percent = 0
        var size = this.arrStockPoint1.length
        if (size > 1) {
            percent = (this.arrStockPoint1[size - 1] - this.arrStockPoint1[size - 2]) / this.arrStockPoint1[size - 2] * 100
        }
        var stock = this.getStockFromMap(0, stockMap)
        this.arrStock.push(new Stock(800100, getText("rich_technology"), this.arrStockPoint1[size - 1],
                            stock.makedealprice, percent, stock.storeNumber))

        percent = 0
        size = this.arrStockPoint2.length
        if (size > 1) {
            percent = (this.arrStockPoint2[size - 1] - this.arrStockPoint2[size - 2]) / this.arrStockPoint2[size - 2] * 100
        }
        stock = this.getStockFromMap(1, stockMap)
        this.arrStock.push(new Stock(800200, getText("rich_oil"), this.arrStockPoint2[size - 1],
            stock.makedealprice, percent, stock.storeNumber))

        percent = 0
        size = this.arrStockPoint3.length
        if (size > 1) {
            percent = (this.arrStockPoint3[size - 1] - this.arrStockPoint3[size - 2]) / this.arrStockPoint3[size - 2] * 100
        }
        stock = this.getStockFromMap(2, stockMap)
        this.arrStock.push(new Stock(800300, getText("icbc"), this.arrStockPoint3[size - 1],
            stock.makedealprice, percent, stock.storeNumber))

        percent = 0
        size = this.arrStockPoint4.length
        if (size > 1) {
            percent = (this.arrStockPoint4[size - 1] - this.arrStockPoint4[size - 2]) / this.arrStockPoint4[size - 2] * 100
        }
        stock = this.getStockFromMap(3, stockMap)
        this.arrStock.push(new Stock(800400, getText("huatuo_medicine"), this.arrStockPoint4[size - 1],
            stock.makedealprice, percent, stock.storeNumber))

        percent = 0
        size = this.arrStockPoint5.length
        if (size > 1) {
            percent = (this.arrStockPoint5[size - 1] - this.arrStockPoint5[size - 2]) / this.arrStockPoint5[size - 2] * 100
        }
        stock = this.getStockFromMap(4, stockMap)
        this.arrStock.push(new Stock(800500, getText("demolition_construction"), this.arrStockPoint5[size - 1],
            stock.makedealprice, percent, stock.storeNumber))

        var code = new cc.LabelTTF(getText("stock_code"), "Arial", 20)
        code.setPosition(cc.p(20, 410))
        code.setAnchorPoint(cc.p(0, 0))
        this.addChild(code)

        var name = new cc.LabelTTF(getText("stock_name"), "Arial", 20)
        name.setPosition(cc.p(LineChart.stockCellWidth + 20, 410))
        name.setAnchorPoint(cc.p(0, 0))
        this.addChild(name)

        var nowPrice = new cc.LabelTTF(getText("stock_nowprice"), "Arial", 20)
        nowPrice.setPosition(cc.p(LineChart.stockCellWidth * 2 + 20, 410))
        nowPrice.setAnchorPoint(cc.p(0, 0))
        this.addChild(nowPrice)

        var dealPrice = new cc.LabelTTF(getText("stock_dealprice"), "Arial", 20)
        dealPrice.setPosition(cc.p(LineChart.stockCellWidth * 3 + 20, 410))
        dealPrice.setAnchorPoint(cc.p(0, 0))
        this.addChild(dealPrice)

        var stockPercent = new cc.LabelTTF(getText("stock_percent"), "Arial", 20)
        stockPercent.setPosition(cc.p(LineChart.stockCellWidth * 4 + 20, 410))
        stockPercent.setAnchorPoint(cc.p(0, 0))
        this.addChild(stockPercent)

        var store = new cc.LabelTTF(getText("stock_store"), "Arial", 20)
        store.setPosition(cc.p(540, 410))
        store.setAnchorPoint(cc.p(0, 0))
        this.addChild(store)

        var text = getText("player_money") + " " + this.richerPlayer.money
        this.lblPlayerMoney = new cc.LabelTTF(text, "Arial", 20)
        this.lblPlayerMoney.setPosition(cc.p(20, 450 ));
        this.lblPlayerMoney.setAnchorPoint(cc.p(0,0));
        this.addChild(this.lblPlayerMoney);
    },
    initMenu: function() {
        this.menu = new cc.Menu()
        this.menu.setPosition(cc.p(0,0))

        var buyMenuItem = new cc.MenuItemImage(res.buyNormal_png, res.buyPressed_png, this.buttonCallback, this);
        buyMenuItem.setPosition(cc.p(700, cc.winSize.height - 110))
        buyMenuItem.setAnchorPoint(cc.p(0,0))
        buyMenuItem.setTag(LineChart.buyButton)
        this.menu.addChild(buyMenuItem)

        var sellMenuItem = new cc.MenuItemImage(res.sellNormal_png, res.sellPressed_png, this.buttonCallback, this);
        sellMenuItem.setPosition(cc.p(700, cc.winSize.height - 180))
        sellMenuItem.setAnchorPoint(cc.p(0,0))
        sellMenuItem.setTag(LineChart.sellButton)
        this.menu.addChild(sellMenuItem)

        var backMenuItem = new cc.MenuItemImage(res.backNormal_png, res.backPressed_png, this.buttonCallback, this);
        backMenuItem.setPosition(cc.p(700, cc.winSize.height - 250))
        backMenuItem.setAnchorPoint(cc.p(0,0))
        backMenuItem.setTag(LineChart.backButton)
        this.menu.addChild(backMenuItem)

        this.leftArrow = new cc.Sprite(res.arrowLeft_png)
        this.leftArrow.setPosition(cc.p(-500, -500))
        this.leftArrow.setAnchorPoint(cc.p(0,0))
        this.addChild(this.leftArrow)

        this.rightArrow = new cc.Sprite(res.arrowRight_png)
        this.rightArrow.setPosition(cc.p(-500, -500))
        this.rightArrow.setAnchorPoint(cc.p(0,0))
        this.addChild(this.rightArrow)

    },
    buttonCallback: function(sender) {
        var tag = sender.getTag()
        switch (tag) {
            case LineChart.buyButton:
            {
                var diffMoney = this.richerPlayer.money - this.arrStock[this.selectedTag].nowPrice * 100
                if (diffMoney >= 0) {
                    var s = this.playerStockMap[this.selectedTag]
                    var storeNumber = s.storeNumber + 100;

                    var dealPrice = (s.makedealprice * s.storeNumber + this.arrStock[this.selectedTag].nowPrice * 100) / (100 + s.storeNumber);
                    s.storeNumber += 100
                    s.makedealprice = dealPrice

                    this.arrStock[this.selectedTag].storeNumber = storeNumber
                    var arrCellCard = this.tableView.cellAtIndex(this.selectedTag).getChildren()

                    var sdStore = arrCellCard[arrCellCard.length - 1]
                    sdStore.labelInfo.setString(String(storeNumber))

                    var sdDealPrice = arrCellCard[arrCellCard.length - 3]
                    sdDealPrice.labelInfo.setString(String(dealPrice))

                    this.richerPlayer.money = diffMoney
                    this.lblPlayerMoney.setString(getText("player_money") + " " + diffMoney)
                } else {
                    var toast = new ToastLayer(getText("no_money_buy_stock"), 2.0, cc.p(cc.winSize.width / 2, cc.winSize.height / 2), null)
                    this.addChild(toast)
                }
                break
            }
            case LineChart.sellButton:
            {
                var s = this.playerStockMap[this.selectedTag]
                var storeNumber = s.storeNumber
                if(storeNumber > 0)
                {
                    var arrCellCard = this.tableView.cellAtIndex(this.selectedTag).getChildren()

                    var sdStore = arrCellCard[arrCellCard.length - 1]
                    sdStore.labelInfo.setString(String(0))

                    var sdDealPrice = arrCellCard[arrCellCard.length - 3]
                    sdDealPrice.labelInfo.setString(String(0))

                    this.richerPlayer.money += storeNumber * this.arrStock[this.selectedTag].nowPrice
                    s.makedealprice = 0
                    s.storeNumber = 0
                    this.lblPlayerMoney.setString(getText("player_money") + " " + this.richerPlayer.money)
                }
                break
            }
            case LineChart.backButton:
            {
                if (this.moveTag === config.moveTag.GOEND){
                    var event = new cc.EventCustom(config.eventCustom.MSG_AROUND_LAND)
                    event.setUserData(String(config.eventTag.MSG_AROUND_LAND_TAG))
                    cc.eventManager.dispatchEvent(event)
                } else if (this.moveTag === config.moveTag.MOVEPASS){
                    var event = new cc.EventCustom(config.eventCustom.MSG_MOVE_ONE_STEP)
                    event.setUserData(String(config.eventTag.MSG_MOVE_ONE_STEP_TAG))
                    cc.eventManager.dispatchEvent(event)
                }
                this.removeFromParent()
                var event = new cc.EventCustom(config.eventCustom.MSG_STOCK_LAYER_DISMISS)
                event.setUserData(String(config.eventTag.MSG_STOCK_LAYER_DISMISS_TAG))
                cc.eventManager.dispatchEvent(event)
                break
            }
        }
    },
    getStockPoint: function(id) {
        switch (id) {
            case 0:
            {
                return this.arrStockPoint1
                break
            }
            case 1:
            {
                return this.arrStockPoint2
                break
            }
            case 2:
            {
                return this.arrStockPoint3
                break
            }
            case 3:
            {
                return this.arrStockPoint4
                break
            }
            case 4:
            {
                return this.arrStockPoint5
                break
            }
        }

        return this.arrStockPoint1
    },
    tableCellTouched:function (table, cell) {
        for (var i = 0; i < 30; i++) {
            this.removeChildByTag(100 + i)
        }

        var tag = cell.getTag()
        this.selectedTag = tag

        var height = cc.winSize.height;
        var tableY = cc.winSize.height * 1/2;
        this.leftArrow.setPosition(600 + this.leftArrow.width, tableY + tag * 32);
        this.rightArrow.setPosition(10,tableY + tag * 32);
        this.setData(this.getStockPoint(tag));
        this.drawPic();
    },
    cellSizeForTable: function(table) {
        return cc.size(100, 32)
    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(100, 32);
    },
    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell()

        var colorTag
        if (this.arrStock[idx].percent > 0)
        {
            colorTag = 1
        } else {
            colorTag = -1
        }

        if (!cell) {
            cell = new cc.TableViewCell()
            cell.setTag(idx)

            for (var i = 0; i < 6; i++)
            {
                switch (i) {
                    case 0: {
                        var card = new StockCellCard(String(this.arrStock[idx].stockCode),
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                    case 1: {
                        var card = new StockCellCard(String(this.arrStock[idx].stockName),
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                    case 2: {
                        var card = new StockCellCard(String(this.arrStock[idx].nowPrice),
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                    case 3: {
                        var card = new StockCellCard(String(this.arrStock[idx].makedealprice),
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                    case 4: {
                        var text = String(this.arrStock[idx].percent | 0)
                        text = text + "%"
                        var card = new StockCellCard(text,
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                    case 5: {
                        var card = new StockCellCard(String(this.arrStock[idx].storeNumber),
                            LineChart.stockCellWidth, LineChart.stockCellHeight,
                            LineChart.stockCellWidth * i + 10, 0, colorTag)
                        cell.addChild(card)
                        break
                    }
                }
            }
        }
        return cell
    },
    setData: function(data) {
        this.arrPoint = []
        for (var i = 0; i < data.length; i++) {
            this.arrPoint.push(cc.p(50 * (i + 1), data[i]))
        }
    }

})

LineChart.stockCellWidth = 100
LineChart.stockCellHeight = 30
LineChart.buyButton = 801
LineChart.sellButton = 802
LineChart.backButton = 803