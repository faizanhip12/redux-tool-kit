// ChildModal.js
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './Modal.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { useDispatch } from "react-redux";
// import { createCustomer } from "../../slices/customer";
import { createCustomer } from '../../slices/customer'
import Button from '@mui/material/Button';
import { retrieveCustomers } from '../../slices/customer';
import { updateCustomer } from '../../slices/customer'
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

function Dialog({ open, handleClose, data, onDelete, onUpdateTable }: any) {
  const initialTutorialState = {
    id: null,
    userName: "",
    email: "",
    customerName: "",
    imageUrl: ""
  };

  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  // const { setValue } = useForm();
  // const [loading, setLoading] = React.useState(true);
  const [signupError, setSignupError] = useState(null); // State to hold sign-up error
  const [customer, setCustomer] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = React.useState(true)
  const [selectedImage, setSelectedImage] = useState("");

  console.log("Dialog")

  const dispatch = useDispatch();

  //@ts-ignore
  const customers = useSelector(state => state.customers) || [];

  console.log("useSelectoruseSelectoruseSelectoruseSelectoruseSelectoruseSelectoruseSelectoruseSelector", customers)


  // React.useEffect(() => {
  //   if (customers.length === 0) {
  //     setLoading(true);
  //   } else {

  //     if (data.id) {
  //       // const id = data.id

  //       console.log("data.iddata.iddata.iddata.iddata.iddata.iddata.iddata.id")

  //       const findUserById = (id: any) => {
  //         // Assuming findUser is your array of objects
  //         const user = customers.find((user: any) => user._id === id);
  //         return user;
  //       };
  //       //@ts-ignore
  //       const data = findUserById(data.id)
  //       console.log("myDatamyDatamyDatamyDatamyData", data)
  //     }

  //     setLoading(false);
  //   }
  // }, [customers]);


  useEffect(() => {
    //@ts-ignore
    dispatch(retrieveCustomers())
    console.log("customers", customers)

  }, [dispatch])

  useMemo(() => {
    console.log("useruseruseruseruser", data)
    if (data.id) {
      // const id = data.id

      console.log("data.iddata.iddata.iddata.iddata.iddata.iddata.iddata.id")

      const findUserById = (id: any) => {
        // Assuming findUser is your array of objects
        const user = customers.find((user: any) => user._id === id);

        console.log("useruseruseruseruseruser", user)
        return user;
      };
      //@ts-ignore
      const dataa = findUserById(data.id)
      console.log("myDatamyDatamyDatamyDatamyData", dataa)

      if (data.isDelete == false && data.modalType == "update") {
        console.log("updateupdateupdateupdateupdateupdateupdateupdate")
        //   setValue("userName", "yasir");
        //   setValue("email", dataa.email);
        //   setValue("customerName", dataa.customerName);
        //   setValue("imageUrl", dataa.imageUrl);
        //   const formData = new FormData();
        //   // formData.append('file', data.file[0]);
        //   formData.append('userName', dataa.userName);
        //   formData.append('customerName', dataa.customerName);
        //   // formData.append('email', dataa.email);

        //  // @ts-ignore
        //   dispatch(updateCustomer(formData))
        //     .unwrap()
        //     .then(() => {
        //       // navigate("/tutorials");
        //       // console.log("data", currentTutorial.id)
        //     })
        //     .catch((e: any) => {
        //       console.log(e);
        //     });
      }
      else {
        console.log("isDeleteisDeleteisDeleteisDeleteisDelete")
        // setValue("userName", dataa.userName);
        // setValue("email", dataa.email);
        // setValue("customerName", dataa.customerName);
      }

    }



  }, [data])



  // useEffect(() => {
  //   //@
  //   dispatch(retrieveCustomers()); // Fetch customers on component mount
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("useEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffectuseEffect")
  //   if (data.id && data.isDelete === false) {
  //     const findUserById = (id: any) => {
  //       const user = customers.find((user: any) => user._id === id);
  //       return user;
  //     };

  //     // Simulating asynchronous data fetching with setTimeout
  //     const user = findUserById(data.id);
  //     setTimeout(() => {

  //       if (user) {
  //         console.log("useruseruseruseruseruseruseruseruseruser", user)
  //         setValue("userName", user.userName);
  //         setValue("email", user.email);
  //         setValue("customerName", user.customerName);
  //         setLoading(false);
  //       }
  //     }, 1000);
  //   }
  // }, [data, customers, setValue]);




  console.log("formDataformDataformDataformDataformData", data)



  // const [value, setValue] = useState("create");



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
      .then((data: any) => {
        console.log(data);
        setCustomer({
          id: data.id,
          userName: data.userName,
          customerName: data.customerName,
          email: data.email,
          imageUrl: data.imageUrl

        });

        setSubmitted(true);
        onUpdateTable()
        console.log("customercustomercustomercustomer", customer)
      })
      .catch((e: any) => {
        console.log(e);
      });




  }




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    onDelete(data.id);
    handleClose();
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >

      {
        data.isDelete == true ? (<Box sx={{ ...style }}>
          <h2 id="child-modal-title">Confirm Delete</h2>
          <p>Are you sure you want to delete this customer?</p>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>


          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>) : (<Box sx={{ ...style }}>
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
                onChange={handleImageChange}
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
          {selectedImage && (
            <div>
              <h2>Selected Image:</h2>
              <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
            </div>
          )}
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>)
      }




    </Modal>


  );
}


export default Dialog
