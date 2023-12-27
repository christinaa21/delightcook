import {
    Box,
    Text,
    Image,
    Spacer,
    Button,
    HStack,
  } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

export interface IngredientCardProps {
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

interface QuantityPlaceholderProps {
  minQuantity: number;
  maxQuantity: number;
  defaultQuantity: number;
  unit: string;
}

const QuantityPlaceholder: React.FC<QuantityPlaceholderProps> = ({
  minQuantity,
  maxQuantity,
  defaultQuantity,
  unit,
}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <HStack color={'#134074'} boxSize={'auto'}>
      <Button onClick={handleDecrement} fontSize={"xl"} rounded={'20px'}>-</Button>
      <Text fontSize={"20px"} fontWeight={"bold"} px={3} mx={0.5} borderBottom={'1px'}>{quantity}</Text>
      <Text fontSize={"20px"}>{unit}</Text>
      <Button onClick={handleIncrement} fontSize={"xl"} rounded={'20px'}>+</Button>
    </HStack>
  );
};

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredients }) => {
    return(
        <>
        {ingredients.map((ingredient) => (
            <Box
                key={ingredient.ingredient_id}
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
                    src={ingredient.ingredient_url}
                    alt="Katalog bahan"
                    width={'100px'}
                    height={'100px'}
                    pr={3}
                        />
                    <Text
                        fontSize={'20px'}
                        fontWeight={'Bold'}
                        pb={1}
                        pr={75}
                    >
                        {ingredient.ingredient_name}
                    </Text>
                    <Spacer></Spacer>
                    <QuantityPlaceholder
                        minQuantity={ingredient.min_quantity}
                        maxQuantity={ingredient.max_quantity}
                        defaultQuantity={ingredient.default_quantity}
                        unit={ingredient.unit}
                    />
                </HStack>
            </Box>
        ))}
        </>
    )
}