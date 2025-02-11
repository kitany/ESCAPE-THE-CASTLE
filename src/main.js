let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    },
  },
  scene: [ Menu, Play, Credits ],
}

let game = new Phaser.Game(config);

// reserve keyboard bindings
let keyUP, keyDOWN, keySPACE, keyRESET, keyMENU, keyCREDITS
let restartState = false

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3