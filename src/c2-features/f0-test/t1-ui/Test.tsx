import React from "react";
import MyButton from "../../../c0-common/button/MyButton";
import MyCheckbox from "../../../c0-common/checkbox/MyCheckbox";
import MyInput from "../../../c0-common/input/MyInput";
import s from "./Test.module.css";

export const Test = () => {
    return (
        <div className={s.container}>
            <div>
                <MyInput placeholder={"Enter text..."}/>
            </div>
            <div>
                <MyButton title={"My button"}/>
            </div>
            <div>
                <MyCheckbox/>
            </div>
        </div>
    );
};