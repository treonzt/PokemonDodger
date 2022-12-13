function preload() {
  this.load.image('background', 'assets/images/background.png');
  this.load.image('sprite3', 'assets/sprites/sprite3.png');
  this.load.image('sprite2', 'assets/sprites/sprite2.png');
  this.load.image('sprite1', 'assets/sprites/sprite1.png');
  this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
  this.load.image('frog', 'assets/sprites/frog.png');
}

const gameState = {
  score: 0
};

function create() {

function updateBackground(weather) {
 
  document.body.style.backgroundImage = `assets/images/background.png`;
}


function getWeather() {
 
  fetch('https://example.com/weather')
    .then((response) => {
      // Once the weather data is fetched, we parse the JSON data
      return response.json();
    })
    .then((weather) => {
      // After the weather data is parsed, we call the `updateBackground`
      // function to update the background of the page based on the weather data
      updateBackground(weather);
    });
}

// Finally, we call the `getWeather` function to fetch the weather data and
// update the background of the page
getWeather();
  this.background = this.add.image(0,0,"background");
  gameState.player = this.physics.add.sprite(225, 450, 'frog').setScale(.5);
  
  const platforms = this.physics.add.staticGroup();

  platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

  gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#000000' });

  gameState.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms);
  
    gameState.cursors = this.input.keyboard.createCursorKeys();

  const times = this.physics.add.group();

  function itemGen () {
    const xCoord1 = Math.random() * 450;
    const xCoord2 = Math.random() * 450;
    const xCoord3 = Math.random() * 450;
    times.create(xCoord1, 10, 'sprite3');
    times.create(xCoord2, 10, 'sprite2');
    times.create(xCoord3, 10, 'sprite1');
  }

  const itemGenLoop = this.time.addEvent({
    delay: 500,
    callback: itemGen,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(times, platforms, function (item) {
    item.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  })
  
  this.physics.add.collider(gameState.player, times, () => {
    itemGenLoop.destroy();
    this.physics.pause();
    this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
    this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
    
        // Add your code below:
    this.input.on('pointerup', () =>{
      gameState.score = 0;
        this.scene.restart();
    });
  });
}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(160);
  }else if (this.input.activePointer.isDown) {
    if(this.input.activePointer.worldX < gameState.player.getCenter().x)
        gameState.player.setVelocityX(-160);
    else gameState.player.setVelocityX(160);
  }else {
    gameState.player.setVelocityX(0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
      enableBody: true,
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);


     
