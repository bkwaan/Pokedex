import React, { Component } from 'react'
import "./Home.css"
import PokemonInfo from "./PokemonInfo.js"
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
            typeSelected: [],
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
        this.GetAllPokemon();
    }

    GetAllPokemon = () => {
        fetch('http://localhost:5000/api/Pokemon/', {
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
        this.setState({typeSelected: newTypeSelected}, console.log(this.state));
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
        const pokemons = container.getElementsByClassName('Pokemon--Home');
        
        for (let i = 0; i < pokemons.length; i++) {
            let match = false;
            const types = pokemons[i].getElementsByClassName("typeList--Pokemons")[0];
            if (this.state.typeSelected.length <= types.length) {
                this.state.typeSelected.map((typeName) => {
                    for (let x = 0; x < types.length; x++) {
                        if(types[x] === typeName) {
                            if(x < 1){
                                match = true;
                            } else {
                                match = match && true;
                            }
                        }
                    }
                });         
            } 
            if (!match) {
                 pokemons[i].parentNode.style.display = "none";
            } else {
                pokemons[i].parentNode.style.display = "block";
            }
        }
    }

    ResetFilter = () => {
        const container = document.getElementsByClassName('row')[1];
        const pokemons = container.getElementsByClassName('Pokemon--Home');

        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].parentNode.style.display = "block";
        }
    }

    RemoveSelectedType = (i) => {
        const newSelectedType = this.state.typeSelected;
        newSelectedType.splice(i, 1);
        this.setState({typeSelected: newSelectedType});
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

    searchPokemon = (event) => {
        let container = document.getElementsByClassName('row')[1];
        let childz = container.getElementsByClassName('Pokemon--Home');
        for(var i = 0; i < childz.length; i++) {
            if(!childz[i].className.includes(event.target.value)){
                childz[i].parentNode.style.display="none";
            } else {
                childz[i].parentNode.style.display="block";

            }
        }
    
        
        
    }

    render() {
        let testingPokemonList = [];

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
                                    <Form.Control placeholder="search" size="sm" className="mr-sm-2" onChange={(event) => this.searchPokemon(event)} />

                                </Col>
                                <Col xs={3}>
                                    <Button variant="secondary" size="sm">Search</Button>

                                </Col>
                            </Form.Row>
                        </Col>
                    </Row>

                    <Container>
                        {this.state.typeSelected.length > 0 ?
                        <div className="typeSelected--TypeFilter">
                            {this.state.typeSelected.map((type, i) => (
                                <div className={"typeSelected--Home " + type} onMouseEnter={() => this.DisplayIcon(i)} onMouseLeave={() => this.HideIcon(i)}>
                                    <p>{type}</p>
                                    <img src="./images/closeBtn.svg" className={"closeIcon-typeSelected--Home"} onClick={() => this.RemoveSelectedType(i)}/>
                                </div>
                            ))}

                        </div> : null}
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
                            <btn id="TypeContainer" className={typeName} onClick={()=>this.TypeFilter({typeName})}>{typeName}</btn>
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