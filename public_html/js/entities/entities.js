// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 30, 128)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [3]);
        //sets the animation to run through pictures 8-13
        //the last numbersays we switch between pictures every 80 milliseconds
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);

        this.renderable.setCurrentAnimation("idle");
        
      //sets the speed we go on the x axis(first number) and y axis (second number)
        this.body.setVelocity(5, 20);
        
        //sets the camera(viewport) to follow mario's position (pos) on both x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },
    update: function(delta) {
        //checks if right key is pressed and if it is, exicutes the following statement
        if (me.input.isKeyPressed("right")) {
            //sets the position of mario on the 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x = 0;
        }



        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");

        }

        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(){
        
    }

});


game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
      this._super(me.Entity, 'init', [x, y, settings]);
      this.body.onCollision = this.onCollision.bind(this);
      //if someting collides with this object then we will call the onCollision function and pass it
      //a hidden parameter of this object
      this.level = settings.level;
      console.log(this.level);
      this.xSpawn = settings.xSpawn;
      this.ySpawn = settings.ySpawn;
    },
    onCollision: function(){
        console.log("collision");
        //sets this object so that is will collide with objects of type no_object which dont exsist
        //so really makes it so this object
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
     
});
        