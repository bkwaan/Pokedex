import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./Home.css"


class PokemonInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokeInfo: {
        id: "",
        name: "",
        base: {},
        type: [],
      },
    };
  }

  GetPokeInfo = (id) => {
    fetch("http://localhost:5000/api/Pokemon/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ pokeInfo: data });
      })
      .catch((error) => {
        console.log(error);
      });
    //this.setState({pokeInfo: info});
  };

  render() {
    let StatBar = [];
    for (let i = 0; i < 7; i++) {
      StatBar.push(<div className="Stats--PokeInfo"></div>);
    }

    return (
      <div className="modal fade-scale">
        <Modal
          size="lg"
          show={this.props.pokemonInfo.modalOpen}
          onShow={() => this.GetPokeInfo(this.props.pokemonInfo.id)}
          onHide={this.props.CloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>#{this.props.pokemonInfo.pokeID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="StatBar--PokeInfo">
              attack:
              {StatBar}
            </div>
            <img src={"/images/" + this.props.pokemonInfo.pokeID + ".png"} />
            <p>{this.state.pokeInfo.name.english}</p>
            <div>
              <p>HP: {this.state.pokeInfo.base.HP}</p>
              <p>Attack: {this.state.pokeInfo.base.Attack}</p>
              <p>Defense: {this.state.pokeInfo.base.Defense}</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default PokemonInfo;
