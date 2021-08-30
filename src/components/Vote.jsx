import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db } from "../firebase.js";

export default function Vote() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState([]);
  const [time, setTime] = useState(1);
  function handleClick(e) {
    e.preventDefault();
    history.push("/session/create/3");

    db.collection("VoteContent").add({
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
  }

  function handleBack(e) {
    e.preventDefault();
    history.push("/session/create/1");
  }

  function handleChange(e) {
    e.preventDefault();
    const timeValue = e.target.value;
    setTime(parseInt(timeValue));
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "40px 0" }}>Time to VOTE!!!</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="email" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Description" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Time limitation for voting in minute</Form.Label> <br />
          <select
            onChange={handleChange}
            style={{ width: "100%", height: "40px" }}
          >
            <option value={1}>1 minute</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
          </select>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>List of places</Form.Label>
          <Button>Chose from map</Button>
          <ul>
            <li>Hanoi</li>
            <li>Hai Phong</li>
            <li>Da Nang</li>
          </ul>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ margin: "10px" }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Next
        </Button>
      </Form>
    </div>
  );
}
