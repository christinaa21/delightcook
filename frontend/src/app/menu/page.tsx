import { ChakraProvider, Heading, Image } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function Menu(){
    return(
        <ChakraProvider>
            <Navbar status={true} />
            <Heading>
                Menu
            </Heading>
        </ChakraProvider>
    )
}