var EllipseBy = cc.ActionInterval.extend({

    config: null,

    ctor: function(dt, config) {
        this._super(dt)
        this.initWithDuration(dt, config)
    },
    initWithDuration: function(dt, config) {
        this._super(dt)
        this.config = config
    },
    clone: function () {
        var action = new EllipseBy(this._duration, config);
        this._cloneDecoration(action);
        return action;
    },
    reverse: function() {
        var config = JSON.parse(JSON.stringify(this.config))
        config.isAntiClockwise = !this.config.isAntiClockwise
        return new EllipseBy(this._duration, config)
    },
    getPosWithEllipse: function(t) {
        var angle = 2 * Math.PI * ((this.config.isAntiClockwise ? t : (1 - t)) + this.config.startAngle / 360)
        return cc.p(this.config.ellipseA * Math.cos(angle), this.config.ellipseB * Math.sin(angle))
    },
    update: function(time) {
        if (this._target) {
            var curPos = this.getPosWithEllipse(time)
            var tmpAngle = this.config.selfAngle / 180 * Math.PI
            var newX = curPos.x * cos(tmpAngle) + curPos.y * sin(tmpAngle)
            var newY = curPos.y * cos(tmpAngle) - curPos.x * sin(tmpAngle)
            this._target.setPosition(this.config.centerPos + cc.p(newX,newY));
        }
    }

})