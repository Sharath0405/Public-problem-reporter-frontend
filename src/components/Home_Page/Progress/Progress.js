import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import axios from "axios";
const Progres = () => {
  // eslint-disable-next-line
  const port = "http://localhost:7000";
  // eslint-disable-next-line
  const Port = "https://expensive-hem-elk.cyclic.app";
  const [total, settotal] = useState(0);
  const [solvedcount, setsolvedcount] = useState(0);
  useEffect(() => {
    axios.get(Port + "/api/reportprob/solvedcount").then((response) => {
      setsolvedcount(parseInt(response.data.ans));
      console.log("Solved " + solvedcount);
    });
    axios.get(Port + "/api/reportprob/totalcount").then((response) => {
      if (response.data.ans != 0) settotal(response.data.ans);
      else {
        settotal(0);
      }
      console.log("Total " + total);
    });
  }, [total, solvedcount]);
  return (
    <>
      <Container
        h="calc(80vh)"
        borderRadius={10}
        bg="#e6e6e6"
        pt="5"
        mt="10"
        mb="10"
      >
        <center>
          <Heading>Our Progress</Heading>
        </center>
        <Card boxShadow="dark-lg" borderRadius={10} mt="10" mb="10">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Weekly Data
                </Heading>
                <div>
                  <Text mt="5" mb="2">
                    Problems Reported
                  </Text>
                  <Progress
                    mt="3"
                    mb="5"
                    colorScheme="green"
                    hasStripe
                    isIndeterminate
                    value={20}
                  />
                </div>
                <div>
                  <Text mt="5" mb="2">
                    Problems Solved
                  </Text>
                  <Progress
                    colorScheme="green"
                    value={(solvedcount / total) * 100}
                  />
                </div>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card boxShadow="dark-lg" borderRadius={10} mt="10" mb="10">
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Montly Data
                </Heading>
                <div>
                  <span>Problems Reported</span>
                  <CircularProgress
                    isIndeterminate
                    mt="5"
                    ml="10"
                    color="green.300"
                    value={30}
                    size="80px"
                  >
                    <CircularProgressLabel>{total}</CircularProgressLabel>
                  </CircularProgress>
                </div>
                <div>
                  <span>Problems Solved </span>
                  <CircularProgress
                    mt="5"
                    color="green.300"
                    ml="12"
                    value={30}
                    size="80px"
                  >
                    <CircularProgressLabel>
                      {(solvedcount / total) * 100}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </div>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Progres;
