import React, { useEffect } from "react";
import { Heading, Flex, Box, Text, Button } from "@chakra-ui/react";
import Problems from "./LOP_api";
import { Card, CardBody } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import "./LOP.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LOP = () => {
  const Port = "https://expensive-hem-elk.cyclic.app";
  const probData = Problems;
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
  }, []);
  return (
    <>
      <Flex bg="#e62e00" pt="3" pb="3" mb="10">
        <Box>
          <center>
            <Heading>Choose The Problem...</Heading>
          </center>
        </Box>
      </Flex>

      {probData.map((currElem) => {
        return (
          <>
            <Card
              boxShadow="2xl"
              ml="5"
              mr="5"
              className="hovered"
              bg="#e6e6e6"
              border="50px"
              borderColor="black.200"
              mb="10"
              cursor={"pointer"}
              onClick={() => {
                localStorage.setItem("problem", currElem.name);
                navigate(
                  "/reportprob/" +
                    currElem.name.replace(/\s/g, "").toLowerCase()
                );
              }}
            >
              <CardBody>
                <center>
                  <Heading>{currElem.name}</Heading>
                  <Text>{currElem.description}</Text>
                </center>
              </CardBody>
            </Card>
            <Button
              mt="5"
              colorScheme="red"
              onClick={() => {
                navigate("/");
              }}
            >
              <ChevronLeftIcon boxSize={8} />
              Go Back
            </Button>
          </>
        );
      })}
    </>
  );
};

export default LOP;
