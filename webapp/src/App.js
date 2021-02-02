import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";

import { Nav, Footer } from "./base";
import Intro from "./Intro";
import Form from "./Form";
import GameIntro from "./GameIntro";
import Game from "./Game";
import PersonalForm from "./PersonalForm";
import Bye from "./Bye";
import { games } from "./games";

class App extends React.Component {
    render() {
        return (
            <>
                <Nav />
                <Router>
                    <Route exact path="/">
                        <Intro />
                    </Route>
                    <Route path="/personal-form">
                        <PersonalForm />
                    </Route>
                    <Route path="/form">
                        <Form />
                    </Route>
                    <Route path="/game-intro">
                        <GameIntro />
                    </Route>
                    <Route path="/game1">
                        <Game
                            gameId={games[0].id}
                            opponent={games[0].opponent}
                            to="/game2"
                            endGreeting="Goed zeg, klaar voor het tweede spel?!"
                        />
                    </Route>
                    <Route path="/game2">
                        <Game
                            gameId={games[1].id}
                            opponent={games[1].opponent}
                            to="/game3"
                            endGreeting="Klaar voor de derde?"
                        />
                    </Route>
                    <Route path="/game3">
                        <Game
                            gameId={games[2].id}
                            opponent={games[2].opponent}
                            to="/personal-form"
                            endGreeting="Lekker gedaan hoor, je hoeft hierna niet meer te spelen."
                        />
                    </Route>
                    <Route path="/bye">
                        <Bye></Bye>
                    </Route>
                    <Route path="/retry">
                        <div className="content">
                            <h2>Je kan het maar één keer proberen helaas :)</h2>
                        </div>
                    </Route>
                </Router>
                <Footer />
            </>
        );
    }
}

export default App;
