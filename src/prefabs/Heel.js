class Heel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, pointValue) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setSize(50, 50)
    this.body.setImmovable(true)

    this.moveSpeed = scene.gameMoveSpeed
    this.points = pointValue
  }

  update() {
    if (!this.scene.gameOver) {
      // move heel left
      this.x -= this.moveSpeed 
    }
  }
}