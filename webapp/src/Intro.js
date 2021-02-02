import { NextPageButton } from "./buttons";

export default function() {
    return <div className="content">
        <h2 className="content-element">Welkom bij onze enquête + spel</h2>
        <p className="content-element">Eerst ga je een aantal vragen beantwoorden en vervolgens ga je een spel spelen. Doe je best, er staat een prijs op het spel!
</p>
        <NextPageButton to="/form">Volgende</NextPageButton>
    </div>;
}