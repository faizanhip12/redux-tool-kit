import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostDataService from "../services/PostService";

const initialState = [];

export const createPost =createAsyncThunk("posts/create",
async()=>{
    const data =await PostDataService.getAll()
    console.log("data",data)
})

export const retrievePosts =createAsyncThunk("posts/retrieve",
async()=>{
    const res =await PostDataService.getAll()
    console.log("data",res)
    return res.data
})


const postSlice=createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createPost.fulfilled, (state, action) => {
            console.log("state createTutorial.fulfilled,",state)
            console.log("state createTutorial.fulfilled,",action)
            state.push(action.payload);
          })
          .addCase(retrievePosts.fulfilled, (state, action) => {
            console.log("statestatestate",state)
            console.log("actionactionactionactionaction",action)
            return action.payload;
          })
        //   .addCase(updateTutorial.fulfilled, (state, action) => {
        //     const index = state.findIndex(
        //       (tutorial) => tutorial.id === action.payload.id
        //     );
        //     state[index] = {
        //       ...state[index],
        //       ...action.payload,
        //     };
        //   })
        //   .addCase(deleteTutorial.fulfilled, (state, action) => {
        //     let index = state.findIndex(({ id }) => id === action.payload.id);
        //     state.splice(index, 1);
        //   })
        //   .addCase(deleteAllTutorials.fulfilled, (state, action) => {
        //     return [];
        //   })
        //   .addCase(findTutorialsByTitle.fulfilled, (state, action) => {
        //     return action.payload;
        //   });
      },
})

const { reducer } = postSlice;
export default reducer;