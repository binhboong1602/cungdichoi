import React from "react";
import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
const { v4: uuidv4 } = require("uuid");

export default function SessionDetail(props) {
  const history = useHistory();
  const sessionID = props.match.params.id;
  const [data] = props.session.filter((item) => {
    return item.id == sessionID;
  });

  console.log(data);
  function handleBack(e) {
    e.preventDefault();
    history.push("/");
  }
  return (
    <div className="sessiondetail">
      <div className="row">
        <div className="col-12">
          <div
            style={{
              marginTop: "45px",
              marginBottom: "31px",
              fontSize: "30px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
            >
              Go out together
            </div>
            <div style={{ cursor: "pointer" }}>
              <FaUser /> {data.name}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1 style={{ textAlign: "center" }}>Bạn đang tham gia nhóm:</h1>
          <p style={{ textAlign: "center" }}>{data.id}</p>
          <h3
            style={{
              color: "#3b82f6",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "25px",
              marginBottom: "30px",
            }}
          >
            {/* {uuidv4()} */}
          </h3>
        </div>
      </div>
      <div className="col-12">
        <h3 style={{ textAlign: "center" }}>Địa điểm được vote nhiều nhất</h3>
        <h3 style={{ textAlign: "center", marginBottom: "80px" }}>---</h3>
      </div>
      <div className="row">
        <div className="col-4">
          <h4>Title: {data.title}</h4>
          <h4>Content: {data.content}</h4>
        </div>
        <div className="col-4" style={{ textAlign: "center" }}>
          <h4>
            {data.timeout > 0
              ? "Let's vote before time ends"
              : "Session is over"}
          </h4>
          <h5>
            <input type="time" />
          </h5>
        </div>
        <div className="col-4">
          <div>
            <h4>Các thành viên đã tham gia</h4>
            {data.members.map((mem, ind) => {
              return (
                <h5 style={{ cursor: "pointer" }}>
                  <FaUser /> {mem}
                </h5>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: "60px", marginBottom: "60px" }}>
        <div className="col-6">
          <h4>Các địa điểm ăn chơi</h4>
          <ul>
            {data.places.map((item, ind) => {
              return <li key={ind}>{item}</li>;
            })}
          </ul>
        </div>
        <div className="col-6">
          <Button>Vote now</Button>
        </div>
      </div>

      <button className="btn btn-danger" onClick={handleBack}>
        Quay lại
      </button>
    </div>
  );
}
