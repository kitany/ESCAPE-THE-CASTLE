class Play extends Phaser.Scene {
  constructor() {
    super('playScene')
  }

  create() {
    // hide physics body
    // this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
    // this.physics.world.debugGraphic.clear()

    // place tile sprite
    this.sky = this.add.tileSprite(0,0, 640, 480, 'sky').setOrigin(0, 0)
    this.clouds = this.add.tileSprite(0, 35, 2560, 480, 'clouds').setOrigin(0, 0).setScale(0.5)
    this.path = this.add.tileSprite(0, 150, 1280, 480, 'path').setOrigin(0, 0).setScale(0.75)

    this.heelGroup = this.add.group({
      runChildUpdate: true,
    })

    this.time.addEvent({
      delay: 1000, // every 2 seconds
      callback: this.spawnHeel,
      callbackScope: this,
      loop: true
    });

    this.princess = new Princess(this, 0, 130, 'princess').setOrigin(0, 0)
    this.princess.play('princess-run')

    this.pathFront = this.add.tileSprite(0, 150, 1280, 480, 'path-rail-front').setOrigin(0, 0).setScale(0.75)
    
    this.physics.add.existing(this.princess)
    this.physics.add.collider(this.heelGroup, this.princess, this.handleCollision, null, this)

    // white borders
    // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
    // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
    // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

    // define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    // display score
    // let scoreConfig = {
    //   fontFamily: 'Courier',
    //   fontSize: '28px',
    //   backgroundColor: '#F3B141',
    //   color: '#843605',
    //   align: 'right',
    //   padding: {
    //   top: 5,
    //   bottom: 5,
    //   },
    //   fixedWidth: 100
    // }
    // this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

    // GAME OVER flag
    this.gameOver = false

    this.bgm = this.sound.add('fairytale-bgm', {
      volume: 0.1,
      loop: true,
    });

    if (!this.bgm.isPlaying) {
      this.bgm.play();
    }

    this.path.setDepth(0)
    this.pathFront.setDepth(3)
    this.princess.setDepth(2)
  }

  update() {
    // check key input for restart
    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
      this.scene.restart()
    }

    this.clouds.tilePositionX += 1
    this.path.tilePositionX += 6
    this.pathFront.tilePositionX += 6

    this.princess.update()

    this.heelGroup.children.iterate((heel) => {
      if (heel && heel.x < -heel.width) {
        heel.destroy()
      }
    });
  }

  spawnHeel() {
    if (this.gameOver) return;

    // random y position
    const rowNumber = Phaser.Math.Between(1,3)
    const yPos = rowNumber == 1
      ? 240 : rowNumber == 2
        ? 300 : 360
    
    const heel = new Heel(
      this,
      game.config.width,
      yPos,
      'heel',
      0,
      10
    ).setScale(0.75)
    
    heel.play('heel-anim')
    this.physics.add.existing(heel)

    // set depth depending on row
    rowNumber == 1 ? heel.setDepth(1) : rowNumber == 2
      ? heel.setDepth(1) : heel.setDepth(2)

    // add to group
    this.heelGroup.add(heel)
  }

  handleCollision(heel, princess) {
    if (!this.gameOver) {
      this.score += heel.points
      // this.scoreText.text = this.score

      heel.destroy()
      this.sound.play('sfx-heel', {volume: 0.3})
    }
  }

}
