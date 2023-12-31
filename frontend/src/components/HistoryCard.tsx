import {
    Box,
    Text,
    Image,
    Spacer,
    VStack,
    Button,
    HStack,
  } from '@chakra-ui/react';
import '@fontsource/cinzel';
import Link from 'next/link';

export interface HistoryProps {
    history: {
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
    }[],
}

export const HistoryCard: React.FC<HistoryProps> = ({ history }) => {
    return(
        <>
        {history.map((item) => (
            <Box
                key={item.order_id}
                w={"auto"}
                h={"auto"}
                bg={"white"}
                border={'1px solid #000'}
                borderRadius={15}
                padding={4}
                mx={25}
            >
                <HStack>
                    <Image
                    style={{ objectFit: 'cover' }}
                    src={item.menu_url}
                    alt={item.menu_name}
                    width={'300px'}
                    height={'150px'}
                    pr={3}
                        />
                    <VStack color={'#134074'} align={"left"}>
                        <Text
                            fontSize={'20px'}
                            fontWeight={'Bold'}
                        >
                            {item.menu_name}
                        </Text>
                        <Text>
                            {item.menu_quantity} barang
                        </Text>
                        <Spacer></Spacer>
                        <HStack>
                            <Text>
                                Total Harga:
                            </Text>
                            <Text
                                fontSize={'20px'}
                                fontWeight={'Bold'}
                            >
                                IDR {item.price * item.menu_quantity}
                            </Text>
                            <Link href={`/history/${item.order_id}`} passHref>
                                <Button
                                colorScheme="#134074"
                                color="#134074"
                                _hover={{ color: '#3FC3FE' }}
                                fontWeight={'bold'}
                                borderRadius={30}
                                mx={1}
                                variant={'outline'}>
                                    Detail
                                </Button>
                            </Link>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        ))}
        </>
    )
}