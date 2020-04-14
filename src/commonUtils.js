var getText = function(key) {
    var url = cc.sys.language === "en" ? res.enStringList : res.zhStringList
    cc.loader.loadTxt(url, function(err, txt){})
    var data = cc.loader.getRes(url)
    return data[key]
}

var playEffect = function(filePath, loop) {
    if(cc.sys.localStorage.getItem("music_on") !== "NO")
    {
        cc.audioEngine.playEffect(filePath, loop)
    }
}

var playEffectRandomly = function(arrFilePath, loop) {
    if(cc.sys.localStorage.getItem("music_on") !== "NO")
    {
        var index = ((Math.random() * arrFilePath.length) | 0)
        cc.audioEngine.playEffect(arrFilePath[index], loop)
    }
}

var map2GL = function(ptMap, map) {
    var ptUI = {x: 0, y: 0};
    ptUI.x = ptMap.x * map.getTileSize().width;
    ptUI.y = (ptMap.y + 1)* map.getTileSize().height;

    var ptGL = ptUI;
    ptGL.y = map.getContentSize().height - ptUI.y;
    return ptGL;
}

var GL2map = function(ptGL, map) {
    var ptUI = ptGL
    ptUI.y = map.getContentSize().height - ptGL.y;

    var x = ptUI.x / map.getTileSize().width;
    var y = ptUI.y / map.getTileSize().height;
    return cc.p(x, y);
}