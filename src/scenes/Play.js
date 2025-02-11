class Play extends Phaser.Scene {
  constructor() {
    super('playScene')
  }

  create() {
    const textConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#FFF1F4',
      color: '#FF85A2',
      align: 'right',
      padding: {
      top: 5,
      bottom: 5,
      },
      fixedWidth: 100
    }

    const clockConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#FFF1F4',
      color: '#FF85A2',
      align: 'center',
      padding: {
      top: 5,
      bottom: 5,
      },
      fixedWidth: 100
    }

    // initial values
    this.score = 0
    this.gameMoveSpeed = 6

    // clock variables
    this.currentTime = 0
    this.timerVisual = this.add.text(game.config.width / 2 - 40, borderPadding , this.formatTime(this.currentTime), clockConfig)
    this.timerVisual.setDepth(4)

    // increase speed
    this.time.addEvent({
      delay: 15000, // after 15 second(s)
      callback: this.changeSpeed,
      callbackScope: this,
      loop: false,
    });

    // hide physics body
    this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
    this.physics.world.debugGraphic.clear()

    // place background tile sprites
    this.sky = this.add.tileSprite(0,0, 640, 480, 'sky').setOrigin(0, 0)
    this.clouds = this.add.tileSprite(0, 35, 2560, 480, 'clouds').setOrigin(0, 0).setScale(0.5)
    this.path = this.add.tileSprite(0, 150, 1280, 480, 'path').setOrigin(0, 0).setScale(0.75)

    // point object
    this.heelGroup = this.add.group({
      runChildUpdate: true,
    })

    // enemy object
    this.cupcakeGroup = this.add.group({
      runChildUpdate: true,
    })

    // princess (player) sprite
    this.princess = new Princess(this, 0, 130, 'princess').setOrigin(0, 0)
    this.princess.play('princess-run')

    this.pathFront = this.add.tileSprite(0, 150, 1280, 480, 'path-rail-front').setOrigin(0, 0).setScale(0.75)
    
    this.physics.add.existing(this.princess)
    this.physics.add.collider(this.heelGroup, this.princess, this.handleCollisionHeel, null, this)
    this.physics.add.collider(this.cupcakeGroup, this.princess, this.handleCollisionObstacle, null, this)

    // define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

    // display score
    this.scoreText = this.add.text(borderPadding, borderPadding, this.score, textConfig)

    // GAME OVER flag
    this.gameOver = false

    // TUTORIAL flag
    this.tutorialScreen = true
    this.createTutorialScreen()
    this.physics.pause()

    // bgm
    this.bgm = this.sound.add('fairytale-bgm', {
      volume: 0.1,
      loop: true,
    });

    if (!this.bgm.isPlaying) {
      this.bgm.play();
    }

    // depth settings
    this.path.setDepth(0)
    this.pathFront.setDepth(3)
    this.princess.setDepth(2)
  }

  update() {
    if (this.tutorialScreen) {
      if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
        this.sound.play('select', {volume: 0.2})
        this.startGame()
      }
    }

    // check key input for restart or menu
    if(this.gameOver) {
      if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
        this.bgm.stop()
        this.sound.play('select', {volume: 0.2})
        this.scene.restart()
      }
      if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
        restartState = true
        this.bgm.stop()
        this.sound.play('select', {volume: 0.2})
        this.scene.start('menuScene')
      }
      return;
    }

    this.updateTime()

    this.clouds.tilePositionX += 1
    this.path.tilePositionX += this.gameMoveSpeed
    this.pathFront.tilePositionX += this.gameMoveSpeed

    this.princess.update()

    if (this.score % 50 == 0 && this.score != 0   ) {
      this.sound.play('level-up', {volume: 0.01})
    }

    // clean up objects
    this.heelGroup.children.iterate((heel) => {
      if (heel && heel.x < -heel.width) {
        heel.destroy()
      }
    });

    this.cupcakeGroup.children.iterate((cupcake) => {
      if (cupcake && cupcake.x < -cupcake.width) {
        cupcake.destroy()
      }
    });
  }

  createTutorialScreen() {
    this.tutorialScreenOverlay = this.add.tileSprite(0,0, 640, 480, 'tutorial').setOrigin(0, 0)
    this.tutorialScreenOverlay.setDepth(6)
  }

  startGame() {
    this.tutorialScreen = false
    this.physics.resume()

    this.tweens.add({
      targets: [this.tutorialScreenOverlay],
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.tutorialScreenOverlay.destroy()

        this.time.addEvent({
          delay: 1000,
          callback: this.spawnHeel,
          callbackScope: this,
          loop: true,
        })

        this.time.addEvent({
          delay: 2300,
          callback: this.spawnCupcake,
          callbackScope: this,
          loop: true,
        })

        this.time.addEvent({
          delay: 15000,
          callback: this.changeSpeed,
          callbackScope: this,
          loop: false,
        })
      }
    })
  }

 spawnCupcake() {
    if (this.gameOver) return;

    // random y position
    const rowNumber = Phaser.Math.Between(1,3)
    const yPos = rowNumber == 1
      ? 240 : rowNumber == 2
        ? 300 : 360
    
    const cupcake = new Cupcake(
      this,
      game.config.width,
      yPos,
      'cupcake',
      0,
      10
    ).setScale(0.75)
    
    cupcake.play('cupcake-anim')
    this.physics.add.existing(cupcake)

    // set depth depending on row
    rowNumber == 1 ? cupcake.setDepth(1) : rowNumber == 2
      ? cupcake.setDepth(1) : cupcake.setDepth(2)

    // add to group
    this.cupcakeGroup.add(cupcake)
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

  handleCollisionObstacle(object, princess) {
    if (!this.gameOver) {
      this.gameOver = true
      this.sound.play('sfx-enemy', {volume: 0.3})
      this.physics.pause()
      this.princess.anims.pause()

      this.heelGroup.children.iterate((object) => {
        object.setVelocityX(0) // stop physics movement
        object.anims.pause()   // stop animation
        object.moveSpeed = 0   // stop update movement
      });

      this.cupcakeGroup.children.iterate((object) => {
        object.setVelocityX(0) // stop physics movement
        object.anims.pause()   // stop animation
        object.moveSpeed = 0   // stop update movement
      });

      this.time.removeAllEvents()

      const gameOverCover = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0, 0)
      gameOverCover.alpha = 0.3
      gameOverCover.setDepth(5)

      const gameOverScreen = this.add.tileSprite(0,0, 640, 480, 'gameover').setOrigin(0, 0)
      gameOverScreen.setDepth(6)
    }
  }

  handleCollisionHeel(heel, princess) {
    if (!this.gameOver) {
      this.score += heel.points
      this.scoreText.text = this.score

      heel.destroy()
      this.sound.play('sfx-heel', {volume: 0.3})
    }
  }

  changeSpeed() {
    this.gameMoveSpeed = 9
  }

  formatTime(ms) {
    let s = ms / 1000
    let min = Math.floor(s / 60)
    let sec = Math.floor(s % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  updateTime() {
    this.currentTime += this.game.loop.delta
    this.timerVisual.text = this.formatTime(this.currentTime)
  }
}
