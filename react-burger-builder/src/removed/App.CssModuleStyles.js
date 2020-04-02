import React from "react";
import styles from "./App.module.css";
import TextInput from "./components/TextInput/TextInput";

function App() {
    return (
        <div className={styles["App"]}>
            <header className={styles["App-header"]}>
                <img src={logo} className={styles["App-logo"]} alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                </a>
                <div>
                    <TextInput ff={"1"} hasWarning={"true"} />
                </div>
            </header>
        </div>
    );
}

export default App;
