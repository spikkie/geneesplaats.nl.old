import React from "react";
import "./Home.scss";
import SiteCarousel from "../SiteCarousel";
import IdeaBrowser from "../IdeaBrowser";

class Home extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    //

    componentDidMount() {}

    render() {
        if (this.props.ideaData) {
            return (
                <div>
                    <SiteCarousel ideaData={this.props.ideaData} />
                    <IdeaBrowser ideaData={this.props.ideaData} />
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
}

export default Home;
