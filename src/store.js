import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slices/tutorials';
import postReducer from './slices/posts'

const reducer ={
    tutorials: tutorialReducer,
    posts:postReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
  })
  
  export default store;