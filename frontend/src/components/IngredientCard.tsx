import {
  Box,
  Text,
  Image,
  Spacer,
  Button,
  HStack,
  FormControl,
  FormLabel,
  useNumberInput,
  Input
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

interface HookUsageProps {
  ingredientId: number;
  defaultQuantity: number;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  onQuantityChange: (ingredientId: number, adjustedQuantity: number) => void;
}

function HookUsage({ ingredientId, defaultQuantity, minQuantity, maxQuantity, unit, onQuantityChange }: HookUsageProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, value } =
    useNumberInput({
      step: 1,
      defaultValue: defaultQuantity,
      min: minQuantity,
      max: maxQuantity,
    });

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    const handleQuantityChange = (newQuantity: number) => {
      onQuantityChange(ingredientId, newQuantity);
    };
  
    return (
      <HStack color={'#134074'} maxW='230px'>
        <Button {...dec} fontSize={"xl"} rounded={'20px'} onClick={() => handleQuantityChange(parseFloat(value))}>-</Button>
        <Input {...input} />
        <Text>{unit}</Text>
        <Button {...inc} fontSize={"xl"} rounded={'20px'} onClick={() => handleQuantityChange(parseFloat(value))}>+</Button>
      </HStack>
    )
  }

export const IngredientCard: React.FC<IngredientCardProps & { onQuantityChange: (ingredientId: number, adjustedQuantity: number) => void }> = ({ ingredients, onQuantityChange }) => {
  return(
      <>
      {ingredients.map((ingredient) => (
        <FormControl key={ingredient.ingredient_id}>
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
                  <FormLabel
                      fontSize={'20px'}
                      fontWeight={'Bold'}
                      pb={1}
                      pr={75}
                  >
                      {ingredient.ingredient_name}
                  </FormLabel>
                  <Spacer></Spacer>
                  <HookUsage
                    ingredientId={ingredient.ingredient_id}
                    defaultQuantity={ingredient.default_quantity}
                    minQuantity={ingredient.min_quantity}
                    maxQuantity={ingredient.max_quantity}
                    unit={ingredient.unit}
                    onQuantityChange={onQuantityChange}
                  />
              </HStack>
          </Box>
        </FormControl>
      ))}
      </>
  )
}