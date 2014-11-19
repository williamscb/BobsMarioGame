// TODO
game.PlayerEntity = me.Entity.extend({
init: function(x, y, settings) {
this._super(me.Entity, "init", x, y);
        image: "matio";
        spritewidth; "128",
        spriteheight; "128",
        width; 128,
        height; 128,
        getShape: function(){
        return (new .me.Rect(0, 0, 128, 128))

        }


settings.image = "mario";
        settings.spritewidth = "128";
        settings.spriteheight = "128";
        settings.width = 128;
        settings.height = 128;
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.setVelocity(5, 0);
},
        update: function() {
        if (me.input.isKeyPressed("right")) {
        this.body.vel.x += this.body.accel.x = me.timer.tick;
        } else {
        this.body.vel.x = 0;
        }
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    }

});
        