export const games = [
    {
        id: "75coopgame",
        opponent: _ => getRandomAction(0.75),
    },
    {
        id: "25coopgame",
        opponent: _ => getRandomAction(0.25),
    },
    {
        id: "50coopgame",
        opponent: _ => getRandomAction(0.50),
    },
];

function getRandomAction(coopchance) {
    return Math.random() < coopchance ? "cooperate" : "defect";
}