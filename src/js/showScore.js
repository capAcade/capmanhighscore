let blinkTimer = 0;
let blinkVelocity = 30;

const handleInput = (context) => {
    
    if (context.keys.fire.isDown) {
        context.cb();
    }  

 };

export default class ShowScore {
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
    init(score) {
        this.game.renderer.renderSession.roundPixels = true;
        this.keys = this.game.input.keyboard.addKeys({
            fire: Phaser.KeyCode.CONTROL
        });
        this.score = score;
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

        this._rankings = this.score.ranking.map((rank)=>{
            let name = this.game.add.text(150, 250 + offSet, rank.name, style);
            name.stroke = '#26D8D7';
            name.strokeThickness = 6;

            let score = this.game.add.text(950, 250 + offSet, rank.score, style);
            score.stroke = '#26D8D7';
            score.strokeThickness = 6;


            offSet = offSet + 70;
            return {name: name, score: score}
        });

        this.goBack = this.game.add.text(this.game.world.centerX, this.game.world.centerY +450, '- Hit fire to go back -', style);
        this.goBack.anchor.set(0.5);
        this.goBack.stroke = '#26D8D7';
        this.goBack.strokeThickness = 6;
    }
    update () {
        handleInput(this);
        blinkTimer++
        if(blinkTimer >= blinkVelocity){
            this.goBack.visible = !this.goBack.visible;
            blinkTimer = 0;
        }
    }
}
