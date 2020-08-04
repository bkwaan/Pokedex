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
import Fade from "react-reveal/Fade";
import CommentBox from "../Comment/CommentBox";
import Comment from "../Comment/Comment";
import ReactDOM from "react-dom";
import "./PokemonInfo.css";

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
      comments: [],
      Username: "",
    };
  }

  getUserName = () => {
    const session = localStorage.getItem("SessionID");
    fetch("http://localhost:5000/api/User/Session/" + session, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ Username: data.User });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  GetPokeInfo = (id) => {
    fetch("http://localhost:5000/api/Pokemon/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pokeInfo: data }, () => this.GetComment());
      })
      .catch((error) => {
        console.log(error);
      });
    //this.setState({pokeInfo: info});
  };

  GetComment = (name) => {
    fetch(
      "http://localhost:5000/api/Comment/" +
        this.props.pokemonInfo.pokemon.name.english,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.exist) {
          this.setState({ comments: data.comments });
        } else {
          this.setState({ comments: [] });
        }
      });
  };

  getCommentSession = () => {
    this.getUserName();
    this.GetComment();
  };

  GetPokeStat = () => {
    // console.log(this.state.pokeInfo.base[2]);
  };

  _sortCommentNewest() {
    let commentSort = this.state.comments;
    commentSort.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
    this.setState({ comments: commentSort });
  }

  _sortCommentOldest() {
    let commentSort = this.state.comments;
    commentSort.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    });
    this.setState({ comments: commentSort });
  }

  _sortCommentBest() {
    let commentSort = this.state.comments;
    commentSort.sort(function compare(a, b) {
      return b.likes - a.likes;
    });
    this.setState({ comments: commentSort });
  }

  render() {
    let StatBar = [];
    for (let i = 0; i < 7; i++) {
      StatBar.push(<div className="Stats--PokeInfo"></div>);
    }

    let PokemonType = [];
    for (let i = 0; i < this.props.pokemonInfo.pokemon.type.length; i++) {
      PokemonType.push(
        <Col>
          <div className={"Type " + this.props.pokemonInfo.pokemon.type[i]}>
            {this.props.pokemonInfo.pokemon.type[i]}
          </div>
        </Col>
      );
    }

    let PokemonStat = [];

    PokemonStat.push(
      <div className="Pokemon-Stat">
        <div className="d-flex">
          <Col xs={4}>Attack</Col>
          <Col xs={8}>
            <ProgressBar
              now={this.props.pokemonInfo.pokemon.base.Attack / 2}
              label={`${this.props.pokemonInfo.pokemon.base.Attack / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={4}>HP </Col>
          <Col xs={8}>
            <ProgressBar
              now={this.props.pokemonInfo.pokemon.base.HP / 2}
              label={`${this.props.pokemonInfo.pokemon.base.HP / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={4} className="">
            Defense{" "}
          </Col>
          <Col xs={8}>
            <ProgressBar
              now={this.props.pokemonInfo.pokemon.base.Defense / 2}
              label={`${this.props.pokemonInfo.pokemon.base.Defense / 2}`}
            ></ProgressBar>
          </Col>
        </div>

        <div className="d-flex">
          <Col xs={4}>Speed </Col>
          <Col xs={8}>
            <ProgressBar
              now={this.props.pokemonInfo.pokemon.base.Speed / 2}
              label={`${this.props.pokemonInfo.pokemon.base.Speed / 2}`}
            ></ProgressBar>
          </Col>
        </div>
      </div>
    );

    return (
      <Fade left>
        <Modal className = "ModalContainer--PokeInfo"
          size="lg"
          show={this.props.pokemonInfo.modalOpen}
          onShow={() => this.getCommentSession()}
          onHide={this.props.CloseModal}
        >
          <Modal.Header className={this.props.pokemonInfo.pokemon.type[0]}>
            <div className={"Type " + this.props.pokemonInfo.pokemon.type[0]}>
              #{this.props.pokemonInfo.pokeID}{" "}
              {this.props.pokemonInfo.pokemon.name.english}
            </div>
          </Modal.Header>
          <Modal.Body>
            <Container className="Picture--Name--PokeInfo">
              <Row className="ImageStatRowContainer--PokeInfo">
                <Col>
                  <div className="Picture-Poke">
                    <img
                      className="Picture--PokeInfo"
                      src={"/images/" + this.props.pokemonInfo.pokeID + ".png"}
                    />
                  </div>
                </Col>
                <Col>{PokemonStat}</Col>
              </Row>
              <Row className="Poke--Type">{PokemonType}</Row>
              <CommentBox
                SortByBest={this._sortCommentBest.bind(this)}
                SortByOld={this._sortCommentOldest.bind(this)}
                SortByNew={this._sortCommentNewest.bind(this)}
                GetComment={this.GetComment.bind(this)}
                comments={this.state.comments}
                pokeName={this.props.pokemonInfo.pokemon.name.english}
                userName={this.state.Username}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </Fade>
    );
  }
}

export default PokemonInfo;
