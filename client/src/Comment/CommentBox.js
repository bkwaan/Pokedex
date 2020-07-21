import React, { Component } from "react";
import CommentForm from "./CommentForm"
import Comment from "./Comment"
import ReactDOM from 'react-dom';
import {Button} from '@material-ui/core'



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
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          <CommentForm GetComment={this.props.GetComment.bind(this)} pokeName ={this.props.pokeName} addComment={this._addComment.bind(this)}/>
          <Button variant="contained" id="comment-reveal" onClick={this._handleClick.bind(this)}>
              {buttonText}
          </Button>
          
          {commentNodes}
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
          <div className="comment-entry">
            
            <div className="comment-top"> 
              <div className="comment-like">
                  <img src="./images/heart.png" className="like-image" onClick=""></img>
                  <div className="like-count">{comment.likes}</div>
              </div>

              <header className="comment-user">
                <section className="comment-detail">
                  <a className="comment-username">{comment.username}</a>
                  <span> : </span>
                  <a className="comment-time">{comment.date}</a>
                </section>
              </header>
            </div>

            <div className="comment-bottom">
              <section>
                <div className="comment-body">
                  <div>
                    {comment.post}
                  </div>
                </div>
              </section>
            </div>

            <div className="comment-footer">
              <section>
                <Button href="#"
                className="comment-footer-delete"
                onClick={() => this._deleteComment(this.props.pokeName, comment._id)}>Delete Comment</Button>
                <Button
                onClick={() => this._editComment(this.props.pokeName, comment._id)}>
                  Edit Comment
                </Button>
              </section>
            </div>
          </div>  
            {/* <p className="comment-header">{comment.username}</p>
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
          </div> */}
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

      this.props.GetComment();
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

    //Like function
    _getLikes(){

    }

    _editComment(pokeName, id){

    }
  } // end CommentBox component

  export default CommentBox;
