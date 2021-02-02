import { useEffect, useState } from "react";
import { Padding } from "./base";
import { GameActionButton, NextPageButton } from "./buttons";
import { testRound } from "./data";
import { addToDb } from "./fireStore";
import Pd from "./img/Pd";

export default function () {
    let [pass, setPass] = useState(0);
    let [selected, setSelected] = useState("");
    function addPass() {
        setPass(pass + 1);
    }
    function select(v) {
        testRound.action = v;
        setSelected(v);
    }

    useEffect(() => {
        setPass(0);
    }, []);

    if (pass == 0) {
        return (
            <div className="content">
                <h2 className="content-element">Nu begint het spel.</h2>
                <p className="content-element">
                    Stel je voor je bent een crimineel en jij en je partner in
                    crime zijn gearresteerd. Je kan ervoor kiezen de ander te
                    verraden, waardoor je minder lang in de gevangenis hoeft te
                    zitten, maar de ander langer. In het spel dat je zo gaat
                    spelen zit je een soortgelijke situatie, en heet daarom van
                    origine: "the prisoners dillemma".
                </p>
                <p className="content-element">
                    In onze vorm van het spel heb je elke ronde twee keuzes: je
                    kan voor cooperate of voor defect kiezen. Als jij en je
                    tegenstander voor cooperate kiezen, krijgen jullie allebei 3
                    punten. Als jullie beiden voor defect kiezen, krijgen jullie
                    allebei 1 punt. Als de één voor cooperate kiest en de ander
                    voor defect, krijgt degene die voor cooperate koos 0 punten
                    en degene die voor defect koos 5 punten.
                </p>
                <Pd></Pd>
                <p className="content-element">
                    Je gaat straks 5 rondes van dit spel spelen tegen drie
                    verschillende tegenstanders. Deze tegenstanders spelen niet
                    live tegen jou, maar hebben een paar weken eerder laten
                    weten wat ze in elke mogelijke situatie zouden doen. Wat die
                    spelers kiezen hangt dus af van wat jij in de rondes
                    daarvoor speelt.
                </p>
                <p className="content-element">
                    Elke ronde worden je punten bij je totale score opgeteld.
                    Hoe meer punten je hebt, hoe meer kans je maakt op de prijs
                    van 20 euro, dus zorg dat je het goed doet! Je tegenstanders
                    (die al eerder hebben gespeeld) spelen echter om een andere
                    prijs, dus hoeveel punten zij hebben beinvloedt niet jouw
                    kans op de prijs. We beginnen met een test-ronde.
                </p>
                <div onClick={addPass} className="button main-button">
                    Start Test Ronde
                </div>
                <Padding padding="5rem" />
            </div>
        );
    } else if (pass == 1) {
        return (
            <div className="content">
                <h2 className="content-element">Wat kies je?</h2>
                <GameActionButton
                    selected={selected == "cooperate"}
                    action={() => select("cooperate")}
                >
                    Cooperate
                </GameActionButton>
                <GameActionButton
                    selected={selected == "defect"}
                    action={() => select("defect")}
                >
                    Defect
                </GameActionButton>
                <Padding padding="1rem" />
                {selected != "" && (
                    <div
                        onClick={() => {
                            addPass();
                            addToDb({ testRound: selected });
                        }}
                        className="button main-button"
                    >
                        Kies
                    </div>
                )}
                <Padding padding="1rem" />
                <Pd></Pd>
            </div>
        );
    } else if (pass == 2) {
        return (
            <div className="content">
                <h2 className="content-element">Nu begin je voor het echie!</h2>
                <NextPageButton to="/game1">Begin</NextPageButton>
            </div>
        );
    }
}
