import { ChakraProvider, Heading, Image } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

export default function Menu(){
    return(
        <ChakraProvider>
            <Navbar status={true} />
            <Image
                src="./landing.png"
                objectFit={'cover'}
                height={"440px"}/>
            <Heading>
                Menu
            </Heading>
        </ChakraProvider>
    )
}