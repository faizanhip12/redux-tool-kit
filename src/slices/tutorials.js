import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TutorialDataService from "../services/TutorialService";

const initialState = [];

export const createTutorial = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }) => {
    const res = await TutorialDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    console.log("retrieveretrieveretrieveretrieve")
    const res = await TutorialDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async (data) => {
    console.log("tutorials/update",data)
    const res = await TutorialDataService.update(data);
    console.log("tutorials/update",res.data)
    return res.data;
    
  }
);

export const deleteTutorial = createAsyncThunk(
  "tutorials/delete",
  async ({ id }) => {
    await TutorialDataService.remove(id);
    console.log("res.datares.datares.data",id)
    return { id };
  }
);

export const deleteAllTutorials = createAsyncThunk(
  "tutorials/deleteAll",
  async () => {
    const res = await TutorialDataService.removeAll();
    return res.data;
  }
);

export const findTutorialsByTitle = createAsyncThunk(
  "tutorials/findByTitle",
  async ({ title }) => {
    const res = await TutorialDataService.findByTitle(title);
    console.log("res.datares.datares.data",res.data)
    return res.data;
  }
);

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTutorial.fulfilled, (state, action) => {
        // console.log("state createTutorial.fulfilled,",state)
        // console.log("state createTutorial.fulfilled,",action)
        state.push(action.payload);
      })
      .addCase(retrieveTutorials.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateTutorial.fulfilled, (state, action) => {

        console.log("update state",state);
        console.log("update action",action);
        const index = state.findIndex(
          (tutorial) => tutorial.id === action.payload.id
        );
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteTutorial.fulfilled, (state, action) => {
        console.log("statestatestatestatestatestatestate",state);
        console.log("actionactionactionactionaction",action);
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      })
    //   .addCase(deleteAllTutorials.fulfilled, (state, action) => {
    //     return [];
    //   })
    //   .addCase(findTutorialsByTitle.fulfilled, (state, action) => {
    //     return action.payload;
    //   });
  },
});

const { reducer } = tutorialSlice;
export default reducer;