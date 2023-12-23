"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Detail from "@/components/Detail";
import { useState, useEffect } from "react";
import axios from "axios";

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

export default function MenuDetail(){
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

  console.log("id", id);
  console.log("menu", menuItems);
  console.log("selected", selected_menu);

   return(
       <ChakraProvider>
          <Detail menu_items={selected_menu} status={false} />
       </ChakraProvider>
   )
}
