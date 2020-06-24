import React, { Component } from 'react'
import "./Home.css"
import PokemonInfo from "./PokemonInfo.js"
import { Navbar, Nav, ListGroup, Container, Row, Col, Form, Button } from 'react-bootstrap'
import { header } from 'express-validator';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testing: [],
            drawerOpen: false,
            pokemonInfo: {
                modalOpen: false,
                id: ""
            }
        }
    }

    componentDidMount() {
        let array = [];
        for (let i = 0; i < 5; i++) {
            array.push("testing" + i);
        }
        this.setState({ testing: array });
    }

    ShowTypeList = () => {
        console.log("showTypeList event triggered!!!");
        this.setState({ drawerOpen: true }, () => this.ToggleTypeList());
        console.log(this.state.drawerOpen);

    }

    HideTypeList = (event) => {
        console.log("HideTypeList event triggered!!!");
        if (this.state.drawerOpen) {
            this.setState({ drawerOpen: false }, () => this.ToggleTypeList());
        }

    }

    ToggleTypeList = () => {
        console.log("ToggleTypeList event triggered!!!");
        const typeList = document.getElementById("PokemonTypeList");
        if (this.state.drawerOpen) {
            typeList.classList.remove("TypeList-Hidden--Home");
            typeList.classList.add("TypeList-Visible--Home");
        } else {
            typeList.classList.remove("TypeList-Visible--Home");
            typeList.classList.add("TypeList-Hidden--Home");
        }
    }

    OpenModal = (pokeID) => {
        const { pokemonInfo } = this.state;
        pokemonInfo["id"] = pokeID;
        pokemonInfo["modalOpen"] = true;
        this.setState({pokemonInfo}, ()=>console.log(this.state));
    }

    CloseModal = () => {
        const { pokemonInfo } = this.state;
        pokemonInfo["modalOpen"] = false;
        this.setState({pokemonInfo}, ()=>console.log(this.state));
    }

    TestRequest = () => {
        console.log("TestRequest funciton called");
        fetch('http://localhost:5000/api', {})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });

    }

    render() {
        let testingPokemonList = [];
        for (let i = 1; i < 119; i++) 
        if (i <= 9){
            testingPokemonList.push(
                <Col xs={6} sm={4} md={3} lg={2} >
                    <div className="Pokemon--Home" onClick={() => this.OpenModal("00" +i)}>
                        <img src={"/images/00" + i + ".png"} className="pokemonThumbnail--Home" /> : 
                        <p>Cubone</p>
                    </div>
                </Col>
            )
        } else if (i <= 99){
            testingPokemonList.push(
                <Col xs={6} sm={4} md={3} lg={2} >
                    <div className="Pokemon--Home" onClick={() => this.OpenModal("0" + i)}>
                        <img src={"/images/0" + i + ".png"} className="pokemonThumbnail--Home" /> 
                        <p>Cubone</p>
                    </div>
                </Col>
            )
        } else {
            testingPokemonList.push(
                <Col xs={6} sm={4} md={3} lg={2} >
                    <div className="Pokemon--Home" onClick={() => this.OpenModal(i)}>
                        <img src={"/images/" + i + ".png"} className="pokemonThumbnail--Home" /> 
                        <p>Cubone</p>
                    </div>
                </Col>
            )
        }

        return (
            <div className="Container--Home" >
                <div className="main--Home" onClick={(event) => this.HideTypeList(event)}>
                    <Row className="NavBar--Home">
                        <Col xs={6} sm={7} lg={8} xl={9} >
                            <img src="./images/openMenu.svg" className="MenuIcon--Home" onClick={() => this.ShowTypeList()} />
                        </Col>
                        <Col xs={6} sm={5} lg={4} xl={3}>
                            <Form.Row>
                                <Col xs={9}>
                                    <Form.Control placeholder="search" size="sm" className="mr-sm-2" />

                                </Col>
                                <Col xs={3}>
                                    <Button variant="secondary" size="sm">Search</Button>

                                </Col>
                            </Form.Row>
                        </Col>
                    </Row>

                    <Container>
                        <Row>
                            <Col>All</Col>
                        </Row>
                        <Row>
                            {testingPokemonList}
                        </Row>
                    </Container>
                </div>
                <div className="TypeList--Home TypeList-Hidden--Home" id="PokemonTypeList" >
                    <div className="TopBar-TypeList--Home">
                        <img src="./images/closeBtn.svg" className="Icon--Home" onClick={(event) => this.HideTypeList(event)} />
                    </div>
                    <ListGroup>
                        {this.state.testing.map((typeName) => (
                            <ListGroup.Item action>{typeName}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                
                <PokemonInfo pokemonInfo={this.state.pokemonInfo} CloseModal={()=>this.CloseModal()}/>
                
                <button onClick={()=>this.TestRequest()}> testing</button>
            </div>
        );
    }
}

export default Home;