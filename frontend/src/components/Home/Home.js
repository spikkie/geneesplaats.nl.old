import React from 'react';
import './Home.css';
import SiteCarousel from '../SiteCarousel';
import IdeaBrowser from '../IdeaBrowser';

class Home extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        if (this.props.ideaData) {
            return (
                <div>
                    <SiteCarousel ideaData={this.props.ideaData} />
                    <IdeaBrowser ideaData={this.props.ideaData} />
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Home;
