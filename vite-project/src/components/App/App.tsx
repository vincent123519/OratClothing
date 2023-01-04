import { Link, Route, Routes } from "react-router-dom";
import { LinksWrapper, TitleWrapper, Wrapper } from "./App.styled";
import { Cart } from "../Cart";
import { Products } from "../Products";
import { ShopContext } from "../../UseContext";
import { useReducer } from "react";
import {
  add,
  initialState,
  remove,
  shopReducer,
  update,
} from "../../useReducer";
import { Product } from "../../models";


export const App = () => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product: Product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch(add(updatedCart));
  };

  const removeItem = (product: Product) => {
    const updatedCart = state.products.filter(
      (currentProduct: Product) => currentProduct.name !== product.name
    );
    updatePrice(updatedCart);

    dispatch(remove(updatedCart));


  };

  const updatePrice = (products: [] = []) => {
    let total = 0;
    let items = 0;
    products.forEach(
      (product: { price: number; }) =>
        (total +=  product.price)
    );

    dispatch(update(total));
  };

  const updateCart = (product: Product, quantity: number) => {
    const updatedCart = state.products.map((items: { name: string }) =>
      items.name === product.name ? { ...items, quantity: quantity } : items
    );
    dispatch(updatedCart);

    updatePrice(updatedCart);
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeItem,
    updatePrice,
    updateCart,
  };
  return (
    <ShopContext.Provider value={value}>
      <Wrapper>
        <TitleWrapper>
          <h1>Clothing Shop Starter Project</h1>
        </TitleWrapper>
        <LinksWrapper>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </LinksWrapper>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Wrapper>
    </ShopContext.Provider>
  );
};