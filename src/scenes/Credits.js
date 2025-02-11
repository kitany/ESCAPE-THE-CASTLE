class Credits extends Phaser.Scene {
  constructor() {
    super('creditsScene')
  }  
  create() {
    const textConfig = {
      fontFamily: 'Courier',
      fontSize: '24px',
      color: '#181212',
      align: 'left',
      padding: {
      top: 5,
      bottom: 5,
      },
      wordWrap: {
        width: 620,
        useAdvancedWrap: true,
      },
    }

    this.creditsScreen = this.add.tileSprite(0,0, 640, 480, 'credits').setOrigin(0, 0)
    this.creditsText = this.add.text(borderPadding, borderPadding,
      'BGM by Gregor Quendel: https://freesound.org/people/GregorQuendel/sounds/578722/\
      \nUI SFX by FlechaBr: https://freesound.org/people/FlechaBr/sounds/340159/\
      \nEnemy SFX by MATRIXXX_: https://freesound.org/people/MATRIXXX_/sounds/657927/\
      \nScore ascension SFX by qubodup: https://freesound.org/people/qubodup/sounds/442943/\
      \nObject collection SFX by NMTVESounds: https://freesound.org/people/NMTVESounds/sounds/582344/',
      textConfig)

    // define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyMENU)) {
      restartState = true
      this.sound.play('select', {volume: 0.2})
      this.scene.start('menuScene')
    }
  }
}