import React from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";

const TextInput = props => {
    return (
        <input
            className={classNames({
                [styles["text-input"]]: true,
                [styles["warning"]]: props.hasWarning,
                [styles["error"]]: props.hasError
            })}
            type="text"
        />
    );
};

export default TextInput;
