import React from "react";
import { FaRegClock, FaStar } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import studioData from "../data/studioData.json";
import {
    Box,
    Text,
    Image,
    Spacer,
    Stack,
    Button,
    HStack,
  } from '@chakra-ui/react';

const StudioCard = () => {
  const navigateToStudioDetail = (id: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/studio-detail/${id}`;
    }
  };
  return (
    <>
        {studioData.map((studio) => (
            <Box
                key={studio.id}
                w="420px"
                h={"auto"}
                bg={"white"}
                border={'1px solid #000'}
                borderRadius={15}
                padding={4}
                mx={25}
            >
                <Stack w={"100%"} h={"100%"} align={"left"}>
                    <Box boxSize={'auto'} w={'100%'}>
                        <Image
                            style={{ objectFit: 'cover' }}
                            src={studio.imgSrc[0]}
                            alt={studio.studioName}
                            width={'420px'}
                            height={'200px'}
                             />
                    </Box>
                    <HStack alignItems={'left'} w={'100%'} pb={4}>
                        <Box width={'100%'}>
                            <HStack align={'left'}>
                                <Text
                                    fontSize={'20px'}
                                    fontWeight={'Bold'}
                                    color="#134074"
                                    pb={0.5}
                                >
                                    {studio.studioName}
                                </Text>
                                <Spacer />
                                <Text color="#134074">IDR {studio.priceRange}</Text>
                            </HStack>
                            <Text color="#134074" pb={1} whiteSpace={'normal'}>{studio.address}</Text>
                            <HStack color={"#134074"}>
                                <FaRegClock /><Text>{studio.availableHours}</Text>
                                <HiUserGroup /><Text>{studio.maximumParticipant} People</Text>
                                <FaStar /><Text>{studio.rating}/5.0</Text>
                            </HStack>
                        </Box>
                        <Spacer></Spacer>
                    </HStack>
                    <Button
                    bgColor="#134074"
                    color="white"
                    _hover={{ bg: '#3FC3FE' }}
                    fontWeight={'bold'}
                    borderRadius={30}
                    mx={1}
                    onClick={() => navigateToStudioDetail(studio.id)}
                    >
                    Book Session
                    </Button>
                </Stack>
            </Box>
        ))}
        </>
  );
};

export default StudioCard;