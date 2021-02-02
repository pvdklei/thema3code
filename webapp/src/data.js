export const maxRound = 5;

// save things for if page reloaded
const savedPlayerId = sessionStorage.getItem("responseId");
const savedGameHistory = sessionStorage.getItem("gameHistory");
const savedSlideStatements = sessionStorage.getItem("slideStatements");
const savedPQs = sessionStorage.getItem("personalQuestions");

export const playerId = savedPlayerId ? savedPlayerId : getNewId();
export let gameHistory = savedGameHistory ? JSON.parse(savedGameHistory) : {};
export let testRound = {};

sessionStorage.setItem("responseId", playerId);

export function saveGameRound(gameId, roundN, yourAction, oppAction, rScore, score) {
    gameHistory[gameId].push({
        opponentAction: oppAction,
        roundNumber: roundN,
        playerAction: yourAction,
        roundScore: rScore,
        totalScore: score,
    });
    sessionStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

function getNewId() {
    return Math.random().toString(36).substr(2, 9);
}

export let slideStatements = savedSlideStatements
    ? JSON.parse(savedSlideStatements)
    : [
          {
              id: "interest",
              statement: "Ik ben zeer geïnteresseerd in politiek.",
              value: 4,
          },
          {
              id: "ident_eu",
              statement:
                  "Ik identificeer mezelf meer als Nederlander dan Europeaan.",
              value: 4,
          },
          {
              id: "ident_wereld",
              statement:
                  "Ik identificeer mezelf meer als Nederlander dan Wereldburger.",
              value: 4,
              next_bar: true,
          },
          {
              id: "staten_bepalen",
              statement:
                  "Staten bepalen wat er gebeurt in de internationale politiek. Overkoepelende organisaties kunnen geen effectieve invloed uitvoeren op staten als staten dat niet toelaten.",
              value: 4,
          },
          {
              id: "mening_vertegenwoordig",
              statement:
                  "Internationaal gezien vertegenwoordigt de Nederlandse overheid de mening van de gemiddelde Nederlandse burger.",
              value: 4,
          },
          {
              id: "staat_rationeel",
              statement:
                  "De staat handelt rationeel en gaat zo effectief mogelijk te werk.",
              value: 4,
          },
          {
              id: "veiligheid1",
              statement:
                  "(inter)-Nationale veiligheid is de grootste en belangrijkste drijfveer voor de politiek van een staat.",
              value: 4,
          },
          {
              id: "veiligheid2",
              statement:
                  "Internationale politiek kan uiteindelijk allemaal teruggeleid worden naar kwesties van nationale veiligheid.",
              value: 4,
              next_bar: true,
          },
          {
              id: "bedrijven",
              statement:
                  "Niet alleen staten maar ook internationale organisaties of bedrijven hebben veel invloed op de wereldpolitiek.",
              value: 4,
          },
          {
              id: "vrede",
              statement:
                  "Relaties en gezamenlijke belangen tussen landen en organisaties bevorderen vrede.",
              value: 4,
          },
          {
              id: "themas",
              statement:
                  "Er zijn allerlei thema’s die van belang zijn in de politiek, naast veiligheid spelen bijvoorbeeld ook klimaat, mensenrechten en economische belangen een rol. ",
              value: 4,
          },
          {
              id: "binnen_buiten",
              statement:
                  "Nationaal beleid wordt sterker beïnvloed door politiek binnen een land dan factoren van buitenaf.",
              value: 4,
          },
          {
              id: "china",
              statement:
                  "Nederland moet nu meer handelen met China, omdat dat economische, politieke en religieuze vrijheden in China zal bevorderen.",
              value: 4,
          },
      ];

export function setSlideStatementVal(val, index) {
    slideStatements[index].value = val;
    sessionStorage.setItem("slideStatements", JSON.stringify(slideStatements));
}

export let personalQuestions = savedPQs
    ? JSON.parse(savedPQs)
    : {
          age: {
              id: "leeftijd",
              question: "Hoe oud ben je?",
              value: "",
          },
          sex: {
              id: "geslacht",
              question: "Van welk geslacht ben je?",
              value: "",
          },
          email: {
              id: "email",
              question: "Wat is je email? (optioneel, voor de prijs)",
              value: "",
          },
          knewPd: {
              id: "pdBekend",
              question: "Kende je het Prisoners Dillemma spel al?",
              value: "",
          },
          remarks: {
              id: "opmerkingen",
              question: "Heb je nog opmerkingen? Bijv. snapte je iets niet?",
              value: "",
          },
      };

export function setPQVal(q, val) {
    personalQuestions[q].value = val;
}

export function updatePQsessionStorage() {
    sessionStorage.setItem(
        "personalQuestions",
        JSON.stringify(personalQuestions)
    );
}
