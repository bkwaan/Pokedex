import React, { Component } from 'react'
import "./Home.css"
import PokemonInfo from "./PokemonInfo.js"
import {Redirect} from "react-router-dom"
import Login from "../Login/Login.js"
import { Navbar, Nav, ListGroup, Container, Row, Col, Form, Button , ProgressBar } from 'react-bootstrap'
import { header } from 'express-validator';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Steel', 'Normal',
            'Fairy', 'Dark', 'Flying', 'Ghost', 'Poison', 'Ice', 'Ground', 
            'Rock', 'Dragon', 'Fighting', 'Bug'],
            typeSelected: "",
            pokemons: [],
            drawerOpen: false,
            pokemonInfo: {
                modalOpen: false,
                id: "",
                pokeID: ""
            },
            redirectTOLogin: false
            
        }
    }
    RedirectLoginPage() {
        console.log("111");
        this.setState({redirectTOLogin: true});
    }

    componentDidMount() {
        this.GetAllPokemon();
    }

    GetAllPokemon = () => {
        fetch('http://localhost:5000/api/Pokemon/', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
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

    TypeFilter = (typeName) => {
        if (typeName.typeName !== this.state.typeSelected) {
            console.log("different type");
            this.setState({typeSelected: typeName.typeName});
            fetch('http://localhost:5000/api/Pokemon/typeFilter/' + typeName.typeName, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ pokemons: data });
            })
            .catch((error) => {
                console.log(error);
            });
        }
        this.HideTypeList();
    }

    ResetFilter = () => {
        this.GetAllPokemon();
        this.setState({typeSelected: ""});
    }

    DisplayIcon = () => {
        document.getElementById("closeIcon-typeSelected--Home").style.display = "inline-block";
    }

    HideIcon = () => {
        document.getElementById("closeIcon-typeSelected--Home").style.display = "none";
    }

    searchPokemon = (event) => {
        let pokeName = event.target.value;
        let firstLetter = pokeName.substring(0,1);
        firstLetter = firstLetter.toUpperCase();
        pokeName = firstLetter + pokeName.substring(1,pokeName.length);
        let container = document.getElementsByClassName('row')[1];
        let childz = container.getElementsByClassName('Pokemon--Home');
        for(var i = 0; i < childz.length; i++) {
            if(!childz[i].className.includes(pokeName)){
                childz[i].parentNode.style.display="none";
            } else {
                childz[i].parentNode.style.display="block";

            }
        }
    
        
        
    }

    render() {
        let testingPokemonList = [];
        if (this.state.redirectTOLogin){
            return <Redirect to="/Login"/>
        }
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
                        <Col xs={1} sm={1} lg={1} xl={1} >
                            <img src="./images/openMenu.svg" className="MenuIcon--Home" onClick={() => this.ShowTypeList()} />
                        </Col>
                        <Col xs={9} sm={9} lg={9} xl={9}>
                            <Form.Row>
                                <Col xs={9}>
                                    <Form.Control placeholder="search" size="sm" className="mr-sm-2" onChange={(event) => this.searchPokemon(event)} />

                                </Col>
                                <Col xs={2}>
                                    <Button variant="secondary" size="sm" >Search</Button>
                                    

                                </Col>
                            </Form.Row>
                        </Col>
                        <Col xs={2} sm={2} lg={2} xl={2}>
                                <Button variant="outline-info" size="large" onClick={()=> this.RedirectLoginPage()}>LOGIN</Button>
                        </Col>
                    </Row>

                    <Container>
                        {this.state.typeSelected !== "" ?
                        <Row>
                            <Col>
                                <div className={"typeSelected--Home " + this.state.typeSelected} onMouseEnter={() => this.DisplayIcon()} onMouseLeave={() => this.HideIcon()}>
                                    <p>{this.state.typeSelected}</p>
                                    <img src="./images/closeBtn.svg" id="closeIcon-typeSelected--Home" onClick={() => this.ResetFilter()}/>
                                </div>
                            </Col>
                        </Row> : null}
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
                                        <Fade left>
                                        <div className={"Pokemon--Home " + pokemon.name.english} onClick={() => this.OpenModal(pokemon.id, pokeID)}>
                                            <img src={"/images/" + pokeID + ".png"} className="pokemonThumbnail--Home" />
                                            <p>{pokemon.name.english}</p>
                                        </div>
                                        </Fade>
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
                            <btn id="TypeContainer" className={typeName} onClick={()=>this.TypeFilter({typeName})}>{typeName}</btn>
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