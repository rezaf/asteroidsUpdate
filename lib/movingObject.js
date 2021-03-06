(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  // Moving object properties
  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  // Allow coloroids and ships to pass over each other
  MovingObject.prototype.collideWith = function (otherObject) {};

  // Draw moving objects
  MovingObject.prototype.draw = function (ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
      ctx.fill();
    if (!(this instanceof Asteroids.Asteroid)) {
      ctx.strokeStyle = "rgb(0,128,0)";
      ctx.lineWidth = 5;
      ctx.stroke();
      $("#count").html("Coloroids: " + this.game.asteroids.length);
    }
  };

  // Determine collision conditions
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.isWrappable = true;

  // Object motion
  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

  // Remove object
  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
