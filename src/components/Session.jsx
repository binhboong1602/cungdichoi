import { Form, Button } from "react-bootstrap";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import axios from 'axios';
const { v4: uuidv4 } = require("uuid");

const MAPBOX_TOKEN =
    "pk.eyJ1IjoidHJ1b25nbmd1eWVuMTkwODk1IiwiYSI6ImNrc3I3NDd6ZjBqcHoyeG4xampzc3N2ZW0ifQ.zS68aQ32Ktla3IVsWii5Pw";

const ROOT_URL = 'https://61342f2c7859e700176a37fc.mockapi.io/'

export default function Session(props) {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [location, setLocation] = useState();
    const [place, setPlace] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [time, setTime] = useState(0);

    const handleUserName = (event) => {
        const nameValue = event.target.value;
        setUserName(nameValue);
    };

    const handleTitle = (event) => {
        const titleValue = event.target.value;
        setTitle(titleValue);
    }

    const handleContent = (event) => {
        const contentValue = event.target.value;
        setContent(contentValue);
    }

    function handleClick(e) {
        e.preventDefault();
        const uploadData = {
            sessionID: uuidv4(),
            userName: userName,
            currentLocation: location,
            place: place,
            title: title,
            content: content,
            time: time
        }

        axios.post('https://613437ae7859e700176a3813.mockapi.io/go', uploadData);
        history.push("/session/create/2");
    }

    const handleTime = (event) => {
        const timeValue = event.target.value;
        setTime(timeValue);
    }

    function handleBack(e) {
        e.preventDefault();
        history.push("/");
    }
    const [viewport, setViewport] = useState({
        latitude: 21.02738276864411,
        longitude: 105.83318632938982,
        zoom: 15,
        bearing: 0,
        pitch: 0,
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    //call API to get Data from Mapbox
    function getData(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.status == 200) {
                var data = JSON.parse(this.responseText);
                callback(null, data);
            } else {
                callback(new Error(this.statusText));
            }
        };

        xhr.open("GET", url); //get data
        xhr.send();
    }
    function handleAPI() {
        getData(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${viewport.longitude},${viewport.latitude}.json?access_token=${MAPBOX_TOKEN}`,
            (err, data) => {
                setLocation(data.features[0].place_name);
            }
        );
    }

    function handleLocation() {
        getData(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${viewport.longitude},${viewport.latitude}.json?access_token=${MAPBOX_TOKEN}`,
            (err, data) => {
                setPlace((prev) => {
                    return [...prev, data.features[0].place_name];
                });
            }
        );
    }

    return (
        <div className="create-session">
            <h1 style={{ margin: "30px 0", textAlign: "center" }}>
                Create new group to vote
            </h1>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><h2>Name</h2></Form.Label>
                    <Form.Control
                        style={{ marginBottom: "40px" }}
                        type="text"
                        placeholder="Your name"
                        value={userName}
                        onChange={handleUserName}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        <h2>Your current location</h2>
                        <p>Search in the map and then click "Chose from map" button</p>
                    </Form.Label> <br />
                    <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="30vw"
                        height="50vh"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    >
                        <Geocoder
                            mapRef={mapRef}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            position="top-left"
                        />
                    </MapGL>
                    <Button style={{ marginTop: "40px" }} onClick={handleAPI}>
                        Chose from map
                    </Button>
                    <Form.Control
                        style={{ marginTop: "30px" }}
                        type="text"
                        placeholder="Location"
                        value={location}
                    />
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                            <h2>List of places</h2>
                            <p>Search in the map and then click "Chose" button</p>
                        </Form.Label> <br />
                        <Button onClick={handleLocation}>Chose</Button>
                        <ul style={{ listStyle: 'none' }}>
                            {place.map((item, ind) => (
                                <li key={ind} style={{ backgroundColor: '#FFB319', marginTop: 10 }}>{item}</li>
                            ))}
                        </ul>
                    </Form.Group>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><h2>Title</h2></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitle}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label><h2>Content</h2></Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Description" value={content} onChange={handleContent} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label><h2>Time limitation for voting in minute</h2></Form.Label> <br />
                    <select style={{ width: "100%", height: "40px" }} onChange={handleTime}>
                        <option>---Choose---</option>
                        <option value={1}>1 minute</option>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={15}>15 minutes</option>
                    </select>
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
        </div>
    );
}
