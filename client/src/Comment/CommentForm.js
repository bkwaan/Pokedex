import React, { Component } from "react";
import {Button} from '@material-ui/core'

class CommentForm extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          Username: this.props.userName,
        }
      
    }
  
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          {/* <input
            className="comment-form-name"
            placeholder="Name"
            required
            ref={(input) => (this._author = input)}
          ></input>
          <br /> */}
          <textarea
            className="comment-form-body"
            placeholder="Comment"
            rows="4"
            required
            ref={(textarea) => (this._body = textarea)}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          <Button variant="contained" type="submit">{this.props.formType}</Button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {

    console.log(this.props.userName);

    event.preventDefault();
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    let author = this.state.Username;
    let comments = this._body.value;
    let commentForm = document.getElementsByClassName("comment-form")[0].style.display;
    console.log(commentForm);

    if(this.props.formType == "Edit Comment"){
      
      this.props._editComment(this.props.pokeName, this.props.id, this._body.value);
      this.props.GetComment();
      
    } else {

    fetch("http://localhost:5000/api/Comment/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pokeName: this.props.pokeName,
        comments: [{ username: author, post: comments, date: newdate, likes: []}],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.success){
          this.props.GetComment();
        }
      });
    }
  }
} // end CommentForm component

export default CommentForm;
