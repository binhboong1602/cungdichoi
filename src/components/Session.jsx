import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { db } from "../firebase";

export default function Session() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");

  function handleClick(e) {
    e.preventDefault();
    history.push("/session/create/2");

    db.collection("username").add({
      name: userName,
    });
    setUserName("");
  }

  function handleBack(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <div className="create-session">
      <h1 style={{ margin: "30px 0", textAlign: "center" }}>
        Create new session to Vote
      </h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            style={{ marginBottom: "40px" }}
            type="email"
            placeholder="Your name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Your current location</Form.Label> <br />
          <Button style={{ marginBottom: "40px" }}>Chose from map</Button>
          <Form.Control type="text" placeholder="Location" />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleBack}
          style={{ margin: "50px 20px 0 0" }}
        >
          Back
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleClick}
          style={{ marginTop: "50px" }}
        >
          Next
        </Button>
      </Form>

      <MapContainer
        style={{ width: "100%", height: "500px" }}
        center={[21.028656997083786, 105.8355587771331]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
