
export default function Question(props) {

    let style = {
        backgroundColor: props.color ? props.color : "white",
        color: props.textcolor ? props.textcolor : "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 3rem",
        borderRadius: "1rem", 
        border: "2px solid black"
    };

    let styleP = {marginBottom: "2rem"}

    return <div className="content-element" style={style}>
        <p style={styleP}>{props.question}</p>
        {props.children}
    </div>
}