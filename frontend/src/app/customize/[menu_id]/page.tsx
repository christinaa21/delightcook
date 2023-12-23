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

export default function Customize(){
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
        </ChakraProvider>
    )
}