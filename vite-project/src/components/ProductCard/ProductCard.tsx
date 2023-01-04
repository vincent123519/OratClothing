import {
  AddButton,
  SubTitle,
  TextContainer,
  Title,
  Wrapper,
} from './ProductCard.styled';

import { Product } from '../../models';
import { useState, useEffect, useContext } from 'react';
import { ShopContext} from "../../UseContext";

export const ProductCard = ({ name, imageUrl, price}: Product) => {
  const {products, removeItem, addToCart} = useContext(ShopContext);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWish, setIsInWish] = useState(false);
  
  useEffect(() => {
    const cartItems = products.find((product: { name: string; }) => product.name === name);

    if (cartItems) {
      setIsInCart(true);

    }else if(!cartItems){
      setIsInCart(false);
    }
  }, [products,name]);
  
  const handleCart = () => {
    const product = {name, imageUrl, price};
    if(isInCart){
      removeItem(product);
     
    } else{
      addToCart(product);
      
    }
  }

  return (
    <Wrapper background={imageUrl}>
      <AddButton isInCart={isInCart} onClick={handleCart}>
        <p>{isInCart?  "-" : "+"}</p>
      </AddButton>
      <TextContainer>
        <Title>{name}</Title>
        <SubTitle>${price}.00</SubTitle>
      </TextContainer>
    </Wrapper>
  );
};