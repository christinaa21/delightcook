"use client";
import React, { useEffect, useState } from "react";
import studioData from "../../../data/studioData.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegClock, FaStar } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Image, ChakraProvider, Box, Text, Accordion, AccordionButton, AccordionItem, AccordionIcon, AccordionPanel, HStack, UnorderedList, ListItem, Button } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Studio {
  id: string;
  studioName: string;
  priceRange: string;
  address: string;
  availableHours: string;
  maximumParticipant: number;
  rating: string;
  imgSrc: string[];
  description: string;
  facilities: string[];
  instruments: string[];
  studioRooms: StudioRoom[];
}

interface AccordionSectionState {
  [key: string]: boolean;
}

interface StudioRoom {
  roomName: string;
  price: number;
}

const Page = () => {
  const [studio, setStudio] = useState<Studio | undefined>(undefined);
  const [id, setId] = useState<Number>();

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const studioId = segments[segments.length - 1];
    setId(Number(studioId));
    const selectedStudio = studioData.find((s) => s.id === studioId);
    setStudio(selectedStudio);
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [participantError, setParticipantError] = useState("");
  const [sessionSchedule, setSessionSchedule] = useState("");
  const [studioType, setStudioType] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [totalFee, setTotalFee] = useState<number | null>(null);
  const [feePerParticipant, setFeePerParticipant] = useState<number | null>(
    null
  );
  const [calculateError, setCalculateError] = useState("");

  const handleDateChange = (date: Date) => setStartDate(date);

  const handleGenreChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setGenre(event.target.value);
  };

  const handleThemeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTheme(event.target.value);
  };

  const handleMaxParticipantsChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const input = event.target.value;
    setMaxParticipants(input);

    if (!input) {
      setParticipantError("");
      return;
    }

    const number = parseInt(input, 10);
    if (isNaN(number)) {
      setParticipantError("Please enter a valid number");
    } else if (studio && number > studio.maximumParticipant) {
      setParticipantError(
        `Exceeds maximum capacity of ${studio.maximumParticipant} participants`
      );
    } else {
      setParticipantError("");
    }
  };

  const handleStudioTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStudioType(event.target.value);
  };

  const handleCalculateFees = () => {
    if (!studioType || maxParticipants === "") {
      setCalculateError(
        "Please select a studio type and enter the number of participants."
      );
      return;
    }

    const participantsNumber = parseInt(maxParticipants, 10);
    if (isNaN(participantsNumber) || participantsNumber <= 0) {
      setCalculateError("Please enter a valid number of participants.");
      return;
    }

    const selectedRoom = studio?.studioRooms.find(
      (r) => r.roomName === studioType
    );
    if (!selectedRoom) {
      setCalculateError("Please select a valid studio type.");
      return;
    }

    if (studio && studio.maximumParticipant) {
      if (participantsNumber > studio?.maximumParticipant) {
        setCalculateError(
          `Number of participants exceeds the maximum allowed of ${studio?.maximumParticipant}.`
        );
        return;
      }
    }

    setTotalFee(selectedRoom.price);
    setFeePerParticipant(
      (selectedRoom.price) / participantsNumber
    );
    setCalculateError("");
  };

  const studioTypeOptions =
    studio?.studioRooms.map((room, index) => (
      <option key={index} value={room.roomName}>
        {room.roomName} - IDR {room.price.toLocaleString()}
      </option>
    )) || [];

  const sessionTimes = [
    "00:00 - 02:00",
    "02:00 - 04:00",
    "04:00 - 06:00",
    "06:00 - 08:00",
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
    "22:00 - 24:00",
  ];

  const handleSessionScheduleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSessionSchedule(event.target.value);
  }

  const handleSubmit = async () => {
    if (!studio) {
      console.log("Please select a studio.");
      return;
    }
    const formattedDate = startDate.toISOString().split("T")[0];
    const maxParticipantsInt = parseInt(maxParticipants, 10);
    const totalFeeInt = totalFee;

    const sessionData = {
      studio_name: studio.studioName,
      session_date: formattedDate,
      session_time: sessionSchedule,
      genre: genre,
      theme: theme,
      max_participants: maxParticipantsInt,
      total_fee: totalFeeInt,
    };

    console.log(sessionData);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token is not available.");
        return;
      } else {
        console.log(token);
      }
      
      const studioKey = `studio`;
      localStorage.setItem(studioKey, JSON.stringify(sessionData));

      window.history.back();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error data:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
      } else {
        console.error("Error:", error);
      }
    }
  };

  if (!studio) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Navbar status={true}/>
      <main className="w-full px-4  ">
        <Box px={4} pt={8}>
          <Slider dots={true} slidesToScroll={1} slidesToShow={1} infinite={true} speed={1}>
            {studio.imgSrc.map((image, index) => (
              <Image
                objectFit={'cover'}
                src={image}
                alt={`slide-${index}`}
                width={'auto'}
                height={'300px'}
                />
            ))}
          </Slider>
        </Box>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 mt-4 ">
            <div className="border-b-4 border-gray-200 mb-4">
              <h1 className="text-3xl font-bold p-8 ">{studio.studioName}</h1>
            </div>
            <Accordion defaultIndex={[0]} allowMultiple color={'#134074'}>
              <AccordionItem mb={2} pb={2} pt={2}>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
                    Description
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text mb={4}>{studio.description}</Text>
                  <HStack>
                    <FaLocationDot />
                    <Text>{studio.address}</Text>
                  </HStack>
                  <HStack>
                    <FaRegClock />
                    <Text>{studio.availableHours}</Text>
                  </HStack>
                  <HStack>
                    <FaStar />
                    <Text>{studio.rating}</Text>
                  </HStack>
                  <HStack>
                    <HiUserGroup />
                    <Text>{studio.maximumParticipant}</Text>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem mb={2} pb={2} pt={2}>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
                    Facilities
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>Our Main Facilities:</Text>
                  <UnorderedList>
                    {studio.facilities.map((facility, index) => (
                      <ListItem key={index}>{facility}</ListItem>
                    ))}
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem mb={2} pb={2} pt={2}>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left' fontWeight={'bold'}>
                    Music Instruments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>Music Instruments Provided:</Text>
                  <UnorderedList>
                    {studio.instruments.map((instrument, index) => (
                      <ListItem key={index}>{instrument}</ListItem>
                    ))}
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Checkout Form */}
          <div className="col-span-1 mt-4 bg-white rounded-xl py-4 px-8">
            <h2 className="text-2xl font-bold text-center my-4">
              Book Session
            </h2>
            <h2 className="text-xl font-bold text-center my-4">
              Plan Your Music Session
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-x-3">
                <div className="flex-1">
                  <label
                    htmlFor="date-picker"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Session Date
                  </label>
                  <DatePicker
                    id="date-picker"
                    selected={startDate}
                    onChange={handleDateChange}
                    className="rounded-xl p-2 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="session-schedule"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Session Schedule
                  </label>
                  <select
                    id="session-schedule"
                    value={sessionSchedule}
                    onChange={handleSessionScheduleChange}
                    className="rounded-xl p-2 w-full"
                  >
                    <option value="">Select Time Option</option>
                    {sessionTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genre
                </label>
                <input
                  id="genre"
                  type="text"
                  value={genre}
                  onChange={handleGenreChange}
                  placeholder="Genre"
                  className="rounded-xl p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700"
                >
                  Theme
                </label>
                <input
                  id="theme"
                  type="text"
                  value={theme}
                  onChange={handleThemeChange}
                  placeholder="Theme"
                  className="rounded-xl p-2 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="max-participants"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Participants
                </label>
                <input
                  id="max-participants"
                  type="number" // Set input type as number
                  value={maxParticipants}
                  onChange={handleMaxParticipantsChange}
                  placeholder="Max Participants"
                  className="rounded-xl p-2 w-full"
                />
                {participantError && (
                  <p className="text-xs text-red-600">{participantError}</p>
                )}
              </div>
              <div className="flex flex-row gap-x-3">
                <div className="flex-1">
                  <label
                    htmlFor="studio-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Studio Type
                  </label>
                  <select
                    id="studio-type"
                    value={studioType}
                    onChange={handleStudioTypeChange}
                    className="rounded-xl p-2 w-full"
                  >
                    <option value="">Select Studio Type</option>
                    {studioTypeOptions}
                  </select>
                </div>
              </div>
              <div>
                {/* New display area for calculated fees */}
                {totalFee != null && (
                  <div className="bg-[#f6f7f7] p-4 rounded-md my-2">
                    <p>Total Fee: IDR {totalFee.toLocaleString()}</p>
                    <p>
                      Fee per Participant: IDR{" "}
                      {feePerParticipant?.toLocaleString() || "Calculating..."}
                    </p>
                  </div>
                )}

                {/* Calculate and Order buttons */}
                <div className="flex flex-col gap-3">
                  {calculateError && (
                    <p className="text-xs text-red-600">{calculateError}</p>
                  )}
                  <Button
                    colorScheme="#134074"
                    color="#134074"
                    _hover={{ color: '#3FC3FE' }}
                    fontWeight={'bold'}
                    borderRadius={30}
                    mx={1}
                    variant={'outline'}
                    onClick={handleCalculateFees}>
                    Calculate
                  </Button>
                  <Button
                    bgColor="#134074"
                    color="white"
                    _hover={{ bg: '#3FC3FE' }}
                    fontWeight={'bold'}
                    borderRadius={30}
                    mx={1}
                    onClick={handleSubmit}>
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ChakraProvider>
  );
};

export default Page;