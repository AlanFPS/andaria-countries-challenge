// Importing
import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Nav from "../Components/Navlink";

function Home() {
  // STATES
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("all");

  const [view, setView] = useState(
    localStorage.getItem("view")
      ? JSON.parse(localStorage.getItem("view"))
      : "grid"
  );

  let navigate = useNavigate();

  // CALLING API
  useEffect(() => {
    if (selectInput === "all") {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => {
          return setData(data), setData2(data);
        })
        .catch((err) => console.log("Error:", err.message));
    } else {
      fetch(`https://restcountries.com/v3.1/region/${selectInput}`)
        .then((res) => res.json())
        .then((data) => {
          return setData(data), setData2(data);
        })
        .catch((err) => console.log("Error:", err.message));
    }
  }, [selectInput]);

  // REGION SELECT
  const handleChangeSelect = (e) => {
    setSelectInput(e.target.value);
  };

  // COUNTRY SEARCH BAR
  const handleChangeInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setData(
      data2.filter((x) =>
        x?.name?.common
          ?.toLowerCase()
          ?.includes(e?.target?.value?.toLowerCase())
      )
    );
  };

  const handleChangeView = (e) => {
    setView(e.target.value);
    localStorage.setItem("view", JSON.stringify(e.target.value));
  };

  console.log(view, "data");

  return (
    <div>
      {/* Navbar */}
      <Nav />
      {/* 
    Country Search and Region Select form */}
      <form>
        <Flex
          maxW="2000px"
          pt="10"
          w={{ base: "95%", lg: "90%" }}
          mx="auto"
          flexWrap={"wrap"}
        >
          <Box p="4">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={searchInput}
                onChange={handleChangeInput}
                type="text"
                placeholder="Search"
              />
            </InputGroup>
          </Box>
          <Spacer />
          <Box p="4">
            <Select onChange={handleChangeSelect}>
              <option value="all">All</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </Select>
          </Box>
          <Box p="4">
            <Select onChange={handleChangeView} value={view}>
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </Select>
          </Box>
        </Flex>
      </form>

      {/* Data Rendering */}

      {data2?.length === 0 ? (
        <Progress colorScheme="pink" size="xs" isIndeterminate />
      ) : (
        <Box w="100%">
          {view == "grid" ? (
            <Grid
              templateColumns={{
                base: "repeat(1,1fr)",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                xl: "repeat(4,1fr)",
              }}
              gap={{ base: 5, sm: 7, lg: 8 }}
              maxW="2000px"
              pt="100"
              w={{ base: "95%", lg: "90%" }}
              mx="auto"
            >
              {data
                ?.sort((a, b) =>
                  a?.name?.common?.localeCompare(b?.name?.common)
                )
                .map((x) => (
                  <GridItem
                    w={"100%"}
                    key={x?.name?.common}
                    onClick={() =>
                      navigate(`/singlecountry/${x?.cca2?.toLowerCase()}`, {})
                    }
                  >
                    <Box
                      w="100%"
                      borderWidth="1px"
                      borderRadius="lg"
                      // overflow="hidden"
                    >
                      <Image
                        src={x?.flags?.svg}
                        alt={x?.name?.common}
                        height="200px"
                        width="100%"
                        objectFit={"cover"}
                      />
                      <Box p="6">
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {x?.name?.common}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Population: {x?.population}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Region: {x?.region}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Capital: {x?.capital}
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>
                ))}
            </Grid>
          ) : (
            <Flex pt="100" flexDir={"column"} gap={8}>
              {data
                ?.sort((a, b) =>
                  a?.name?.common?.localeCompare(b?.name?.common)
                )
                .map((x) => (
                  <Flex
                    w="90%"
                    mx="auto"
                    rounded={"md"}
                    minH="175px"
                    borderWidth="1px"
                    borderRadius="lg"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    justifyContent={{ base: "flex-start", sm: "space-between" }}
                    maxW={"2000px"}
                    flexDir={{ base: "column", sm: "row" }}
                  >
                    <Flex
                      alignItems={{ base: "flex-start", sm: "center" }}
                      flexDir={{ base: "column", sm: "row" }}
                    >
                      <Image
                        src={x?.flags?.svg}
                        alt={x?.name?.common}
                        height={{ base: "200px", sm: "175px" }}
                        width={{ base: "100%", sm: "200px" }}
                        objectFit={"cover"}
                        borderLeftRadius="lg"
                      />
                      <Box px="6" py={{ base: "6", sm: "0" }}>
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {x?.name?.common}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Population: {x?.population}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Region: {x?.region}
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          Capital: {x?.capital}
                        </Box>
                      </Box>
                    </Flex>
                    <Box
                      px={{ base: "6", sm: "0" }}
                      py={{ base: "3", sm: "0" }}
                    >
                      <Button
                        size="lg"
                        variant="solid"
                        mr="3"
                        onClick={() =>
                          navigate(
                            `/singlecountry/${x?.cca2?.toLowerCase()}`,
                            {}
                          )
                        }
                      >
                        Details
                      </Button>
                    </Box>
                  </Flex>
                ))}
            </Flex>
          )}
        </Box>
      )}
    </div>
  );
}

export default Home;
