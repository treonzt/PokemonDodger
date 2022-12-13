class Scene1 extends Phaser.Scene{
    constructor(){
    super("bootGame");
}
preload() {
    this.load.image('background', 'assets/images/background.png');
	this.load.image('Golduck', 'assets/sprites/sprite1.png');
	this.load.image('Piplup', 'assets/sprites/sprite2.png');
	this.load.image('Mew', 'assets/sprites/sprite3.png');
};
create(){
    this.add.text(20,20,"Loading Game . . .");
    this.scene.start("playGame");
}
}