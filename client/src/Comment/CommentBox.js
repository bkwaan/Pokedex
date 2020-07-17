import React, { Component } from "react";
import CommentForm from "./CommentForm"
import Comment from "./Comment"
import ReactDOM from 'react-dom';



class CommentBox extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showComments: false,
        comments: [
          {id: 1, author: "Bosco", body: "This is my first comment on this forum so don't be a dick"},
          {id: 2, author: "Tejinder", body: "That's a mighty fine comment you've got there my good looking fellow..."},
          {id: 3, author: "Tedwin", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
        ]
      };
    }
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';

      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <h2>Join the Discussion!</h2>
          <CommentForm addComment={this._addComment.bind(this)}/>
          <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}

          
          <div className="comment-entry">
            
            <div className="comment-top"> 
              <div className="comment-like">
                  <img src="./images/heart.png" className="like-image" onClick=""></img>
                  <div className="like-count"> 1</div>
              </div>

              <header className="comment-user">
                <section className="comment-detail">
                  <a className="comment-username">Jun Jeong</a>
                  <span> : </span>
                  <a className="comment-time">2 Minutes ago</a>
                </section>
              </header>
            </div>

            <div className="comment-bottom">
              <section>
                <div className="comment-body">
                  <div>
                  This Pokemon is cool
                  </div>
                </div>
              </section>
            </div>
              
          </div>

          <div className="comment-entry">
            
            <div className="comment-top"> 
              <div className="comment-like">
                  <img src="./images/heart.png" className="like-image" onClick=""></img>
                  <div className="like-count"> 1</div>
              </div>

              <header className="comment-user">
                <section className="comment-detail">
                  <a className="comment-username">Jun Jeong</a>
                  <span> : </span>
                  <a className="comment-time">2 Minutes ago</a>
                </section>
              </header>

              <div className="comment-features">
                <button className="" onClick=""> 
                  edit comment
                </button>
                  
                <button onClick="">
                  delete comment
                </button>

              </div>
            </div>

            <div className="comment-bottom">
              <section>
                <div className="comment-body">
                  <div>
                  This Pokemon is cool
                  </div>
                </div>
              </section>
            </div>
              
          </div>
        </div>  
      );
    } // end render
    
    _addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        userName: author,
        post: body
      };

      //Send the comment object to the server (database)


      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
      
      //add comment function from props? which fetch to add the comment to the server side and update the state on PokemonInfo as well?
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      let commentNodes;
      //For loop to load comment Nodes
      
      console.log("get Comments is getting called");
      
      return this.props.comments.map((comment) => { 
        return (
          <div className="comment">
            <p className="comment-header">{comment.username}</p>
            <p className="comment-body">- {comment.post}</p>
            <div className="comment-footer">
            <p>{this.props.pokeName}</p>
            <p>{comment._id}</p>

            <a
            href="#"
            className="comment-footer-delete"
            onClick={() => this._deleteComment(this.props.pokeName, comment._id)}
            >
            
            Delete Comment
            </a>
          </div>
          </div>
        ); 
      });
    }

    _deleteComment(pokeName, id) {
      fetch("http://localhost:5000/api/Comment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokeName: pokeName,
          id: id
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
    
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } // end CommentBox component

  export default CommentBox;
