class Cupcake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setSize(50, 50)
    this.body.setImmovable(true)

    this.moveSpeed = scene.gameMoveSpeed
  }

  update() {
    if (!this.scene.gameOver) {
      // move cupcake left
      this.x -= this.moveSpeed
    }
  }
}