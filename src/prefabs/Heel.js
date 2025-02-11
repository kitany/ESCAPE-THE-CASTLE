// Spaceship prefab
class Heel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setSize(80, 80)
    this.body.setImmovable(true)

    this.moveSpeed = 6
    this.points = pointValue
  }

  update() {
    // move spaceship left
    this.x -= this.moveSpeed

    // wrap from left to right edge
    if(this.x <= 0 - this.width) {
      this.x = game.config.width
    }
  }

  // reset position
  reset() {
    this.x = game.config.width
  }
}