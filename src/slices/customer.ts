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
  "customer/retrieve",
  async () => {

    const res = await CustomerService.getAll();
    // console.log("retrieveretrieveretrieveretrieve",res)
    return res.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data) => {
    console.log("customer/update",data)
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
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.fulfilled, (state, action) => {
        console.log("state createTutorial.fulfilled,",state)
        console.log("state createTutorial.fulfilled,",action.payload)
        // state.push(action.payload.data);
        const newCustomers = [...state, action.payload.data]; // Using spread operator
        return newCustomers;
      })
      .addCase(retrieveCustomers.fulfilled, (state, action) => {
        console.log("statestatestatestatestatestatestate",state);
        console.log("actionactionactionactionaction",action.payload.data.customers);
        return action.payload.data.customers;

      })
      .addCase(updateCustomer.fulfilled, (state, action) => {

        console.log("updateCustomerupdateCustomerupdateCustomerupdateCustomerupdateCustomerupdateCustomer")

        console.log("update state",state);
        console.log("update action",action);
        const index = state.findIndex(
          (customer) => customer.id === action.payload.id
        );
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        //@ts-ignore
        // console.log("statestatestatestatestatestatestate",state.findIndex());
        console.log("actionactionactionactionaction",action.payload);
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