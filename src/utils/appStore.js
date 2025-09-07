import { configureStore} from "@reduxjs/toolkit";
//import cartReducer from './cartSlice';
import commentReducer from './commentSlice';


const appStore=configureStore({
  reducer: {
    comment:commentReducer,
  }
});

export default appStore