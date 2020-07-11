import React, { Component } from "react";
import CommentBox from "./CommentBox";
import ReactDOM from "react-dom";

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">- {this.props.body}</p>
        <div className="comment-footer">
          <a
            href="#"
            className="comment-footer-delete"
            onClick={this._deleteComment}
          >
            Delete Comment
          </a>
        </div>
      </div>
    );
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
}

export default Comment;
