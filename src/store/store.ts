import { configureStore } from '@reduxjs/toolkit'
// import tutorialReducer from './slices/tutorials';
import customerReducer from '../slices/customer'

const reducer ={
    // tutorials: tutorialReducer,
    customerss:customerReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
  })
  
  export default store;