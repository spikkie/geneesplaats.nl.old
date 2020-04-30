import React from 'react';
import './Footer.scss';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <footer>
            <a href="/schedule-test-flight">Schedule a Test Flight! No pilot's license required</a>
        </footer>
    }
}

export default Footer;