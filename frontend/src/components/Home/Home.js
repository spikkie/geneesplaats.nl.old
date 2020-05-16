import React, { useState } from "react";
import "./Home.scss";
import SiteCarousel from "../SiteCarousel";
import IdeaBrowser from "../IdeaBrowser";

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
    return <button onClick={props.onClick}>Logout</button>;
}

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && (
                <div>
                    <h2> You have {unreadMessages.length} unread messages. </h2>
                    <h2> You have {unreadMessages} unread. </h2>
                </div>
            )}{" "}
        </div>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number => (
        <li key={number.toString()}>{number}</li>
    ));
    return <ul>{listItems}</ul>;
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), timerID: null, isToggleOn: true };

        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // ask browser to call tick in one second
        // ticke will update the Clock state which triggers to rerender
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        // If the Clock component is ever removed from the DOM, React calls the componentWillUnmount() lifecycle method so the timer is stopped.
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({ date: new Date() });
    }

    // with this syntax this.handleClick = this.handleClick.bind(this);
    // is not needed
    handleClick = () => {
        this.setState(state => ({ isToggleOn: !state.isToggleOn }));
    };

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <button onClick={this.handleClick}>
                    {" "}
                    {this.state.isToggleOn ? "ON" : "OFF"}
                </button>
            </div>
        );
    }
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick = () => {
        this.setState({ isLoggedIn: true });
    };

    handleLogoutClick = () => {
        this.setState({ isLoggedIn: false });
    };

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} /> {button}{" "}
                <div>
                    The user is{" "}
                    <b>{this.state.isLoggedIn ? "currently" : "not"}</b> logged
                    in.
                </div>
            </div>
        );
    }
}

// https://reactjs.org/docs/lifting-state-up.html
//
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

const NewMessageForm = ({ onSend }) => {
    const [inputText, setInputText] = useState("");

    const handleTextChange = event => {
        setInputText(event.target.value);
    };

    const handleSend = () => {
        onSend(inputText);
        setInputText("");
    };

    return (
        <div>
            <input
                type="text"
                data-testid="messageText"
                value={inputText}
                onChange={handleTextChange}
            />
            <button data-testid="sendButton" onClick={handleSend}>
                Send
            </button>
        </div>
    );
};

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: "" };
    }

    handleChange = e => {
        this.setState({ temperature: e.target.value });
    };

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input value={temperature} onChange={this.handleChange} />{" "}
                <BoilingVerdict celsius={parseFloat(temperature)} />{" "}
            </fieldset>
        );
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", messages: [] };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        alert("A name was submitted: " + this.state.value);
        event.preventDefault();
    };

    handleSend = newMessage => {
        // setMessages([newMessage, ...messages]);
        this.setState({ messages: [newMessage, ...this.state.messages] });
    };

    render() {
        if (this.props.ideaData) {
            return (
                <div>
                    <SiteCarousel ideaData={this.props.ideaData} />
                    <IdeaBrowser ideaData={this.props.ideaData} />
                </div>
            );
        } else {
            const numbers = [1, 2, 3, 4, 5];
            const listItems = numbers.map(number => <li>{number}</li>);
            return (
                <div>
                    <Greeting isLoggedIn={false} />
                    <Clock />
                    <LoginControl />
                    <Mailbox
                        unreadMessages={["React", "Re: React", "Re:Re: React"]}
                    />
                    <ul>{listItems}</ul>
                    <NumberList numbers={numbers} />
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />{" "}
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                    <Calculator />
                    <NewMessageForm onSend={this.handleSend} />
                </div>
            );
        }
    }
}

export default Home;
