import { useState } from "react";
import { Link } from "react-router-dom";

export function NextPageButton(props) {
    const active = props.active === undefined ? true : props.active;
    return active ? (
        <Link className="button main-button" to={props.to} onClick={props.onClick}>
            {props.children}
        </Link>
    ) : <></>;
}

export function NextRoundButton(props) {

    let style = !props.available ? {
        backgroundColor: "#eeeeee",
        color: "gray"
    } : {};
    
    return (
        <div className="button next-round-button" onClick={props.action} style={style}>
            Volgende Ronde
        </div>
    );
}

export function GameActionButton(props) {
    return (
        <div className={`${props.selected ? "selected" : ""} game-action-button`} onClick={props.action}>
            {props.children}
        </div>
    );
}
