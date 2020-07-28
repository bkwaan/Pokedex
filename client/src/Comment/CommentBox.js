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
      comments: [
        {
          id: 1,
          author: "Bosco",
          body: "This is my first comment on this forum so don't be a dick",
        },
        {
          id: 2,
          author: "Tejinder",
          body:
            "That's a mighty fine comment you've got there my good looking fellow...",
        },
        {
          id: 3,
          author: "Tedwin",
          body: "What is the meaning of all of this 'React' mumbo-jumbo?",
        },
      ],
      
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show Comments";

    if (this.state.showComments) {
      buttonText = "Hide Comments";
      console.log(comments);
      console.log("hello world this");
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    let postCommentText="Post Comment"
    

    return (
      <div className="comment-box">
        <h2 >Join the Discussion!</h2>
        <h4 className="comment-count">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <CommentForm
          formType={postCommentText}
          GetComment={this.props.GetComment.bind(this)}
          pokeName={this.props.pokeName}
        />
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
    //For loop to load comment Nodes

    console.log("get Comments is getting called");

    

    return this.props.comments.map((comment) => {
      let notLike = <FavoriteBorderIcon></FavoriteBorderIcon>;
      let editCommentText="Edit Comment"

      

      let editForm = comment.post;

      if (this.state.editCheck){
        editForm = <CommentForm formType={editCommentText}></CommentForm>
      }

      let divHide = {
        display: 'none'
      }


        
      return (
        <div className="comment">
          <div className="comment-entry">
            <div className="comment-top">
              <div className="comment-like" id={comment._id + "-like"} onClick={() => this._getLikes(this.props.pokeName, comment._id)}>
                <div style={divHide}>
                  <FavoriteIcon></FavoriteIcon>
                </div>
                <div>
                 <FavoriteBorderIcon></FavoriteBorderIcon>
                </div>
                {/* <div className="like-count">{comment.likes}</div> */}
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
  _getLikes(pokeName, id) {

    let likeId = id + "-like"
    let likeImage = document.getElementById(likeId).childNodes[0].style.display;

    if(likeImage == "none"){
      document.getElementById(likeId).childNodes[0].style.display = "";
      document.getElementById(likeId).childNodes[1].style.display = "none";
      console.log("c") 
    } else if(likeImage == ""){
      document.getElementById(likeId).childNodes[0].style.display = "none";
      document.getElementById(likeId).childNodes[1].style.display = ""; 
    }
   
    fetch("http://localhost:5000/api/Comment/addLike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pokeName: pokeName,
        id: id,
        username: localStorage.getItem("SessionUserName"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      });
      this.props.GetComment();
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
  
} // end CommentBox component

export default CommentBox;
