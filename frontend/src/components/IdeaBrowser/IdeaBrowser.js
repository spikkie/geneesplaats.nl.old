import React from 'react';
import './IdeaBrowser.scss';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle,
CardSubtitle, NavLink } from 'reactstrap';
import Numeral from 'numeral';


class IdeaBrowser extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const ideaSelections = this.props.ideaData.map((item) =>{
            return <Col key={item.detailKey + "vb"} md={Math.ceil(12 / this.props.ideaData.length)}>
            <Card>
                <CardImg top width="100%" src={item.thumbnail} alt={item.altText} />
                <CardBody>
                    <CardTitle>{item.year} {item.model}</CardTitle>
                    <CardSubtitle>{item.tagline}</CardSubtitle>
                    <CardText>Start at {Numeral(item.msrp).format('$0,0')}</CardText>
                    <NavLink href={"/detail/" + item.detailKey}>Details</NavLink>
                    <NavLink href="/build-and-price">Build & Price</NavLink>
                    <NavLink href="/find-a-dealer">Dealers Near You</NavLink>
                </CardBody>
            </Card>
        </Col>
        });
        return (
            <div className="ideaBrowser">
                <Container>
                    <Row>
                        {ideaSelections}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default IdeaBrowser;
