import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

class PokemonInfo extends Component {
    constructor(props) {
        super(props);

        this.state={
            pokeInfo: {
                id: "",
                name: ""
            }
        }
        
    }

    GetPokeInfo = (pokeID)=> {
        let info = {
            id: pokeID,
            name: "Cubone"
        }
        this.setState({pokeInfo: info});
    }

    render() {
        let StatBar = [];
        for (let i = 0; i < 7; i++) {
            StatBar.push(
                <div className="Stats--PokeInfo"></div>
            )
        }

        

        return(
            <Modal size="lg" show={this.props.pokemonInfo.modalOpen} onShow={() => this.GetPokeInfo(this.props.pokemonInfo.id)} onHide={this.props.CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>#{this.state.pokeInfo.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="StatBar--PokeInfo">
                        attack:
                        {StatBar}
                    </div>
                    <img src={"/images/" + this.state.pokeInfo.id + ".png"}/>
                </Modal.Body>
            </Modal>    
        );
    }

}

export default PokemonInfo;