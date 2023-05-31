import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Progress from "./Progress/Progress";
import Report from "./Report/Report";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  // eslint-disable-next-line
  const port = "http://localhost:7000";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app";
  const [details, setdetails] = useState({});
  const [url, seturl] = useState("");
  let navigate = useNavigate();
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
    axios
      .post(Port + "/api/user/details", {
        uid: localStorage.getItem("uid"),
      })
      .then((response) => {
        setdetails(response.data);
        seturl(response.data.imageurl);
      });
  }, []);
  return (
    <>
      <Header url={url} name={details.name} />
      <Progress />
      <Report />
    </>
  );
}

export default Home;
