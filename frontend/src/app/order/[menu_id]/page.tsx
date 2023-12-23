'use client'

import {
    Box,
    Text,
    Image,
    Spacer,
    Stack,
    Button,
    HStack,
    ChakraProvider,
    Heading,
    VStack
  } from '@chakra-ui/react';
import Navbar from "@/components/Navbar";
import '@fontsource/cinzel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaStopwatch, FaFire } from "react-icons/fa6";
import Link from 'next/link';

interface MenuItem {
    menu_id: number;
    menu_name: string;
    price: number;
    duration: number;
    calories: number;
    level: string;
    description: string;
    menu_url: string;
  }

export default function Order(){
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => {
        setQuantity(quantity => quantity + 1);
    };
    const decrementQuantity = () => {
        if (quantity > 1){
            setQuantity(quantity => quantity - 1);
        }
    };

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selected_menu, setSelectedMenu] = useState<MenuItem>();
    const [id, setId] = useState<Number>();
 
    useEffect(() => {
     const path = window.location.pathname;
     const segments = path.split("/");
     setId(Number(segments[segments.length - 1]));
 
     const fetchData = async () => {
       try {
         const menuItemsResponse = await axios.get('http://127.0.0.1:8000/menu_items/');
         setMenuItems(menuItemsResponse.data);
         const selected = menuItemsResponse.data.find((s: { menu_id: Number | undefined; }) => s.menu_id === id);
         setSelectedMenu(selected);
       } catch (error) {
         console.log('error fetching data: ', error);
       }
     };
     fetchData();
   }, [id]);

    return(
        <ChakraProvider>
            <Navbar status={true} />
            <Heading
            textAlign={'center'}
            alignItems={'center'}
            m={5}
            fontFamily={'cinzel'}
            color={'#134074'}>
                Order Summary
            </Heading>
            <Spacer></Spacer>
            <Box
                w={"auto"}
                h={"auto"}
                bg={"white"}
                border={'1px solid #000'}
                borderRadius={15}
                padding={4}
                mx={50}
            >
                <HStack>
                    <Image
                    style={{ objectFit: 'cover' }}
                    src={selected_menu?.menu_url}
                    alt="Katalog menu"
                    width={'300px'}
                    height={'150px'}
                    pr={3}
                        />
                    <VStack color={'#134074'} align={"left"}>
                        <Text
                            fontSize={'20px'}
                            fontWeight={'Bold'}
                            pb={1}
                        >
                            {selected_menu?.menu_name}
                        </Text>
                        <HStack>
                            <FaStopwatch /><Text>{selected_menu?.duration} min</Text>
                            <FaStar /><Text>{selected_menu?.level}</Text>
                            <FaFire /><Text>{selected_menu?.calories} kcal</Text>
                        </HStack>
                        <Spacer></Spacer>
                        <HStack mt={4}>
                            <Button onClick={decrementQuantity} fontSize={"xl"} rounded={'20px'}>
                                -
                            </Button>
                            <Text fontSize={"20px"} fontWeight={"bold"} px={3} mx={0.5} borderBottom={'1px'}>
                                {quantity}
                            </Text>
                            <Button onClick={incrementQuantity} fontSize={"xl"} rounded={'20px'}>
                                +
                            </Button>
                            <Spacer></Spacer>
                            <Link href={`/customize/${selected_menu?.menu_id}`} passHref>
                                <Button
                                colorScheme="#134074"
                                color="#134074"
                                _hover={{ color: '#3FC3FE' }}
                                fontWeight={'bold'}
                                borderRadius={30}
                                mx={1}
                                variant={'outline'}>
                                    Customize
                                </Button>
                            </Link>
                        </HStack>
                    </VStack>
                    <Spacer></Spacer>
                    <HStack color={'#134074'} px={2}>
                        <Text>
                            {quantity} x IDR {selected_menu?.price} =
                        </Text>
                        <Text
                            fontSize={'20px'}
                            fontWeight={'Bold'}
                        >
                            IDR {selected_menu?.price * quantity}
                        </Text>
                    </HStack>
                </HStack>
            </Box>
            <Text px={50} mt={4} fontSize={'x-large'} fontWeight={'bold'} color={'#134074'}>
                Mau sewa studio musik?
            </Text>
        </ChakraProvider>
    )
}