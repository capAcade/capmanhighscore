let blinkTimer = 0;
let blinkVelocity = 20;
let timer = 0;
const menuVelocity = 20;

const handleInput = (context) => {
    
    timer--;
    if (context.keys.down.isDown && timer<=0) {
        context.activeCharacter = context.activeCharacter +1
        if(context.activeCharacter > 90){
            context.activeCharacter = 90;
        }
        timer=menuVelocity;
    } else if (context.keys.up.isDown && timer<=0) {
        context.activeCharacter = context.activeCharacter -1
        if(context.activeCharacter < 65){
            context.activeCharacter = 65;
        }
        timer = menuVelocity;
    }
    else if (context.keys.right.isDown && timer<=0) {
        if(context.letters.length -1 <= context.activeLetter){
            context.letters.push(context.game.add.text(context.game.world.centerX -157+((context.activeLetter+1)*28), context.game.world.centerY, 'A', { font: "32px KenVector Future", fill: "#ffffff", align: "center" }))
            context.letters[context.activeLetter +1].anchor.set(0.5);
            context.letters[context.activeLetter +1].stroke = '#26D8D7';
            context.letters[context.activeLetter +1].strokeThickness = 6;
        }
        context.activeLetter = context.activeLetter +1
        timer=menuVelocity;
    } 
    else if (context.keys.left.isDown && timer<=0) {
        context.activeLetter = context.activeLetter -1
        if(context.activeLetter < 0) {
            context.activeLetter = 0
        }

        timer=menuVelocity;
        
    } 
    else if (context.keys.fire.isDown && timer<=0) {
        //context.cb(context.config.buttons[context.selectedButton]);
        let name='';
        context.letters.forEach((letter, index)=>{
            name = name+ letter._text;
        });
        context.score.saveNewScore(name, context.playerScore)
        if(typeof context.cb === 'function'){
            context.cb();
        }
        if(typeof context.initCB === 'function'){
            context.initCB();
        }
        timer=menuVelocity;
        
    }  
    else {
        //timer--;
        //console.log('keypressisstoped')
    }
 };

export default class EnterName {
    constructor(config, cb) {
        this.config = config;
        this.cb = cb;
        this.selectedButton = 0;
    }
    preload() {
        if(typeof this.config.background === 'string'){
            this.game.load.image('bg', this.config.background);
        }
        if(typeof this.config.logo === 'string'){
            this.game.load.image('logo', this.config.logo);
        }

    }
    init(score, playerScore, initCB) {
        this.game.renderer.renderSession.roundPixels = true;
        this.keys = this.game.input.keyboard.addKeys({
            left: Phaser.KeyCode.LEFT,
            right: Phaser.KeyCode.RIGHT,
            up: Phaser.KeyCode.UP,
            down: Phaser.KeyCode.DOWN,
            fire: Phaser.KeyCode.CONTROL
        });
        this.score = score;
        this.playerScore = playerScore;
        this.initCB = initCB;
    }
    create() {
        this.game.stage.backgroundColor = '#000033';
        if(typeof this.config.background === 'string'){
            let bg = this.game.add.image(0, 0, 'bg');
            bg.height = this.game.height;
            bg.width = this.game.width;
        }
        if(typeof this.config.logo === 'string'){
            let logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY -400, 'logo');
            logo.anchor.set(0.5);
        }

        let style = { font: "32px KenVector Future", fill: "#ffffff", align: "center" };
        let offSet = 0;

        this.eyn = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Enter you name', style);
        this.eyn.anchor.set(0.5);
        this.eyn.stroke = '#26D8D7';
        this.eyn.strokeThickness = 6;

        this.eyn = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 300, `Your score = ${this.playerScore}`, style);
        this.eyn.anchor.set(0.5);
        this.eyn.stroke = '#26D8D7';
        this.eyn.strokeThickness = 6;

        this.activeLetter = 0;
        this.activeCharacter = 65
        this.letters = [this.game.add.text(this.game.world.centerX -157, this.game.world.centerY, 'A', style)];
        this.letters[0].anchor.set(0.5);
        this.letters[0].stroke = '#26D8D7';
        this.letters[0].strokeThickness = 6;

    }
    update () {
        handleInput(this);
        this.letters[this.activeLetter].text = String.fromCharCode(this.activeCharacter);
        blinkTimer++
        if(blinkTimer >= blinkVelocity){
            this.letters[this.activeLetter].visible = !this.letters[this.activeLetter].visible;
            blinkTimer = 0;
        }
        this.letters.forEach((letter, index)=>{
            if(index !== this.activeLetter){
                letter.visible = true;
            }
        });
    }
}
