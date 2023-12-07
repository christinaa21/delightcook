import {
    Box,
    Flex,
    Spacer,
    Text,
    Link,
    Image,
    Button,
    HStack,
    Heading
  } from "@chakra-ui/react";
import '@fontsource/cinzel'

export default function Navbar(props: {status: boolean}){
    const isLogin = (props.status == true);
    const isNotLogin = (props.status == false);
    return(
        <Box
          bg="#3FC3FE"
          color="#FFFFFF"
          p={1}
          fontSize="lg"
          fontWeight="bold"
          display={{ md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth="100%"
          marginX="auto"
          position="relative"
        >
            <HStack>
                <Image
                    src="./logo.png"
                    alt="Logo"
                    ml={8}
                    mr={2}
                    h={12}
                    objectFit={"contain"}
                />
                <Heading
                fontFamily={'cinzel'}>
                    Delight Cook
                </Heading>
            </HStack>
            <Flex>
                { isNotLogin && 
                    <HStack
                        mx={14}
                        position="relative"
                        fontWeight="bold"
                        padding= '10px'
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        <Button
                            fontWeight="bold" 
                            color={"white"}
                            bg={"#3FC3FE"}
                            _hover={{
                                bg: '#0CB3FE',
                            }}
                            variant={"ghost"}
                            mx={1}
                        >
                            <a href="./menu">Menu</a>
                        </Button>
                        <Button
                            fontWeight="bold" 
                            color={"white"}
                            bg={"#3FC3FE"}
                            _hover={{
                                bg: '#0CB3FE',
                            }}
                            variant={"ghost"}
                            mx={1}
                        >
                            <a href="./login">Login</a>
                        </Button>
                    </HStack>
                }
                { isLogin && 
                    <HStack
                        mx={14}
                        position="relative"
                        fontWeight="bold"
                        padding= '10px'
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        <Button
                            fontWeight="bold" 
                            color={"white"}
                            bg={"#3FC3FE"}
                            _hover={{
                                bg: '#0CB3FE',
                            }}
                            variant={"ghost"}
                            mx={1}
                        >
                            <a href="./menu">Menu</a>
                        </Button>
                        <Button
                            fontWeight="bold" 
                            color={"white"}
                            bg={"#3FC3FE"}
                            _hover={{
                                bg: '#0CB3FE',
                            }}
                            variant={"ghost"}
                            mx={1}
                        >
                            <a href="./history">History</a>
                        </Button>
                        <Button
                            fontWeight="bold" 
                            color={"white"}
                            bg={"#3FC3FE"}
                            _hover={{
                                bg: '#0CB3FE',
                            }}
                            variant={"ghost"}
                            mx={1}
                        >
                            <a href="./logout">Logout</a>
                        </Button>
                    </HStack>
                }
            </Flex>
        </Box>
    )
}