import {
    VStack,
    Button,
    Heading,
    Text,
    HStack,
    Image
  } from "@chakra-ui/react";
import '@fontsource/cinzel';
import Link from 'next/link';

export default function Success(){
    return(
        <VStack
          bgColor={'#FFFFFF'}
          minWidth={"500px"}
          height={"100vh"}
          justifyContent={"center"}
          spacing={"20px"}
          color={'#134074'}
        >
            <Image src={"./success.png"} height={"180px"} />
            <Heading fontFamily={'cinzel'} fontSize={'xx-large'} fontWeight={'bold'}>Thank You For Ordering!</Heading>
            <Text>Your meal kit will arrive tomorrow. See you soon!</Text>
            <HStack>
                <Link href={'/history'}>
                    <Button
                    mt={'12px'}
                    px={'65px'}
                    pt={8}
                    pb={8}
                    colorScheme="#134074"
                    color="#134074"
                    _hover={{ color: '#3FC3FE', outlineColor: '#3FC3FE' }}
                    fontWeight={'bold'}
                    borderRadius={30}
                    mx={1}
                    variant={'outline'}
                    outlineColor={'#134074'}
                    >
                        View History
                    </Button>
                </Link>
                <Link href={'/menu'}>
                    <Button
                        mt={'12px'}
                        px={'65px'}
                        pt={8}
                        pb={8}
                        bgColor="#134074"
                        color="white"
                        _hover={{ bg: '#3FC3FE' }}
                        fontWeight={'bold'}
                        borderRadius={30}
                        mx={1}
                    >
                        Continue Shopping
                    </Button>
                </Link>
            </HStack>
        </VStack>
    )
}