class Princess extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setSize(60, 60)
    this.body.setOffset(120, 90)
    this.body.setImmovable(true)

    this.moveSpeed = 3
  }

  update() {
    const heightUI = game.config.height

    if(keyUP.isDown && this.y >= 135) {
      this.y -= this.moveSpeed
    } else if(keyDOWN.isDown && this.y <= heightUI - this.width) {
        this.y += this.moveSpeed
    }
  }
  
  reset() {
  }
}
