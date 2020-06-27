import React, { Component } from 'react'
import { Modal, Container, Row, Col, Form , ListGroup, ListGroupItem , ProgressBar} from 'react-bootstrap'

class PokemonInfo extends Component {
    constructor(props) {
        super(props);

        this.state={
            pokeInfo: {
                id: "",
                name: "",
                base: [],
                type: []

            }
        }
        
    }

    GetPokeInfo = (id)=> {
        fetch('http://localhost:5000/api/Pokemon/' + id, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            this.setState({pokeInfo: data});
        })
        .catch((error) => {
            console.log(error);
        });
        //this.setState({pokeInfo: info});
    }

    GetPokeStat = () => {
        console.log(this.state.pokeInfo.base[2]);
    }

    render() {
        let StatBar = [];
        for (let i = 0; i < 7; i++) {
            StatBar.push(
                <div className="Stats--PokeInfo"></div>
            )
        }

        let PokemonType =[];
        for (let i = 0; i < this.state.pokeInfo.type.length ; i++){
            PokemonType.push(
                <Col>
                    <div className={this.state.pokeInfo.type[i] + "--Type"} >{this.state.pokeInfo.type[i]}</div>
                </Col>
            )
        }
        
        let PokemonStat = []; 
        
        PokemonStat.push(
            <div className="Pokemon-Stat">
                
                <div className="d-flex">
                    <div className="text-left Stats--Attack">Attack </div>
                    <div className="flex-grow-1 Stats--Bar--Attack">
                        <ProgressBar now={this.state.pokeInfo.base.Attack / 2} label={`${this.state.pokeInfo.base.Attack / 2}`}></ProgressBar>
                    </div>
                </div>
                 
                <div className="d-flex">
                    <div className="text-left Stats--Defense">Defense </div>
                    <div className="flex-grow-1 justify-content-end Stats--Bar--Defense">
                        <ProgressBar className="Testing-Defense" now={this.state.pokeInfo.base.Defense / 2} label={`${this.state.pokeInfo.base.Defense / 2}`}></ProgressBar>
                    </div>
                </div>
                        
                <div className="d-flex">
                    <div className="text-left Stats--HP">HP </div>
                    <div className="align-self-end p-2 flex-grow-1 Stats--Bar--HP">
                        <ProgressBar now={this.state.pokeInfo.base.HP / 2} label={`${this.state.pokeInfo.base.HP / 2}`}></ProgressBar>
                    </div>
                </div>
                
                <div className="d-flex">
                    <div className="text-left Stats--Speed">Speed </div>
                    <div className="p-2 flex-grow-1 Stats--Bar--Speed">
                        <ProgressBar now={this.state.pokeInfo.base.Speed / 2} label={`${this.state.pokeInfo.base.Speed / 2}`}></ProgressBar>
                    </div>
                </div>
            </div>         
        )

        // for (let i = 0; i < 5; i++){
        //     PokemonStat.push(
        //         <Row>
        //             <Col>
        //                 <div>{this.state.pokeInfo.base[i]}</div>
        //             </Col>
        //             <Col>
                         
        //                  <ProgressBar now="20"></ProgressBar>
        //             </Col>
                    
                    
        //         </Row>
        //     )
        // }


        

        return(
            <div className="modal fade-scale"> 
            <Modal size="lg" show={this.props.pokemonInfo.modalOpen} onShow={() => this.GetPokeInfo(this.props.pokemonInfo.id)} onHide={this.props.CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        
                            #{this.props.pokemonInfo.pokeID}
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className= "Picture--Name--PokeInfo">
                        {/*Picture and Name of Pokemon */}
                        <Row>
                            <Col>
                                <div className="Picture-Poke" >
                                    <img className="Picture--PokeInfo" src={"/images/" + this.props.pokemonInfo.pokeID + ".png"}/>
                                </div>
                            </Col>
                            <Col>
                                <ListGroup className="Name--PokeInfo">
                                    <ListGroup.Item>{this.state.pokeInfo.name.english}</ListGroup.Item>
                                    <ListGroup.Item>{this.state.pokeInfo.name.french}</ListGroup.Item>
                                    <ListGroup.Item>{this.state.pokeInfo.name.chinese}</ListGroup.Item>
                                    <ListGroup.Item>{this.state.pokeInfo.name.japanese}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        {/*Type of Pokemon */}
                        <Row className="Poke--Type">
                            {PokemonType}
                        </Row>

                        {/*Stats of Pokemon */}
                       
                        {PokemonStat}
                        
                    </Container>
                    
                </Modal.Body>
            </Modal>
            </div>    
        );
    }
}

export default PokemonInfo;
