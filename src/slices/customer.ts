import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import CustomerService from "../api/services/customer";

const initialState:any[] = [];

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (data) => {
    const res = await CustomerService.create(data);
    return res.data;
  }
);

export const retrieveCustomers = createAsyncThunk(
  "customers/retrieve",
  async () => {
    console.log("retrieveretrieveretrieveretrieve")
    const res = await CustomerService.getAll();
    return res.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data) => {
    console.log("tutorials/update",data)
    const res = await CustomerService.update(data);
    console.log("tutorials/update",res.data)
    return res.data;
    
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async ( id ) => {
    await CustomerService.remove(id);
    console.log("res.datares.datares.data",id)
    return { id };
  }
);

// export const deleteAllTutorials = createAsyncThunk(
//   "tutorials/deleteAll",
//   async () => {
//     const res = await TutorialDataService.removeAll();
//     return res.data;
//   }
// );

// export const findTutorialsByTitle = createAsyncThunk(
//   "tutorials/findByTitle",
//   async ({ title }) => {
//     const res = await CustomerService.findByTitle(title);
//     console.log("res.datares.datares.data",res.data)
//     return res.data;
//   }
// );

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.fulfilled, (state, action) => {
        // console.log("state createTutorial.fulfilled,",state)
        // console.log("state createTutorial.fulfilled,",action)
        state.push(action.payload);
      })
      .addCase(retrieveCustomers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {

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
      .addCase(deleteCustomer.fulfilled, (state, action) => {
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

const { reducer } = customerSlice;
export default reducer;