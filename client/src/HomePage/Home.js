import React, { Component } from 'react'
import "./Home.css"
import PokemonInfo from "./PokemonInfo.js"
import { Redirect } from "react-router-dom"
import pokemons from "./pokemon.json"
import Login from "../Login/Login.js"
import { Navbar, Nav, ListGroup, Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap'
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
            typeSelected: [],
            search: {
                searchWord: ""
            },
            pokemons: [],
            drawerOpen: false,
            pokemonInfo: {
                modalOpen: false,
                id: "",
                pokeID: "",
                pokemon: {
                    base: {},
                    id: "",
                    name: {},
                    type: []
                }
            },
            redirectTOLogin: false,
            redirectHomePage: false,
            logedIn: (localStorage.getItem("login")=="true"),
            LOGIN: "LOGIN",
            LOGOUT: "LOGOUT"
        }
    }

    Logout = () => {
        localStorage.clear();
        this.RedirectLoginPage();
    }

    RedirectLoginPage() {
        localStorage.setItem("login", "false");
        this.setState({ redirectTOLogin: true });
    }

    // componentDidMount() {
    //     this.GetAllPokemon();
    // }

    // GetAllPokemon = () => {
    //     fetch('http://localhost:5000/api/Pokemon/', {
    //         method: 'GET'
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         this.setState({ pokemons: data });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

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

    // OpenModal = (id, pokeID) => {
    //     const { pokemonInfo } = this.state;
    //     pokemonInfo["id"] = id;
    //     pokemonInfo["pokeID"] = pokeID;
    //     pokemonInfo["modalOpen"] = true;
    //     this.setState({ pokemonInfo }, () => console.log(this.state));
    // }

    OpenModal = (pokeID, pokemon) => {
        const { pokemonInfo } = this.state;
        pokemonInfo["pokeID"] = pokeID;
        pokemonInfo["pokemon"] = pokemon;
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
        let typeAlreadySelected = false;
        const newTypeSelected = this.state.typeSelected;
        console.log(newTypeSelected.length);
        if (this.state.typeSelected.length > 0 && this.state.typeSelected.length <= 2) {
            this.state.typeSelected.map((type) => {
                if (type === typeName.typeName) {
                    typeAlreadySelected = true;
                }
            })
        }
        if (!typeAlreadySelected) {
            if (newTypeSelected.length === 2) {
                newTypeSelected.shift();
            }
            newTypeSelected.push(typeName.typeName);

        }
        this.setState({ typeSelected: newTypeSelected }, console.log(this.state));
        //console.log(newTypeSelected);
        // if (typeName.typeName !== this.state.typeSelected) {
        //     console.log("different type");
        //     this.setState({typeSelected: typeName.typeName});
        //     // fetch('http://localhost:5000/api/Pokemon/typeFilter/' + typeName.typeName, {
        //     //     method: 'GET'
        //     // })
        //     // .then((res) => res.json())
        //     // .then((data) => {
        //     //     console.log(data);
        //     //     this.setState({ pokemons: data });
        //     // })
        //     // .catch((error) => {
        //     //     console.log(error);
        //     // });
        //     
        // }
        console.log(this.state.typeSelected.length);
        this.FilterPoke();
        this.HideTypeList();

    }

    FilterPoke = () => {
        const container = document.getElementsByClassName('row')[1];
        let pokemons;
        if (this.state.search.searchWord === "") {
            pokemons = container.getElementsByClassName("Pokemon--Home")
        } else {
            pokemons = container.getElementsByClassName('Pokemon--Home withSearch');
        }

        if (pokemons.length < 1) {
            return;
        }

        for (let i = 0; i < pokemons.length; i++) {
            let match = true;
            const types = pokemons[i].getElementsByClassName("typeList--Pokemons")[0];
            const typeList = types.getElementsByTagName("li");
            if (this.state.typeSelected.length <= typeList.length) {
                let matches = [];
                this.state.typeSelected.map((typeName, y) => {
                    matches.push(false);
                    for (let x = 0; x < typeList.length; x++) {
                        if (typeList[x].textContent === typeName) {
                            matches[y] = true;
                            break;
                        }
                    }

                });
                for (let x = 0; x < matches.length; x++) {
                    match = match && matches[x];
                }
            } else {
                match = false;
            }

            if (!match) {
                pokemons[i].parentNode.style.display = "none";
                pokemons[i].classList.remove("withFilter");
            } else {
                pokemons[i].parentNode.style.display = "block";
                pokemons[i].classList.add("withFilter");
            }

        }
    }

    ResetFilter = () => {
        const container = document.getElementsByClassName('row')[1];
        let pokemons;
        if (this.state.search.searchWord === "") {
            pokemons = container.getElementsByClassName("Pokemon--Home")
        } else {
            pokemons = container.getElementsByClassName('Pokemon--Home withSearch');
        }


        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].classList.remove("withFilter");
            pokemons[i].parentNode.style.display = "block";
        }

        if (this.state.search.searchWord !== "") {
            this.searchPokemon();
        }
    }

    RemoveSelectedType = (i) => {
        const newSelectedType = this.state.typeSelected;
        newSelectedType.splice(i, 1);
        this.setState({ typeSelected: newSelectedType });
        if (this.state.typeSelected.length > 0) {
            this.FilterPoke();
        } else {
            this.ResetFilter();
        }
    }


    DisplayIcon = (i) => {
        document.getElementsByClassName("closeIcon-typeSelected--Home")[i].style.display = "inline-block";
    }

    HideIcon = (i) => {
        document.getElementsByClassName("closeIcon-typeSelected--Home")[i].style.display = "none";
    }

    getSearchKeyWord = (event) => {
        const { search } = this.state;
        search["searchWord"] = event.target.value;
        this.setState({ search }, console.log(this.state));
        this.searchPokemon();
    }

    searchPokemon = () => {
        let container = document.getElementsByClassName('row')[1];
        let childz;

        console.log("state: " + this.state.typeSelected.length);

        if (this.state.typeSelected.length > 0) {
            childz = container.getElementsByClassName('Pokemon--Home withFilter');

        } else {
            childz = container.getElementsByClassName("Pokemon--Home");
        }

        if (childz.length < 1) {
            return;
        }

        for (var i = 0; i < childz.length; i++) {
            if (!childz[i].id.toLowerCase().includes(this.state.search.searchWord.toLowerCase())) {
                childz[i].parentNode.style.display = "none";
                childz[i].classList.remove("withSearch");
            } else {
                childz[i].parentNode.style.display = "block";
                if (this.state.search.searchWord === "") {
                    childz[i].classList.remove("withSearch");
                } else {
                    childz[i].classList.add("withSearch");
                }
            }
        }

        if (this.state.typeSelected.length > 0) {
            this.FilterPoke();
        }



    }

    setRedirectHomePage (status) {
        this.setState({redirectHomePage: status});

    }

    render() {
        let testingPokemonList = [];
        if (this.state.redirectTOLogin) {
            return <Redirect to="/Login" />
        }
        // if (this.state.redirectHomePage) {
        //     // return <Redirect to="/"/>
        //     window.location.reload(false);
        // }
        console.log(this.state.logedIn);

        return (
            <div className="Container--Home" >
                <div className="main--Home" onClick={() => this.HideTypeList()}>
                    <Row className="NavBar--Home">
                        <Col xs={2} sm={2} lg={2} xl={2} >
                            <img src="./images/openMenu.svg" className="MenuIcon--Home" onClick={() => this.ShowTypeList()} />
                        </Col>
                        {/* <Col xs={1} sm={1} lg={1} xl={1} className="HomeIconContainer--Home">
                            <img className="HomeIcon--Home" onClick={()=> this.setRedirectHomePage(true)}/>
                        </Col> */}
                        <Col xs={7} sm={7} lg={7} xl={7}>
                            {/* <Form.Row>
                                <Col> */}
                                    <Form.Control placeholder="search" size="sm" className="mr-sm-2" onChange={(event) => this.getSearchKeyWord(event)} />
                                {/* </Col>
                            </Form.Row> */}
                        </Col>
                        <Col xs={2} sm={2} lg={2} xl={2}>
                            {this.state.logedIn ?
                                <Button variant="outline-info" size="large" onClick={() => this.Logout()}> {this.state.LOGOUT}</Button> :
                                <Button variant="outline-info" size="large" onClick={() => this.RedirectLoginPage()}>{this.state.LOGIN}</Button>
                            }
                        </Col>
                    </Row>
                    <div className="NavBarContainer-Home"></div>
                    <Container>
                        {this.state.typeSelected.length > 0 ?
                            <div className="typeSelected--TypeFilter">
                                {this.state.typeSelected.map((type, i) => (
                                    <div className={"typeSelected--Home " + type} onMouseEnter={() => this.DisplayIcon(i)} onMouseLeave={() => this.HideIcon(i)}>
                                        <p>{type}</p>
                                        <img src="./images/closeBtn.svg" className={"closeIcon-typeSelected--Home"} onClick={() => this.RemoveSelectedType(i)} />
                                    </div>
                                ))}

                            </div> : null}
                        <Row>
                            {testingPokemonList}
                            {/* {this.state.pokemons.map((pokemon) => { */}
                            {pokemons.map((pokemon) => {
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
                                            {/* <div className="Pokemon--Home" id = {pokemon.name.english} onClick={() => this.OpenModal(pokemon.id, pokeID)}> */}
                                            <div className="Pokemon--Home" id={pokemon.name.english} onClick={() => this.OpenModal(pokeID, pokemon)}>
                                                <img src={"/images/" + pokeID + ".png"} className="pokemonThumbnail--Home" />
                                                <p>{pokemon.name.english}</p>
                                                <ul className="typeList--Pokemons">
                                                    {pokemon.type.map((data) => (<li>{data}</li>))}
                                                </ul>
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
                            <btn id="TypeContainer" className={typeName} onClick={() => this.TypeFilter({ typeName })}>{typeName}</btn>
                        ))}
                    </div>
                    {/* <ListGroup>
                        {this.state.testing.map((typeName) => (
                            <div className={typeName}><ListGroup.Item action>{typeName}</ListGroup.Item></div>
                        ))}
                    </ListGroup> */}
                </div>
                <Rotate>
                    <PokemonInfo pokemonInfo={this.state.pokemonInfo} CloseModal={() => this.CloseModal()} />
                </Rotate>

                {/* <button onClick={() => this.TestRequest()}> testing</button> */}
            </div>
        );
    }
}

export default Home;