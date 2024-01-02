'use client'

import {
  Box,
  Text,
  Image,
  Spacer,
  Button,
  HStack,
  ChakraProvider,
  Heading,
  VStack,
  Divider
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import '@fontsource/cinzel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaStopwatch, FaFire } from "react-icons/fa6";
import Link from 'next/link';
import Footer from "@/components/Footer";

interface HistoryData{
  order_id: number;
  custom_id: number;
  customer_id: number;
  menu_id: number;
  menu_quantity: number;
  menu_name: string;
  price: number;
  duration: number;
  calories: number;
  level: string;
  description: string;
  menu_url: string;
  ingredients: {
      ingredient_id: number;
      ingredient_name: string;
      ingredient_url: string;
      default_quantity: number;
      adjusted_quantity: number;
      unit: string;
  }[];
}

export default function HistoryDetail(){
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryData>();
  const [id, setId] = useState<Number>();

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    setId(Number(segments[segments.length - 1]));

    const fetchData = async () => {
      try {
        const historyDataResponse = await axios.get('http://127.0.0.1:8000/customization/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistoryData(historyDataResponse.data);
        const selected = historyDataResponse.data.find((s: { order_id: Number | undefined; }) => s.order_id === id);
        setSelectedHistory(selected);
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
            History Detail
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
                src={selectedHistory?.menu_url}
                alt={selectedHistory?.menu_name}
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
                        {selectedHistory?.menu_name}
                    </Text>
                    <HStack>
                        <FaStopwatch /><Text>{selectedHistory?.duration} min</Text>
                        <FaStar /><Text>{selectedHistory?.level}</Text>
                        <FaFire /><Text>{selectedHistory?.calories} kcal</Text>
                    </HStack>
                    <Text>
                      {selectedHistory?.menu_quantity} barang
                    </Text>
                </VStack>
                <Spacer></Spacer>
                <HStack color={'#134074'} px={2}>
                    <Text>
                        {selectedHistory?.menu_quantity} x IDR {selectedHistory?.price} =
                    </Text>
                    <Text
                        fontSize={'20px'}
                        fontWeight={'Bold'}
                    >
                        IDR {selectedHistory?.price * selectedHistory?.menu_quantity}
                    </Text>
                </HStack>
            </HStack>
        </Box>
        <Text px={50} mt={4}fontSize={'x-large'} fontWeight={'bold'} color={'#134074'}>
            Rincian Bahan
        </Text>
        <VStack px={50} mt={2} align={'left'} color={'#134074'}>
            {selectedHistory?.ingredients.map((item) => (
              <VStack align={'left'} px={4}>
                { item.adjusted_quantity != null && item.adjusted_quantity != item.default_quantity &&
                  <HStack fontWeight={'bold'}>
                    <Text>{item.ingredient_name}</Text>
                    <Spacer/>
                    <Text>{item.adjusted_quantity}</Text>
                    <Text>{item.unit}</Text>
                  </HStack>
                }
                { item.adjusted_quantity != null && item.adjusted_quantity == item.default_quantity &&
                  <HStack>
                    <Text>{item.ingredient_name}</Text>
                    <Spacer/>
                    <Text>{item.adjusted_quantity}</Text>
                    <Text>{item.unit}</Text>
                  </HStack>
                }
                { item.adjusted_quantity == null &&
                  <HStack>
                    <Text>{item.ingredient_name}</Text>
                    <Spacer/>
                    <Text>{item.default_quantity}</Text>
                    <Text>{item.unit}</Text>
                  </HStack>
                }
              </VStack>
            ))}
            <Text fontSize={'smaller'} mt={2}>*Bahan yang dicetak tebal merupakan bahan yang dikustomisasi pengguna.</Text>
        </VStack>
        <Text px={50} mt={4} fontSize={'x-large'} fontWeight={'bold'} color={'#134074'}>
            Ringkasan Belanjamu
        </Text>
        <VStack px={50} mt={2} align={'left'} color={'#134074'}>
            <HStack px={4}>
                <Text>
                    Total Harga Meal Kit
                </Text>
                <Spacer></Spacer>
                <Text>
                    {selectedHistory?.menu_quantity} x IDR {selectedHistory?.price} =
                </Text>
                <Text
                    fontWeight={'Bold'}
                >
                    IDR {selectedHistory?.price * selectedHistory?.menu_quantity}
                </Text>
            </HStack>
            <Divider borderColor={'#134074'} />
            <HStack px={4}>
                <Text
                    fontSize={'18px'}
                    fontWeight={'Bold'}>
                    Total Belanja
                </Text>
                <Spacer></Spacer>
                <Text
                    fontSize={'18px'}
                    fontWeight={'Bold'}
                >
                    IDR {(selectedHistory?.price * selectedHistory?.menu_quantity)}
                </Text>
            </HStack>
            <HStack justifyContent={'right'} p={1}>
                <Link href={`/order/${selectedHistory?.menu_id}`}>
                    <Button
                    bgColor="#134074"
                    color="white"
                    _hover={{ bg: '#3FC3FE' }}
                    fontWeight={'bold'}
                    borderRadius={30}
                    mx={1}
                    >
                    Order Again
                    </Button>
                </Link>
            </HStack>
        </VStack>
        <Footer />
    </ChakraProvider>
  )
}