# capManCrashingBugs
The platformer game for capman this is the highscore



npm i capmanhighscore


and to use it:

``
import {ScoreController, ShowScore, EnterName} from '../src/js/main';
let game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'capManGalaxy');

const showScore = new ShowScore(
    {
        title: 'capman Crashing bugs',
        background: 'assets/img/test/Intro_Screen_background.png',
        logo: 'assets/img/test/CapmanLogo1.svg',
        buttons: [
            {
                id: 'onePlayer',
                text: '- start one player -'
            },
            {
                id: 'twoPlayers',
                text: '- start two player -'
            },
            {
                id: 'highScores',
                text: '- High scores -'
            }
        ]
    },
    () =>{
        game.state.start('enterName', true, false, score, 999999);
    }
);


const enterName = new EnterName(
    {
        title: 'capman Crashing bugs',
        background: 'assets/img/test/Intro_Screen_background.png',
        logo: 'assets/img/test/CapmanLogo1.svg',
        buttons: [
            {
                id: 'onePlayer',
                text: '- start one player -'
            },
            {
                id: 'twoPlayers',
                text: '- start two player -'
            },
            {
                id: 'highScores',
                text: '- High scores -'
            }
        ]
    },
    () =>{
        game.state.start('showScore', true, false, score); 
    }
);


var score = new ScoreController({name: 'aTestGame'});
game.state.add('showScore', showScore);
game.state.add('enterName', enterName)
game.state.start('enterName', true, false, score, 999999);
``