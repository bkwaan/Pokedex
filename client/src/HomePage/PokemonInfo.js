import React, { Component } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
  ProgressBar,
} from "react-bootstrap";
import Fade from 'react-reveal/Fade';
import CommentBox from "../Comment/CommentBox";
import Comment from "../Comment/Comment";
import ReactDOM from 'react-dom';

class PokemonInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokeInfo: {
        id: "",
        name: "",
        base: [],
        type: [],
      },
      comments: []
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
        console.log(this.state.pokeInfo.name.english);
        fetch("http://localhost:5000/api/Comment/" + this.state.pokeInfo.name.english, {
          method: "GET",
        }).then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.exist) {
              console.log(data.comments);
              this.setState({comments: data.comments}, () => console.log(this.state));
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
    //this.setState({pokeInfo: info});

  };

  GetPokeStat = () => {
    console.log(this.state.pokeInfo.base[2]);
  };

  render() {
    let StatBar = [];
    for (let i = 0; i < 7; i++) {
      StatBar.push(<div className="Stats--PokeInfo"></div>);
    }

    let PokemonType = [];
    for (let i = 0; i < this.state.pokeInfo.type.length; i++) {
      PokemonType.push(
        <Col>
          <div className={"Type " + this.state.pokeInfo.type[i]}>
            {this.state.pokeInfo.type[i]}
          </div>
        </Col>
      );
    }

    let PokemonStat = [];

    PokemonStat.push(
      <div className="Pokemon-Stat">
        <div className="d-flex">
          <Col xs={3}>Attack</Col>
          <Col xs={9}>
            <ProgressBar
              now={this.state.pokeInfo.base.Attack / 2}
              label={`${this.state.pokeInfo.base.Attack / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={3}>HP </Col>
          <Col xs={9}>
            <ProgressBar
              now={this.state.pokeInfo.base.HP / 2}
              label={`${this.state.pokeInfo.base.HP / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={3} className="">
            Defense{" "}
          </Col>
          <Col xs={9}>
            <ProgressBar
              now={this.state.pokeInfo.base.Defense / 2}
              label={`${this.state.pokeInfo.base.Defense / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={3}>Speed </Col>
          <Col xs={9}>
            <ProgressBar
              now={this.state.pokeInfo.base.Speed / 2}
              label={`${this.state.pokeInfo.base.Speed / 2}`}
            ></ProgressBar>
          </Col>
        </div>
      </div>
    );

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

    return (
      <Fade left>
        <Modal
          size="lg"
          show={this.props.pokemonInfo.modalOpen}
          onShow={() => this.GetPokeInfo(this.props.pokemonInfo.id)}
          onHide={this.props.CloseModal}
        >
          <Modal.Header closeButton>

            <div className={"Type " + this.state.pokeInfo.type[0]}>
              #{this.props.pokemonInfo.pokeID} {this.state.pokeInfo.name.english}
            </div>
          </Modal.Header>
          <Modal.Body>
            <Container className="Picture--Name--PokeInfo">
              {/*Picture and Name of Pokemon */}
              <Row>
                <Col>
                  <div className="Picture-Poke">
                    <img
                      className="Picture--PokeInfo"
                      src={
                        "/images/" + this.props.pokemonInfo.pokeID + ".png"
                      }
                    />
                  </div>
                </Col>
                <Col>
                  {PokemonStat}
                  {/* <ListGroup className="Name--PokeInfo">
                      <ListGroup.Item>
                        {this.state.pokeInfo.name.english}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {this.state.pokeInfo.name.french}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {this.state.pokeInfo.name.chinese}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {this.state.pokeInfo.name.japanese}
                      </ListGroup.Item>
                    </ListGroup> */}
                </Col>
              </Row>
              {/*Type of Pokemon */}
              <Row className="Poke--Type">{PokemonType}</Row>

              {/*Comment Section */}
              <CommentBox comments={this.state.comments}/>
              {/* <div id="main"></div>
                </CommentBox> */}

            </Container>
          </Modal.Body>
        </Modal>
      </Fade>

    );
  }
}

export default PokemonInfo;
