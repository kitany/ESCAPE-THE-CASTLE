class Menu extends Phaser.Scene {
  constructor() {
    super('menuScene')
  }

  init() {
  }

  preload() {
    // load bgm
    this.load.audio('fairytale-bgm', './assets/fairytale-lullaby.wav')
    this.load.audio('sfx-heel', './assets/shine.mp3')
    this.load.audio('sfx-enemy', './assets/enemy-sfx.wav')
    this.load.audio('select', './assets/select.ogg')
    this.load.audio('level-up', './assets/level-up.wav')

    // load images/tile sprites
    this.load.image('sky', './assets/sky.png')
    this.load.image('clouds', './assets/clouds.png')
    this.load.image('path', './assets/path.png')
    this.load.image('path-rail-front', './assets/path-rail-front.png')
    this.load.image('menu', './assets/menu.png')
    this.load.image('gameover', './assets/gameover.png')
    this.load.image('tutorial', './assets/tutorial.png')
    this.load.image('credits', './assets/credits.png')

    // spritesheets
    this.load.spritesheet('princess', './assets/princess.png', {
      frameWidth: 240,
      frameHeight: 180,
      startFrame: 0,
      endFrame: 2,
    })

    this.load.spritesheet('heel', './assets/heel.png', {
      frameWidth: 130,
      frameHeight: 130,
      startFrame: 0,
      endFrame: 1,
    })

    this.load.spritesheet('cupcake', './assets/cupcake.png', {
      frameWidth: 130,
      frameHeight: 130,
      startFrame: 0,
      endFrame: 1,
    })
  }

  create() {
    this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0)

    if (!restartState) {
      // animation config
      this.anims.create({
        key: 'princess-run',
        frames: this.anims.generateFrameNumbers('princess', { 
            start: 0, 
            end: 2, 
            first: 0
        }),
        frameRate: 6,
        repeat: -1,
      })

      this.anims.create({
        key: 'heel-anim',
        frames: this.anims.generateFrameNumbers('heel', { 
            start: 0, 
            end: 1, 
            first: 0
        }),
        frameRate: 3,
        repeat: -1,
      })

      this.anims.create({
        key: 'cupcake-anim',
        frames: this.anims.generateFrameNumbers('cupcake', { 
            start: 0, 
            end: 1, 
            first: 0
        }),
        frameRate: 3,
        repeat: -1,
      })
    }

    // define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      this.sound.play('select', {volume: 0.2})
      this.scene.start('playScene')
    }

    if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
      this.sound.play('select', {volume: 0.2})
      this.scene.start('creditsScene')
    }
  }
}
