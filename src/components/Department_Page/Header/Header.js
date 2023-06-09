import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Spacer,
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
const Header = (props) => {
  
  return (
    <>
      <Flex bg="black" mb="10">
        <Avatar ml="3" mt="3" mb="3" src="https://bit.ly/sage-adebayo" />
        <Box ml="3" mt="3" mb="3">
          <Text color="white" fontWeight="bold">
            {props.name}
          </Text>
          <Badge colorScheme="blue">Department</Badge>
        </Box>
        <Spacer />

        <Text ml="10" mt="3" color="white" marginLeft={5}>
          {props.name}
        </Text>
      </Flex>
      <Card mt="10" ml="5" mb="10" p="5" bg="tomato" color="black" mr="5">
        <CardBody>
          <Container>
            <center>
              <Text fontSize="2xl">Here are the unsolved issues...</Text>
              <Text mt="5" fontSize="1xl">
                Help us to build a better place
              </Text>
            </center>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default Header;
