import pd from "./pd.jpg";

export default function () {
    return (
        <img
            src={pd}
            alt="The prisoners dilemma"
            style={{
                height: "12rem",
                border: "1px solid black",
                borderRadius: "0.5rem",
                marginBottom: "3rem",
                boxShadow: "1rem 1rem grey",
            }}
        />
    );
}
