/**
 * Created by luna on 09/09/15.
 */

var levels = [
    //tier 0
    {
        speed: 1000,
        toNextLevel: 10,
        maxLevels: 4
    },
    {
        speed: 750,
        toNextLevel: 10,
        rotateZFixed: true,
        maxLevels: 4
    },
    {
        speed: 500,
        toNextLevel: 10,
        rotateZRandom: true,
        maxLevels: 4
    },
    {
        speed: 250,
        toNextLevel: 10,
        maxLevels: 4
    },
    //tier 1
    {
        speed: 2500,
        toNextLevel: 10,
        changeAngle: true,
        rotateZFixed: true,
        randomFace: true,
        maxLevels: 8
    },
    //tier 2
    {
        speed: 2500,
        toNextLevel: 10,
        changeAngle: true,
        changeStageAngle: 90,
        maxStages: 4,
        maxLevels: 8
    },
    //tier 3
    {
        speed: 2500,
        toNextLevel: 20,
        changeAngle: true,
        changeStageAngle: 45,
        maxStages: 8,
        maxLevels: 8
    },
    //tier 4
    {
        speed: 3500,
        toNextLevel: 20,
        changeStageAngle: 45,
        maxStages: 8,
        maxLevels: 9
    },
    //tier 5
    {
        speed: 3500,
        toNextLevel: 20,
        changeStageAngle: 45,
        nextTetrisRandom: true,
        maxStages: 8,
        maxLevels: 9
    },
    //tier 6
    {
        speed: 3500,
        toNextLevel: 20,
        changeStageAngle: 45,
        maxStages: 8,
        continuousRotation: true,
        maxLevels: 9
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