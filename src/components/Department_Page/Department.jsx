import React, { useEffect } from "react";
import Header from "./Header/Header";
import ReportedProblem from "./Reported_Problems/R_Problems";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Department = () => {
  // localStorage.setItem("did", 4);
  const [Name, setname] = useState();
  const Port = "https://expensive-hem-elk.cyclic.app";
  const port = "http://localhost:7000";
  let navigate = useNavigate();
  useEffect(() => {
    console.log("I AM USE EFFECT");
    axios
      .get(Port + "/api/dept/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("tokendept") },
      })
      .then((response) => {
        if (!response.data.auth) {
          navigate("/dept/login");
          // setload(response.data.auth);
        } else {
          // setload(true);
        }
      });
    axios
      .post(Port + "/api/dept/getdeptname", {
        did: localStorage.getItem("did"),
      })
      .then((result) => {
        console.log(result.data);
        setname(result.data);
      });
  }, [Name]);
  return (
    <>
      <Header name={Name} />
      <ReportedProblem name={Name} />
    </>
  );
};

export default Department;
