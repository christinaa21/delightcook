"use client";

import React from 'react';
import { Text, Image, VStack, Heading, HStack, Spacer } from '@chakra-ui/react';
import Navbar from './Navbar';
import { Card } from './Card';

export interface DetailProps {
    menu_items: {
        menu_id: number;
        menu_name: string;
        price: number;
        duration: number;
        calories: number;
        level: string;
        description: string;
        menu_url: string;
    },
    status: boolean
}

export default function Detail(props: any){
    const isLogin = (props.status == true);
    const isNotLogin = (props.status == false);
    return(
        <>
        { isLogin &&
        <Navbar status={true}/>
        }
        { isNotLogin &&
        <Navbar status={false}/>
        }
        {props.menu_items && (
            <VStack h={'100%'} w={'100vw'} align={'left'}>
                <Image
                style={{objectFit: 'cover'}}
                alt='Katalog menu'
                maxWidth={'100vw'}
                maxHeight={'12vw'}
                src={props.menu_items.menu_url}/>
                <Heading
                fontWeight={"bold"}
                fontSize={50}
                color="#02033B"
                whiteSpace={"nowrap"}
                marginLeft="6%"
                marginRight="6%"
                mt={8}
                >
                {props.menu_items.menu_name}
                </Heading>
                <HStack
                mt={8}
                maxW="full"
                alignItems={'left'}
                marginLeft="6%"
                marginRight="6%"
                >
                <Text w={'70%'} whiteSpace="pre-line" mr={"6%"} textAlign={'justify'}>
                    {props.menu_items.description}
                </Text>
                <Spacer></Spacer>
                <HStack align={'top'} height={'100%'}>
                    { isLogin && 
                    <Card
                    menu_items={[props.menu_items]}
                    status = {true}
                    detail = {true}/>
                    }
                    { isNotLogin && 
                    <Card
                    menu_items={[props.menu_items]}
                    status = {false}
                    detail = {true}/>
                    }
                </HStack>
                </HStack>
            </VStack>
        )}
        </>
    )
}