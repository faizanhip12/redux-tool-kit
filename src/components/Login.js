import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { userRoles, signup, getUser } from '../services/auth';
import { useParams, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import Toast from './Toast'

function Login() {
    const { login } = useAuth(); // Use useAuth hook to access login function
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

    const submitForm = async (data) => {

        // const {login, logout, setUser,user } = useAuth()
        console.log("user ",user )

        const userData = getUser()
            .then((res) => {
                console.log(res.data)
                console.log("data", data.email)
                // let data =res.data


                const findEmail = res.data.find(user => user.email == data.email.toString());
                console.log("findEmail", findEmail)

                setEmail(findEmail.email);

                // console.log("email email", email)


                return findEmail
            })
            .catch((err) => {
                console.log(err)
                setMessage(`${err.message}`)
                showToast(true)


            })
        console.log("user", userData)
        const emailFind = await userData
        console.log("emailFind", emailFind)
        if (emailFind) {
            // showToast(true)
            // console.log("email email", email)
            // setMessage(`${emailFind.email} is alredy exits`)
            // showToast(true)
            // console.log(`${user.email} alredy exits`)
            if (emailFind.password == data.password) {
                // console.log("signup success", res.data)
                setMessage(`${emailFind.email} suucess login`)
                showToast(true)
                login(emailFind); // Update user data in context
                navigate('/tutorials')
            }
            else{
                setMessage(`${emailFind.email} password doesn't match`)
                showToast(true)
            }
        }
        else {
            setMessage(`${data.email} email not found please register first then login`)
            showToast(true)
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
                {/* <div className="mb-3">
                    <select {...register('role', { required: true })} className="form-control" id="exampleFormControlSelect1">
                        {roles && roles.map(role => (
                            <option key={role.id} value={role.id}>{role.role}</option>
                        ))}
                    </select>
                    {errors.role && <p>Please select a role.</p>}
                </div> */}

                <button className="btn btn-success">Submit</button>

            </form>
        </>

    );
}

export default Login