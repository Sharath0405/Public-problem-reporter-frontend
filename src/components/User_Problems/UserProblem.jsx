import React, { useEffect } from "react";
import Header from "./Header/Header";
import ReportedProblem from "./Reported_Problems/R_Problems";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Department = () => {
  // localStorage.setItem("did", 4);
  const [uid, setuid] = useState(0);
  const Port = "https://expensive-hem-elk.cyclic.app";
  const port = "http://localhost:7000";
  let navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    axios
      .get(Port + "/api/user/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          navigate("/login");
          // setload(response.data.auth);
        } else {
          // setload(true);
        }
      });
    console.log("I AM USE EFFECT");
    setuid(params.uid);
  }, [uid]);
  return (
    <>
      <Header uid={uid} />
      <ReportedProblem uid={uid} />
    </>
  );
};

export default Department;
