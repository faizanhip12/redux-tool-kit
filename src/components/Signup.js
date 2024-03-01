import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { userRoles, signup, getUser } from '../services/auth';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from './Toast'

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const [roles, setRoles] = useState([]);

    const [user, setUser] = useState();

    const [email, setEmail] = useState(null);

    const [error, setError] = useState("")

    const [message, setMessage] = useState("")

    const [toast, showToast] = useState(false)

    let navigate = useNavigate();

    const submitForm = (data) => {
        console.log("datadatadatadatadata", data)
        getUser()
            .then((res) => {
                console.log(res.data)
                // let data =res.data


                const findEmail = res.data.find(user => user.email == data.email);
                console.log("findEmail", findEmail)
                
                setEmail(findEmail !== undefined ? findEmail : null);
               
               


                return res
            })
            .catch((err) => {
                console.log(err)
                // setError(()=>)

            })
        // console.log("user",user.email)
        if (email) {
            // showToast(true)
            // setMessage(`${user.email} is alredy exits`)
            // console.log(`${user.email} alredy exits`)
        }
        else {
            signup(data)
                .then((res) => {
                    console.log("signup success", res.data)
                    // navigate("/login");
                    // console.log("data", currentTutorial.id)
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }


    }
    useEffect(() => {
        userRoles().
            then((res) => {

                setRoles(res.data)
                console.log("dara", res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [])
    const handleCloseToast = () => {
        showToast(false);
    };

    return (
        <>
            <Toast
                show={toast}
                onClose={handleCloseToast}
                message={message}
            />
            <form onSubmit={handleSubmit((data) => submitForm(data))}>

                {/* <input {...register('firstName')} />
        <input {...register('lastName', { required: true })} />
        {errors.lastName && <p>Last name is required.</p>}
        <input {...register('age', { pattern: /\d+/ })} />
        {errors.age && <p>Please enter number for age.</p>}
        <input type="submit" /> */}
                <div className="mb-3">
                    <label htmlFor="example@gmail.com" className="form-label">Email address</label>
                    {/* <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"> */}
                    <input {...register('email', { required: true })} className="form-control" />
                    {errors.email && <p>Email is required.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input {...register('password', { required: true })} className="form-control" />
                    {errors.password && <p>Please enter password.</p>}
                </div>
                {/* <div className="mb-3">
              <label htmlFor="password" className="form-label">password</label>
              <input {...register('password', { required: true })} className="form-control" />
              {errors.password && <p>Please enter password.</p>}
          </div> */}
                <div className="mb-3">
                    <select {...register('role', { required: true })} className="form-control" id="exampleFormControlSelect1">
                        {roles && roles.map(role => (
                            <option key={role.id} value={role.id}>{role.role}</option>
                        ))}
                    </select>
                    {errors.role && <p>Please select a role.</p>}
                </div>

                <button className="btn btn-success">Submit</button>

            </form>
        </>

    );
}

export default Signup