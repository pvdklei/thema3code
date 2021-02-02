import {
    TextField,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
} from "@material-ui/core";
import { useState } from "react";
import { Padding } from "./base";
import { NextPageButton } from "./buttons";
import Question from "./Question";
import {
    personalQuestions,
    personalQuestions as qs,
    setPQVal,
    updatePQsessionStorage,
} from "./data";
import { addToDb } from "./fireStore";

export default function () {
    let [age, setAge] = useState(personalQuestions.age.value);
    let [email, setEmail] = useState(personalQuestions.email.value);
    let [sex, setSex] = useState(personalQuestions.sex.value);
    let [remarks, setRemarks] = useState(personalQuestions.remarks.value);
    let [knewPd, setKnewPd] = useState(personalQuestions.knewPd.value);

    function updatePQStore() {
        setPQVal("age", age);
        setPQVal("email", email);
        setPQVal("sex", sex);
        setPQVal("remarks", remarks);
        setPQVal("knewPd", knewPd);
        updatePQsessionStorage();

        let questions = [];
        Object.keys(personalQuestions).forEach((key) => {
            let q = personalQuestions[key];
            questions.push({
                id: q.id,
                value: q.value,
            });
        });

        addToDb({ personalQuestions: questions });
    }

    return (
        <div className="content">
            <h2 className="content-element">
                Ten slotte hebben we een paar vragen over jou.
            </h2>
            <Question question={qs.age.question}>
                <TextField
                    id="outlined-basic"
                    label="leeftijd"
                    variant="outlined"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                        updatePQStore();
                    }}
                />
            </Question>
            <Question question={qs.sex.question}>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label={qs.sex.id}
                        name={qs.sex.id}
                        value={sex}
                        onChange={(e) => {
                            setSex(e.target.value);
                            updatePQStore();
                        }}
                    >
                        <FormControlLabel
                            value="man"
                            control={<Radio />}
                            label="man"
                        />
                        <FormControlLabel
                            value="vrouw"
                            control={<Radio />}
                            label="vrouw"
                        />
                        <FormControlLabel
                            value="anders"
                            control={<Radio />}
                            label="anders"
                        />
                    </RadioGroup>
                </FormControl>
            </Question>

            <Question question={qs.knewPd.question}>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label={qs.knewPd.id}
                        name={qs.knewPd.id}
                        value={knewPd}
                        onChange={(e) => {
                            setKnewPd(e.target.value);
                            updatePQStore();
                        }}
                    >
                        <FormControlLabel
                            value="ja"
                            control={<Radio />}
                            label="ja"
                        />
                        <FormControlLabel
                            value="nee"
                            control={<Radio />}
                            label="nee"
                        />
                    </RadioGroup>
                </FormControl>
            </Question>

            <Question question={qs.email.question}>
                <TextField
                    id="outlined-basic"
                    label={qs.email.id}
                    variant="outlined"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        updatePQStore();
                    }}
                />
            </Question>

            <Question question={qs.remarks.question}>
                <TextField
                    id="outlined-basic"
                    label={qs.remarks.id}
                    variant="outlined"
                    value={remarks}
                    onChange={(e) => {
                        setRemarks(e.target.value);
                        updatePQStore();
                    }}
                />
            </Question>

            <NextPageButton to="/bye" onClick={updatePQStore}>
                Volgende
            </NextPageButton>
            <Padding padding="3rem"></Padding>
        </div>
    );
}
