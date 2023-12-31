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
import Navbar from "@/components/Navbar";
import '@fontsource/cinzel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CardWrapper from '@/components/CardWrapper';
import Footer from "@/components/Footer";
import { HistoryCard } from '@/components/HistoryCard';

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

interface UserData {
    customer_id: number;
    username: string;
    role: string;
}

export default function History(){
    const [historyData, setHistoryData] = useState<HistoryData[]>([]);
    const [userData, setUserData] = useState<UserData>();
    const [selectedHistory, setSelectedHistory] = useState<HistoryData[]>([]);
    const [id, setId] = useState<Number>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const historyDataResponse = await axios.get('http://127.0.0.1:8000/customization/history', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
            const userDataResponse = await axios.get('http://127.0.0.1:8000/users/me', {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
             });
            setHistoryData(historyDataResponse.data);
            setUserData(userDataResponse.data);
            setId(userDataResponse.data.customer_id);
            const selected = historyDataResponse.data.find((s : {customer_id: number | undefined; }) => s.customer_id === id);
            setSelectedHistory(selected);
          } catch (error) {
            console.log('error fetching data: ', error);
          }
        };
        fetchData();
      }, [id]);

    return(
        <ChakraProvider>
            <Navbar status={true}/>
            <Heading
            textAlign={'center'}
            alignItems={'center'}
            m={5}
            fontFamily={'cinzel'}
            color={'#134074'}>
                Order History
            </Heading>
            <Spacer></Spacer>
            <CardWrapper columns={{base: 1, sm: 1, md: 2, lg: 2}}>
                <HistoryCard history={historyData} />
            </CardWrapper>
            <Footer />
        </ChakraProvider>
    )
}