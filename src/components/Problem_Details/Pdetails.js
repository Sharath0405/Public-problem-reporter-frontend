import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  Center,
  Textarea,
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  Stack,
  Container,
  InputLeftAddon,
  Img,
  VStack,
} from "@chakra-ui/react";
// import { AspectRatio } from "@chakra-ui/react";
import axios from "axios";
import "./MapboxMap.css";
import Mapbox from "./Mapbox";
import { useNavigate, useParams } from "react-router-dom";

// import { prewarm } from "mapbox-gl";
const Pdetails = () => {
  let navigate = useNavigate();
  const params = useParams();
  // /* eslint-disable */
  const [prob, setprob] = useState(localStorage.getItem("problem"));
  const [department, setdepartment] = useState(
    localStorage.getItem("department")
  );
  // eslint-disable-next-line
  const port = "http://localhost:7000";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app";
  const [description, setdescription] = useState("");
  const [longitude, setlongitude] = useState(0.0);
  const [latitude, setlatitude] = useState(0.0);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  ///////////////////                 IMAGE                  //////////////////////////////////////
  async function handleSubmit(event) {
    console.log("sdfsdf");
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(Port + "/upload", formData);
    setImageUrl(response.data.url);
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
  ///////////////////                 IMAGE                  //////////////////////////////////////
  async function submit(event) {
    console.log("Sending the problem");
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const dat = {
      uid: localStorage.getItem("uid"),
      name: prob,
      description: description,
      latitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude"),
      department: department,
    };
    if (
      dat.latitude == 0 ||
      dat.longitude == 0 ||
      dat.department == "" ||
      file == null
    ) {
      alert("please fill all the fields");
      return;
    }
    console.log(dat);
    formData.append("data", JSON.stringify(dat));
    const response = await axios
      .post(Port + "/api/reportprob/temp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, // set the content type to multipart form data
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.done) {
          navigate("/greet/" + 1);
        } else {
          navigate("/greet/" + 2);
        }
      });
  }
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
  }, []);
  return (
    <>
      <Flex bg="#e62e00" pt="3" pb="3" mb="10">
        <Box>
          <center>
            <Heading color={"white"} ml="5">
              More Details...
            </Heading>
          </center>
        </Box>
      </Flex>
      <VStack>
        <Box>
          <Mapbox />
        </Box>
        <Container paddingTop={"0rem"}>
          <Stack spacing={6} mb="10">
            <InputGroup>
              <InputLeftAddon children="Name of the problem" />
              <Input type="text" value={prob} readOnly />
            </InputGroup>

            {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
            <InputGroup>
              <InputLeftAddon children="Associated Department" />
              <Input
                type="text"
                placeholder="Automatically fill"
                value={department}
              />
              l
            </InputGroup>
          </Stack>
          <Text>
            <strong>Description: </strong>
          </Text>

          <Textarea
            mb="6"
            placeholder="Add more details(optional)..."
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <Text>
            <strong>Upload a photo : </strong>
            {file ? (
              <Text color={"green"} paddingTop={"1rem"} paddingBottom={"1rem"}>
                {" "}
                <strong> Image Selected </strong>{" "}
              </Text>
            ) : (
              <Img
                src={
                  imageUrl
                    ? imageUrl
                    : "https://ik.imagekit.io/aj4rz7nxsa/Mini_project/av5c8336583e291842624_Yp22FJ3dQ.png"
                }
                width={"17rem"}
              />
            )}
          </Text>

          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          ></Input>
          <Center
            className="pointer"
            boxShadow="dark-lg"
            bg="red"
            h="100px"
            color="white"
            mt="10"
            mb="5"
            borderRadius={10}
            onClick={submit}
          >
            <Box
              as="button"
              borderRadius="md"
              bg="red"
              color="white"
              px={4}
              h={8}
              m="auto"
            >
              <Heading>Submit</Heading>
            </Box>
          </Center>
        </Container>
        <br />
      </VStack>
    </>
  );
};

export default Pdetails;
