import React, { Component } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import ReactDOM from "react-dom";
import { Button } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Select , NativeSelect} from '@material-ui/core';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      showLike: false,
      editCheck: false,
      bool: false,
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show Comments";

    console.log(this.state.bool);

    if (this.state.showComments) {
      buttonText = "Hide Comments";
      console.log(comments);
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    let postCommentText="Post Comment"
    let commentForm;
    let userName = this.state.userName;
    
    
    if(!this.props.userName){
      
    } else {
      commentForm=<CommentForm
      formType={postCommentText}
      GetComment={this.props.GetComment.bind(this)}
      pokeName={this.props.pokeName}
      userName={this.props.userName}
      />
    }
    

    return (
      <div className="comment-box">
        <h2 >Join the Discussion!</h2>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        {commentForm}
        <Button
          variant="contained"
          id="comment-reveal"
          onClick={this._handleClick.bind(this)}
        >
          {buttonText}
        </Button>
        <br></br>
        <div>
          Sorted By: 
        </div>
        <Select id="select" onChange={(e) => this._sortComment(e)}>
          <option value="best">best</option>
          <option value="new">new</option>
          <option value="old">old</option>
        </Select>
        

        {commentNodes}
      </div>
    );
  } // end render

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  _handleLike(){
    //Need to send a boolean to database and fetch it to change likes for each comment based on user id

    this.setState({
      showLike: !this.state.showLike,
    });
  }
  

  _getComments() {
    let commentNodes;
    //For loop to load comment Node
    let likeStatus = false;
    

    return this.props.comments.map((comment) => {
      
      let commentCount;

      commentCount += 1;
      console.log(commentCount);

      let currentUserName = this.props.userName;
      let commentFooter;

      // let likeStatus = this.getLikeStatus(comment._id, this.props.pokeName, currentUserName)
      let likeStatus = this.getLikeStatus(comment.likes, currentUserName);
      console.log(comment._id + this.props.pokeName + currentUserName);
      let likeHeart;
      console.log(this.state.bool);
      if (this.state.bool){
        likeHeart=
        <div onClick ={() => this._unLike(this.props.pokeName, comment._id)}>
            <FavoriteIcon ></FavoriteIcon>
            Blank heart
        </div>
        
      } else {
        likeHeart=
        <div onClick = {() => this._addLikes(this.props.pokeName, comment._id)}>
            <FavoriteBorderIcon></FavoriteBorderIcon>
            Filled heart
        </div>
      }


      let notLike = <FavoriteBorderIcon></FavoriteBorderIcon>;
      let editCommentText="Edit Comment"

      let editForm = comment.post;

      if (this.state.editCheck){
        editForm = <CommentForm formType={editCommentText}></CommentForm>
      }

      let divHide = {
        display: 'none'
      }

      if (comment.username == currentUserName){
        commentFooter = 
          <div className="comment-footer">
            <section>
              <Button
                href="#"
                className="comment-footer-delete"
                onClick={() =>
                  this._deleteComment(this.props.pokeName, comment._id)
                }
              >
                Delete Comment
              </Button>
              <Button 
                
                onClick={() =>
                  this._commentHide(comment._id)
                }
              >
                Edit Comment
              </Button>
            </section>
          </div>

      } else {
        console.log(comment.userName + " Comparing commment/user " + currentUserName);
        commentFooter = <div></div>;
      }
      
      
        
      return (
        <div className="comment">
          <div className="comment-entry">
            <div className="comment-top">
              <div className="comment-like" id={comment._id + "-like"} >
                {likeHeart}
                {/* <div style={divHide} onClick={() => this._getLikes(this.props.pokeName, comment._id)}>
                  <FavoriteIcon ></FavoriteIcon>
                </div>
                <div onClick={() => this._getLikes(this.props.pokeName, comment._id)}>
                 <FavoriteBorderIcon></FavoriteBorderIcon>
                </div> */}
                <div className="like-count">{comment.likes.length}</div>
              </div>
              
              <header className="comment-user">
                <section className="comment-detail">
                  <a className="comment-username">{comment.username}</a>
                   <span> : </span>
                  <a className="comment-time">{comment.date.substring(0,10)}</a>
                </section>
              </header>
            </div>

            <div className="comment-bottom">
              <section>

                <div className="comment-body" id={comment._id}>

                  <div style={divHide}>
                    <CommentForm formType={editCommentText}
                        _editComment={this._editComment.bind(this)}
                        pokeName ={this.props.pokeName}
                        id = {comment._id}
                        GetComment={this.props.GetComment.bind(this)}
                    ></CommentForm>
                  </div>

                  <div className="">
                    {comment.post}
                  </div>
                  
                </div>

              </section>
            </div>

            {commentFooter}
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
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
      });

    this.props.GetComment();
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }

  //Like function
  _addLikes(pokeName, id) {
   
    fetch("http://localhost:5000/api/Comment/addLike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pokeName: pokeName,
        id: id,
        username: this.props.userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        this.props.GetComment();
      });
      
  }

  _unLike(pokeName, id) {
    fetch("http://localhost:5000/api/Comment/unlike", {
      method: "POST",
      headers: {"content-Type": "application/json" },
      body: JSON.stringify({
        pokeName: pokeName,
        id: id,
        username: this.props.userName
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      if (data.success) {
        this.props.GetComment();
      }
      
    });
  }

  _editComment(pokeName, id, newComment) {
    

    console.log("Comment Box Edit comment function is called!");
    this.setState({
      editCheck: !this.state.editCheck,
    });

    fetch("http://localhost:5000/api/Comment/editPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        pokeName: pokeName,
        post: newComment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.success){
        this.props.GetComment();
        } else {
          console.log("fuck");
        }
      });
  }

  _commentHide(_id){
    let commentForm = document.getElementById(_id).childNodes[0].style.display;
    
    if(commentForm == "none"){
      document.getElementById(_id).childNodes[0].style.display = "";
      document.getElementById(_id).childNodes[1].style.display = "none";
    } else {
      document.getElementById(_id).childNodes[0].style.display = "none";
    document.getElementById(_id).childNodes[1].style.display = "";
    }
  }


  _sortComment(e){
    console.log("sort function called");
      if(e.target.value=="old"){
        this.props.SortByOld();
      } else if (e.target.value=="new"){
        this.props.SortByNew();
      } else if (e.target.value=="best"){
        console.log("best sort called");
        this.props.SortByBest();
      }
  }

  getLikeStatus = (id, pokeName, username) => {
    console.log("get Like status getting call")
    fetch(
      "http://localhost:5000/api/Comment/likes/" +
        id +
        "/" +
        pokeName +
        "/" +
        username,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("get like status getting a respond back");
        console.log(data.message);
        return data.success;
      })
      .then((err) => {
        console.log(err);
        
      });
  };

  getLikeStatus = (likeArray, currentUserName) => {
    let commentLiked = false;
    if (likeArray.length < 1 ) {
      return false;
    }
    for ( let i = 0; i < likeArray.length; i++) {
      if (currentUserName === likeArray[i].username) {
        commentLiked = true;
      }
    }
    // console.log("getLikeStatus array: ");
    // console.log(likeArray);
    return commentLiked;
  }
  
} // end CommentBox component

export default CommentBox;
