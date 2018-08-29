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

export default class scoreConroller{
    constructor(game) {
        this.name = game.name;
        this.ranking = getGameScoreFromCookie(this.name).ranking || mockScore;
    }
    saveNewScore(playerName, score){
        document.cookie = JSON.stringify({
            capManGameScore: [
                {
                    name: this.name,
                    ranking: this.ranking
                }
            ]
        })
    }
}