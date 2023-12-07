import { ChakraProvider, Heading, Image, Spacer } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import '@fontsource/cinzel';
import CardWrapper from "@/components/CardWrapper";
import { Card, CardProps } from "@/components/Card";

const dummyMenuItems: CardProps['menu_items'] = [
    {
      menu_id: 1,
      menu_name: 'Dummy Menu 1',
      price: 10,
      duration: 30,
      calories: 300,
      level: 'Easy',
      menu_url: 'https://media.blueapron.com/recipes/42618/centered_main_dish_images/1699370928-27122-0008-7081/0111_2P12_Truffle-Butter-Steaks__263_Web.jpg?quality=80&width=800',
    },
    {
      menu_id: 2,
      menu_name: 'Dummy Menu 2',
      price: 15,
      duration: 45,
      calories: 450,
      level: 'Intermediate',
      menu_url: 'https://media.blueapron.com/recipes/42280/centered_main_dish_images/1699374112-45-0008-0494/0109_2PV2_Pinto-Squash-Cheese-tacos_544_Web.jpg?quality=80&width=800',
    },
    // Add more dummy data as needed
  ];

export default function Menu(){
    return(
        <ChakraProvider>
            <Navbar status={true} />
            <Heading
            textAlign={'center'}
            alignItems={'center'}
            m={5}
            fontFamily={'cinzel'}
            color={'#134074'}>
                Explore All Menus
            </Heading>
            <Spacer></Spacer>
            <CardWrapper columns={{base: 1, sm: 1, md: 2, lg: 3}}>
                <Card menu_items={dummyMenuItems}/>
            </CardWrapper>
        </ChakraProvider>
    )
}