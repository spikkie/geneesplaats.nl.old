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

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "coconut" };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };
    handleSubmit = event => {
        alert("Your favorite flavor is: " + this.state.value);
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select
                        //{/* multiple={true} */}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
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
                <Greeting isLoggedIn={isLoggedIn} /> {button}
                <div>
                    The user is
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

const scaleNames = { c: "Celsius", f: "Fahrenheit" };
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = e => {
        this.props.onTemperatureChange(e.target.value);
    };

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>{" "}
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { temperature: "", scale: "c" };
    }

    toCelsius = fahrenheit => {
        return ((fahrenheit - 32) * 5) / 9;
    };

    toFahrenheit = celsius => {
        return (celsius * 9) / 5 + 32;
    };

    tryConvert = (temperature, convert) => {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return "";
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    };

    handleCelsiusChange = temperature => {
        this.setState({ scale: "c", temperature });
    };

    handleFahrenheitChange = temperature => {
        this.setState({ scale: "f", temperature });
    };

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius =
            scale === "f"
                ? this.tryConvert(temperature, this.toCelsius)
                : temperature;
        const fahrenheit =
            scale === "c"
                ? this.tryConvert(temperature, this.toFahrenheit)
                : temperature;
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />{" "}
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />{" "}
                <BoilingVerdict celsius={parseFloat(celsius)} />{" "}
            </div>
        );
    }
}

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.name === "isGoing" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}

function FancyBorder(props) {
    return (
        <div className={"FancyBorder FancyBorder-" + props.color}>
            {props.children}
        </div>
    );
}
function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title"> Welcome </h1>{" "}
            <p className="Dialog-message">
                {" "}
                Thank you for visiting our spacecraft!{" "}
            </p>{" "}
        </FancyBorder>
    );
}

function Contacts() {
    return (
        <div>
            <p1>A</p1> <br />
            <p2>B</p2>
            <p1>C</p1>
            <p1>D</p1>
        </div>
    );
}
function Chat() {
    return (
        <div>
            <p1>Chat A</p1>
            <p1>Chat B</p1>
            <p1>Chat C</p1>
            <p1>Chat D</p1>
        </div>
    );
}
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left} </div>
            <div className="SplitPane-right">{props.right} </div>
        </div>
    );
}

// ---------------------------------------------------------
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            {props.children}{" "}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: "" };
    }

    render() {
        return (
            <Dialog
                title="Mars Exploration Program"
                message="How should we refer to you?"
            >
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}> Sign Me Up! </button>
            </Dialog>
        );
    }

    handleChange = e => {
        this.setState({ login: e.target.value });
    };

    handleSignUp = () => {
        alert(`Welcome aboard, ${this.state.login}!`);
    };
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
                    <ul>
                        {numbers.map(number => (
                            <li>nr: {number}</li>
                        ))}
                    </ul>
                    <FlavorForm></FlavorForm>
                    <Reservation></Reservation>
                    <p>------------</p>
                    <p>------------</p>
                    <WelcomeDialog></WelcomeDialog>
                    <SplitPane left={<Contacts />} right={<Chat />} />
                    <p>------------</p>
                    <p>------------</p>
                    <SignUpDialog></SignUpDialog>
                </div>
            );
        }
    }
}

export default Home;
