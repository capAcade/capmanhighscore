const mockScore = [
    {
        name: 'Capgemini',
        score: 9999
    },
        {
        name: 'sogeti',
        score: 8888
    },
    {
        name: 'backelite',
        score: 7777
    },
    {
        name: 'blue harvest',
        score: 6666
    },
    {
        name: 'farenheit',
        score: 5555
    },
    {
        name: 'idin',
        score: 4444
    },
    {
        name: 'gettronics',
        score: 3333
    },
    {
        name: 'KPN',
        score: 2222
    },
    {
        name: 'infosys',
        score: 1112
    },
    {
        name: 'TCS',
        score: 1111
    }
];

const getGameScoreFromCookie = (name) =>{
    return JSON.parse(document.cookie).capManGameScore.filter((game)=>{
        return game.name === name;
    })[0];
}

const getRankPositionIndex = (score, rankList) =>{
    return rankList.findIndex((element)=>{
        return element.score < score;
    });
}

export default class scoreConroller{
    constructor(game) {
        this.name = game.name;
        document.cookie = JSON.stringify({
            capManGameScore: [
                {
                    name: this.name,
                    ranking: this.ranking
                }
            ]
        })
        this.ranking = getGameScoreFromCookie(this.name).ranking || mockScore;
        

        console.log(getRankPositionIndex(111, this.ranking))
        console.log(getRankPositionIndex(5555, this.ranking))
        console.log(getRankPositionIndex(3333, this.ranking))
        this.saveNewScore('test', 3333);
        console.log(this.ranking);
    }
    saveNewScore(playerName, score){

        if(this.isScoreMoreThenLast) {
            this.ranking.splice(getRankPositionIndex(score, this.ranking) -1, 0, {
                name: playerName, 
                score: score})
            this.ranking.splice(10, 1);
        }

        document.cookie = JSON.stringify({
            capManGameScore: [
                {
                    name: this.name,
                    ranking: this.ranking
                }
            ]
        })
    }
    isScoreMoreThenLast(score){
        return this.ranking[this.ranking.length -1].score < score;
    }
}