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
//#TODO change capmanGameScore an object makes live easier... capmanGameScore.[gameName]
const getCapManGameScoreCoockie = () =>{
    var out;
    try {
        out = JSON.parse(document.cookie).capManGameScore;
    } catch {
        out = [];
    }
    return out || [];
}

const getGameScoreFromCookie = (name) =>{
    return getCapManGameScoreCoockie().filter((game)=>{
        return game.name === name;
    })[0];
}

const getIndexOfGame = (name) => {
    return getCapManGameScoreCoockie().findIndex((element)=>{
        return element.name === name;
    });
}

const setGameScoreToCookie = (ranking, gameName) =>{
    let out = getCapManGameScoreCoockie();
    let gameIndex = getIndexOfGame(gameName);
    if(gameIndex !== -1){
        out[gameIndex].ranking = ranking;
    } else {
        out.push({
            name: gameName,
            ranking: ranking
        })
    }
    document.cookie = JSON.stringify({capManGameScore: out});
}

const getRankPositionIndex = (score, rankList) =>{
    return rankList.findIndex((element)=>{
        return element.score < score;
    });
}

export default class scoreConroller{
    constructor(game) {
        this.name = game.name;

        //Check if there is already some scoring if not we create mock score
        if(getGameScoreFromCookie(this.name)){
            this.ranking = getGameScoreFromCookie(this.name).ranking || mockScore;
        } else {
            this.ranking = mockScore;
        }
    }
    saveNewScore(playerName, score){
        if(this.isScoreMoreThenLast) {
            this.ranking.splice(getRankPositionIndex(score, this.ranking), 0, {
                name: playerName, 
                score: score})
            this.ranking.splice(10, 1);
            setGameScoreToCookie(this.ranking, this.name);
        }
    }
    isScoreMoreThenLast(score){
        return this.ranking[this.ranking.length -1].score < score;
    }
}