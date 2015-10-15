/**
 * Created by luna on 09/09/15.
 */

var levels = [
    //tier 0
    {
        startSpeed: 1000,
        speedStep: 250,
        minSpeed: 1000,
        toNextLevel: 10
    },
    //tier 1
    {
        startSpeed: 1000,
        toNextLevel: 10,
        speedStep: 250,
        minSpeed: 1000,
        rotateZFixed: true
    },
    //tier 2
    {
        startSpeed: 1000,
        speedStep: 250,
        minSpeed: 1000,
        toNextLevel: 10,
        rotateZRandom: true
    },
    //tier 3
    {
        startSpeed: 1000,
        speedStep: 250,
        minSpeed: 1000,
        toNextLevel: 10,
        rotateZRandom: true,
        randomFace: true
    },
    //tier 4
    {
        startSpeed: 1000,
        speedStep: 250,
        minSpeed: 1000,
        toNextLevel: 10,
        rotateZRandom: true,
        changeEach: 5,
        randomFace: true
    },
    //tier 5
    {
        startSpeed: 1000,
        speedStep: 250,
        minSpeed: 1000,
        toNextLevel: 10,
        rotateZRandom: true,
        changeEach: 1,
        randomFace: true
    }
];

var grid = {x:25,y:25};

var gridSize = 25;

var playersMeta = [
    {
        playerId: "player-1",
        cubeId: "cube",
        rotateNext: 1
    },
    {
        playerId: "player-2",
        cubeId: "b-cube",
        rotateNext: -1
    }
];