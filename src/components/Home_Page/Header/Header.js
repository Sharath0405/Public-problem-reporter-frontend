import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Container, Flex, Avatar, Text, Badge, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <Flex bg="#e62e00">
        <Avatar
          ml="3"
          mt="3"
          mb="3"
          src={props.url}
          cursor={"pointer"}
          onClick={() => {
            navigate("/profile");
          }}
        />
        <Box ml="3" mt="3" mb="3">
          <Text fontWeight="bold">{props.name}</Text>
          <Badge colorScheme="green">Citizen</Badge>
        </Box>
      </Flex>

      <Card mt="10" ml="5" p="5" bg="black" color="white" mr="5">
        <CardBody>
          <Container>
            <center>
              <Text fontSize="2xl">Hello {props.name + "!!"}</Text>
              <Text fontSize="2xl">Welcome Back...</Text>
              <Text fontSize="1xl">Help us to build a better place</Text>
            </center>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default Header;
