class Play extends Phaser.Scene {
  constructor() {
    super('playScene')
  }

  create() {
    // place tile sprite
    this.sky = this.add.tileSprite(0,0, 640, 480, 'sky').setOrigin(0, 0)
    this.clouds = this.add.tileSprite(0, 35, 2560, 480, 'clouds').setOrigin(0, 0).setScale(0.5)
    this.path = this.add.tileSprite(0, 150, 1280, 480, 'path').setOrigin(0, 0).setScale(0.75)

    this.heel = new Heel(this, 500, 190, 'heel', 0, 10).setOrigin(0, 0).setScale(0.75)
    this.heel.play('heel-anim')

    this.princess = new Princess(this, 0, 130, 'princess').setOrigin(0, 0)
    this.princess.play('princess-run')

    this.pathFront = this.add.tileSprite(0, 150, 1280, 480, 'path-rail-front').setOrigin(0, 0).setScale(0.75)
    
    this.physics.add.existing(this.heel)
    this.physics.add.existing(this.princess)
    this.physics.add.collider(this.heel, this.princess, this.handleCollision, null, this)

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
  }

  update() {
    // check key input for restart
    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
      this.scene.restart()
    }

    this.clouds.tilePositionX += 1
    this.path.tilePositionX += 6
    this.pathFront.tilePositionX += 6

    this.heel.update()
    this.princess.update()
  }

  handleCollision(heel, princess) {
    // if (!this.gameOver) {
    //   // Stop the game
    //   this.gameOver = true
      
    //   // Stop the background music
    //   this.bgm.stop()

    //   // Optional: Add game over effects
    //   this.physics.pause()
    //   princess.anims.pause()
    //   heel.anims.pause()

    //   // Optional: Add a game over text
    //   let gameOverConfig = {
    //     fontFamily: 'Courier',
    //     fontSize: '28px',
    //     backgroundColor: '#F3B141',
    //     color: '#843605',
    //     align: 'center',
    //     padding: {
    //       top: 5,
    //       bottom: 5,
    //     },
    //     fixedWidth: 400
    //   }
    //   this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER - Press R to Restart', gameOverConfig).setOrigin(0.5)
    // }
    heel.destroy()
    this.sound.play('sfx-heel')
  }

}
