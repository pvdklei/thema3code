import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Padding } from "./base";
import { GameActionButton, NextPageButton, NextRoundButton } from "./buttons";

import { gameHistory, saveGameRound, maxRound } from "./data";
import { addToDb } from "./fireStore";
import Pd from "./img/Pd";

export default function Game(props) {
    
    const getOpponentAction = props.opponent;
    const gameId = props.gameId;

    if (!gameHistory[gameId]) {
        gameHistory[gameId] = []
    }

    const history = useHistory();

    let [round, setRound] = useState(1);
    let [score, setScore] = useState(0);
    let [opponentAction, setOpponentAction] = useState("");
    let [yourAction, setYourAction] = useState("");
    let [roundScore, setRoundScore] = useState(0);
    let [lastAction, setLastAction] = useState("");

    useEffect((_) => {
        if (gameHistory[gameId].length >= maxRound) {
            history.push("/retry");
        } else if (gameHistory[gameId].length != 0) {
            let lastRound = gameHistory[gameId][gameHistory[gameId].length - 1];
            setRound(lastRound.roundNumber + 1);
            setOpponentAction(lastRound.opponentAction);
            setYourAction(lastRound.playerAction);
            setLastAction(lastRound.playerAction);
            setScore(lastRound.totScore);
            setRoundScore(lastRound.roundScore);
        }
    }, []);

    function calcRoundScore(oppAction) {
        if (oppAction == "defect" && yourAction == "defect") {
            return 1;
        } else if (oppAction == "defect" && yourAction == "cooperate") {
            return 0;
        } else if (oppAction == "cooperate" && yourAction == "defect") {
            return 5;
        } else if (oppAction == "cooperate" && yourAction == "cooperate") {
            return 3;
        }
        return null;
    }

    function onNextRound() {
        if (yourAction == "") {
            return;
        }

        setLastAction(yourAction);
        let oppAction = getOpponentAction();
        setOpponentAction(oppAction);

        let roundScore = calcRoundScore(oppAction);
        setScore(score + roundScore);
        setRoundScore(roundScore);

        setRound(round + 1);

        saveGameRound(
            gameId,
            round,
            yourAction,
            oppAction,
            roundScore,
            score + roundScore
        );

        setYourAction("");

        addToDb({ games: gameHistory });

    }

    function toggleAction(action) {
        if (yourAction == action) {
            setYourAction("");
        } else {
            setYourAction(action);
        }
    }

    function canGoToNext() {
        return yourAction != "";
    }

    function nextButton() {
        if (round <= maxRound) {
            return (
                <NextRoundButton
                    action={onNextRound}
                    available={canGoToNext()}
                />
            );
        } else {
            return (
                <>
                    <Padding padding="1.5rem" />
                    <NextPageButton
                        to={props.to}
                        onClick={onNextRound}
                    >
                        Klaar
                    </NextPageButton>
                </>
            );
        }
    }

    function getTitle() {
        if (round == 1) {
            return <>Eerste ronde: wat kies je?</>;
        } else if (round == maxRound) {
            return <>Laatste ronde: wat kies je?</>;
        } else if (round > maxRound) {
            return <>{props.endGreeting}</>;
        } else {
            return <>Ronde {round}: wat kies je?</>;
        }
    }

    return (
        <div className="content">
            <h2 className="content-element">{getTitle()}</h2>
            {round != 1 && (
                <>
                    <h2
                        style={{
                            marginBottom: "1rem",
                            color: "#c21807",
                            fontSize: "1.2rem",
                        }}
                    >
                        {roundScore} punten! Je score is nu {score} (in dit spel).
                    </h2>
                    <p
                        className="content-element"
                        style={{
                            color: "#aaaaaa",
                        }}
                    >
                        Je tegenstander koos {opponentAction} en jij koos{" "}
                        {lastAction}, dus je krijgt {roundScore} punten.
                    </p>
                </>
            )}
            {round <= maxRound && (
                <>
                    <GameActionButton
                        selected={yourAction == "cooperate"}
                        action={() => toggleAction("cooperate")}
                    >
                        Cooperate
                    </GameActionButton>
                    <GameActionButton
                        selected={yourAction == "defect"}
                        action={() => toggleAction("defect")}
                    >
                        Defect
                    </GameActionButton>
                </>
            )}
            {nextButton()}
            <Padding padding="1rem" />
            {round <= maxRound && <Pd /> }
            <Padding padding="2rem" />
        </div>
    );
}
