// ChildModal.js
import React, { useState } from 'react';
import { useDispatch } from "react-redux"; 
import './Modal.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { useDispatch } from "react-redux";
// import { createCustomer } from "../../slices/customer";
import {createCustomer} from '../../slices/customer'
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,

};

function Dialog({ open, handleClose }: any) {

  const dispatch = useDispatch();
  const initialTutorialState = {
    id: null,
    userName: "",
    email: "",
    customerName:"",
    imageUrl:""
  };

  const { handleSubmit, register, formState: { errors } } = useForm();
  const [signupError, setSignupError] = useState(null); // State to hold sign-up error
  const [customer, setCustomer] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

 

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log("formDataformDataformDataformDataformData", data)
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('userName', data.userName);
    formData.append('customerName', data.customerName);
    formData.append('email', data.email);
    //@ts-ignore
    dispatch(createCustomer(formData))
    .unwrap()
    .then((data:any) => {
        console.log(data);
        setCustomer({
            id: data.id,
            userName: data.userName,
            customerName: data.customerName,
            email: data.email,
            imageUrl:data.imageUrl

        });

        setSubmitted(true);
        console.log("customercustomercustomercustomer",customer)
    })
    .catch((e:any) => {
        console.log(e);
    });













  }



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >

      <Box sx={{ ...style }}>
        <h2 id="child-modal-title">Text in a child modal</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <input
            type="text"
            placeholder="Username"
            {...register("userName", {
              required: "UserName is required",
            })}
          />
          {/* {errors.username && <p className="error-message">{errors.username.message}</p>} */}


          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {/* {errors.email && <p className="error-message">{errors.email.message}</p>} */}

          <input
            type="text"
            placeholder="Customer name"
            {...register("customerName", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {/* {errors.password && <p className="error-message">{errors.password.message}</p>} */}


          <div className="file-upload-container">
            <input
              type="file"
              accept="image/*"
              {...register("file", {
                required: "Image is required",
              })}
              className="file-input"
            />
            <div className="file-upload">
              Upload Image
            </div>
          </div>

          {/* Display error message for image upload */}
          {/* {errors.image && <p className="error-message">{errors.image.message}</p>} */}



          {signupError && <p className="error-message">{signupError}</p>} {/* Display sign-up error message */}

          <button type="submit">Sign Up</button>
        </form>
        {/* <p id="child-modal-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p> */}
        <Button onClick={handleClose}>Close Child Modal</Button>
      </Box>
    </Modal>
  );
}


export default Dialog
