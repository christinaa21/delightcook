'use client'

import {
    Spacer,
    Button,
    ChakraProvider,
    Heading,
    HStack,
    Box
  } from '@chakra-ui/react';
import Navbar from "@/components/Navbar";
import '@fontsource/cinzel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CardWrapper from '@/components/CardWrapper';
import { IngredientCard, IngredientCardProps } from '@/components/IngredientCard';

interface MenuItem{
    menu_id: number;
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
        min_quantity: number;
        max_quantity: number;
        default_quantity: number;
        unit: string;
    }[];
}

export default function Customize(){
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [ingredientItems, setIngredientItems] = useState<IngredientCardProps[]>([]);
    const [id, setId] = useState<Number>();

    useEffect(() => {
        const path = window.location.pathname;
        const segments = path.split("/");
        setId(Number(segments[segments.length - 1]));
    
        const fetchData = async () => {
          try {
            const menuItemsResponse = await axios.get(`http://127.0.0.1:8000/menu_items/${id}`);
            setMenuItems(menuItemsResponse.data);
            setIngredientItems(menuItemsResponse.data.ingredients);
          } catch (error) {
            console.log('error fetching data: ', error);
          }
        };
        fetchData();
      }, [id]);

    console.log("menu:", menuItems);
    console.log("ingredients:",ingredientItems);

    return(
        <ChakraProvider>
            <Navbar status={true}/>
            <Heading
            textAlign={'center'}
            alignItems={'center'}
            m={5}
            fontFamily={'cinzel'}
            color={'#134074'}>
                Customize Order
            </Heading>
            <Spacer></Spacer>
            <CardWrapper columns={{base: 1, sm: 1, md: 2, lg: 2}}>
                <IngredientCard ingredients={ingredientItems}/>
            </CardWrapper>
            <Spacer></Spacer>
            <Box textAlign={'center'} alignItems={'center'} m={3}>
                <Link href={`/order/${id}`} passHref>
                    <Button
                        minWidth={'auto'}
                        width={'12%'}
                        bgColor="#134074"
                        color="white"
                        _hover={{ bg: '#3FC3FE' }}
                        fontWeight={'bold'}
                        borderRadius={30}
                        fontSize={'20px'}
                    >
                        Save
                    </Button>
                </Link>
            </Box>
        </ChakraProvider>
    )
}