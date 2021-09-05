import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const history = useHistory();
  const [link, setLink] = useState("");
  function handleClick(e) {
    e.preventDefault();
    history.push("/");
  }

  useEffect(async () => {
    const result = await axios.get(
      "https://613437ae7859e700176a3813.mockapi.io/go"
    );
    const data = result.data;
    const sessionId = data[data.length - 1].sessionID;
    setLink(sessionId);
  }, []);

  return (
    <div>
      <h1>Share this link to invite your friends</h1>
      <h2>
        https://cungdichoi-git-main-cungdichoiv3.vercel.app/sessions/detail/
        {link}
      </h2>
      <Button onClick={handleClick}>Create new session</Button>
    </div>
  );
}
