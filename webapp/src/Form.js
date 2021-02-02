import SlideStatement from "./SlideStatement";
import { NextPageButton } from "./buttons.js";
import { Padding } from "./base";
import { setSlideStatementVal, slideStatements } from "./data";
import { addToDb } from "./fireStore";
import { useEffect } from "react";

export default function () {
    let slideComponents = slideStatements.map((s, index) => {
        let onChange = function (_, val) {
            setSlideStatementVal(val, index);
        };
        if (s.next_bar) {
            return (
                <div key={s.id}>
                    <SlideStatement
                        statement={s.statement}
                        val={s.value}
                        onChange={onChange}
                    />
                    <Bar />
                </div>
            );
        } else {
            return (
                <SlideStatement
                    key={s.id}
                    statement={s.statement}
                    val={s.value}
                    onChange={onChange}
                />
            );
        }
    });

    function saveFormData() {
        let saveForm = slideStatements.map((e) => {
            return {
                qId: e.id,  
                value: e.value,
            }
        })
        addToDb({ form: saveForm });
    }

    useEffect(_ => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="content">
            <h2 className="content-element">
                Laat ons weten of je het er mee eens bent!
            </h2>
            <p className="content-element">
                Laat ons weten in hoeverre je het met de volgende uitspraken
                eens bent. Kies je '1', dan ben je het er helemaal niet mee
                eens. Kies je '7', dan ben je het er volledig mee eens.
            </p>
            {slideComponents}
            <NextPageButton onClick={saveFormData} to="/game-intro">
                Send
            </NextPageButton>
            <Padding padding="5rem 0"></Padding>
        </div>
    );
}

function Bar() {
    return (
        <div
            className="content_element"
            style={{
                height: "0.2rem",
                backgroundColor: "black",
                width: "100%",
                marginBottom: "5rem",
                marginTop: "2rem",
                borderRadius: "0.5rem"
            }}
        ></div>
    );
}
