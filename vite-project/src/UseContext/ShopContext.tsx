import { createContext } from "react";
import { ShopState, initialState } from '../useReducer';

export const ShopContext = createContext<ShopState>(initialState);