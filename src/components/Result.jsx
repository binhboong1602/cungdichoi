import React from "react";
import { Button, Form } from "react-bootstrap";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Result() {
  const history = useHistory();
  const [loadTitle, setLoadTitle] = useState([]);

  useEffect(() => {
    db.collection("VoteContent").onSnapshot((snapshot) => {
      setLoadTitle(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <div>
      <h1>Share this link to invite your friends</h1>

      <p></p>
      {loadTitle.map((val) => (
        <Form>
          <Form.Check.Label>Tiêu Đề{val.title}</Form.Check.Label>
          <Form.Check.Label>Tiêu Đề{val.content}</Form.Check.Label>
        </Form>
        // <div>
        //   <p>Tiêu Đề :{val.title}</p>
        //   <p>Nội Dung :{val.content}</p>
        // </div>
      ))}
      <Button onClick={handleClick}>Create new session</Button>
    </div>
  );
}
