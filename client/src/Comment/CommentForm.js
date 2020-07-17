import React, { Component } from "react";

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          <input
            placeholder="Name"
            required
            ref={(input) => (this._author = input)}
          ></input>
          <br />
          <textarea
            placeholder="Comment"
            rows="4"
            required
            ref={(textarea) => (this._body = textarea)}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">Post Comment</button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {
    event.preventDefault();
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    let author = this._author.value;
    let comments = this._body.value;
    fetch("http://localhost:5000/api/Comment/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pokeName: "Bulbasaur",
        comments: [{ username: author, post: comments, date: newdate, likes: 0}],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
} // end CommentForm component

export default CommentForm;
