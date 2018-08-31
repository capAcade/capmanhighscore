import {ScoreController} from '../src/js/main';

var score = new ScoreController({name: 'aTestGame'});
console.log(score.isScoreMoreThenLast(18889));
console.log(score.saveNewScore('MastahBlastah', 18889))
