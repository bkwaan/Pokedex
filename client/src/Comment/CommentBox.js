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
        </div>  
      );
    } // end render
    
    _addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        userName: author,
        post: body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
      
      //add comment function from props? which fetch to add the comment to the server side and update the state on PokemonInfo as well?
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      return this.props.comments.map((comment) => { 
        return (
          <Comment 
            author={comment.userName} 
            body={comment.post} 
            date={comment.date}
            likes={comment.likes} />
        ); 
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
