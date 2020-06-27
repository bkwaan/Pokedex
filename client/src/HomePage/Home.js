import React, { Component } from 'react'
import "./Home.css"
import PokemonInfo from "./PokemonInfo.js"
import { Navbar, Nav, ListGroup, Container, Row, Col, Form, Button , ProgressBar } from 'react-bootstrap'
import { header } from 'express-validator';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            pokemons: [],
            drawerOpen: false,
            pokemonInfo: {
                modalOpen: false,
                id: "",
                pokeID: ""
            }
        }
    }

    componentDidMount() {
        const types = ['Fire', 'Water', 'Grass', 'Eletric', 'Psychic', 'Steel', 'Normal',
                            'Fairy', 'Dark', 'Flying', 'Ghost', 'Poison', 'Ice', 'Ground', 
                            'Rock', 'Dragon', 'Fighting', 'Bug'];
        
        this.setState( {types: types});

        fetch('http://localhost:5000/api/Pokemon/', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            data.shift();
            this.setState({ pokemons: data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    ShowTypeList = () => {
        console.log("showTypeList event triggered!!!");
        this.setState({ drawerOpen: true }, () => this.ToggleTypeList());
        console.log(this.state.drawerOpen);

    }

    HideTypeList = () => {
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

    OpenModal = (id, pokeID) => {
        const { pokemonInfo } = this.state;
        pokemonInfo["id"] = id;
        pokemonInfo["pokeID"] = pokeID;
        pokemonInfo["modalOpen"] = true;
        this.setState({ pokemonInfo }, () => console.log(this.state));
    }

    CloseModal = () => {
        const { pokemonInfo } = this.state;
        pokemonInfo["modalOpen"] = false;
        this.setState({ pokemonInfo }, () => console.log(this.state));
    }

    TestRequest = () => {
        console.log("TestRequest funciton called");
        fetch('http://localhost:5000/api/Pokemon/all', {
            method: 'GET'
        })
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
        // for (let i = 1; i < this.state.pokemons.length; i++) {
        //     if (i <= 9) {
        //         testingPokemonList.push(
        //             <Col xs={6} sm={4} md={3} lg={2} >
        //                 <div className="Pokemon--Home" onClick={() => this.OpenModal("00" + i)}>
        //                     <img src={"/images/00" + i + ".png"} className="pokemonThumbnail--Home" /> :
        //                 <p>Cubone</p>
        //                 </div>
        //             </Col>
        //         )
        //     } else if (i <= 99) {
        //         testingPokemonList.push(
        //             <Col xs={6} sm={4} md={3} lg={2} >
        //                 <div className="Pokemon--Home" onClick={() => this.OpenModal("0" + i)}>
        //                     <img src={"/images/0" + i + ".png"} className="pokemonThumbnail--Home" />
        //                     <p>Cubone</p>
        //                 </div>
        //             </Col>
        //         )
        //     } else {
        //         testingPokemonList.push(
        //             <Col xs={6} sm={4} md={3} lg={2} >
        //                 <div className="Pokemon--Home" onClick={() => this.OpenModal(i)}>
        //                     <img src={"/images/" + i + ".png"} className="pokemonThumbnail--Home" />
        //                     <p>Cubone</p>
        //                 </div>
        //             </Col>
        //         )
        //     }
        // }

        return (
            <div className="Container--Home" >
                <div className="main--Home" onClick={(  ) => this.HideTypeList()}>
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
                            {this.state.pokemons.map((pokemon) => {
                                let pokeID = ""
                                if (pokemon.id < 10) {
                                    pokeID = "00" + pokemon.id;
                                } else if (pokemon.id < 100) {
                                    pokeID = "0" + pokemon.id;
                                } else {
                                    pokeID = pokemon.id
                                }
                                return (
                                    <Col xs={6} sm={4} md={3} lg={2} >
                                        <div className="Pokemon--Home" onClick={() => this.OpenModal(pokemon.id, pokeID)}>
                                            <img src={"/images/" + pokeID + ".png"} className="pokemonThumbnail--Home" />
                                            <p>{pokemon.name.english}</p>
                                        </div>
                                    </Col>)
                            })}
                        </Row>
                    </Container>
                </div>
                <div className="TypeList--Home TypeList-Hidden--Home" id="PokemonTypeList" >
                    <div className="TopBar-TypeList--Home">
                        <div className="TypeTextContainer">
                            <p className="TypeText">TYPES</p>
                        </div>
                        <img src="./images/closeBtn.svg" className="Icon--Home" onClick={(event) => this.HideTypeList(event)} />
                    </div>
                    <div className="TypeListContainer">
                        {this.state.types.map((typeName) => (
                            <btn id="TypeContainer" className={typeName}>{typeName}</btn>
                        ))}
                    </div>
                    {/* <ListGroup>
                        {this.state.testing.map((typeName) => (
                            <div className={typeName}><ListGroup.Item action>{typeName}</ListGroup.Item></div>
                        ))}
                    </ListGroup> */}
                </div>

                <PokemonInfo pokemonInfo={this.state.pokemonInfo} CloseModal={() => this.CloseModal()} />

                {/* <button onClick={() => this.TestRequest()}> testing</button> */}
            </div>
        );
    }
}

export default Home;