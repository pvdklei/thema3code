import Slider from "@material-ui/core/Slider";

export default function (props) {
    return (
        <div className="question-box">
            <p>{props.statement}</p>
            <Slider
                defaultValue={props.val}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                onChange={props.onChange}
                marks
                min={1}
                max={7}
            ></Slider>
        </div>
    );
}
