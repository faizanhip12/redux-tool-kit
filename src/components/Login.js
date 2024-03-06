import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { userRoles, signup, getUser } from '../services/auth';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import Toast from './Toast'

function Login() {
    const { login, seetUser } = useAuth(); // Use useAuth hook to access login function
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

        

        const userData = getUser()
            .then((res) => {
               


                const findEmail = res.data.find(user => user.email == data.email.toString());
               

                setEmail(findEmail.email);

          

                return findEmail
            })
            .catch((err) => {
                console.log(err)
                setMessage(`${err.message}`)
                showToast(true)


            })
       
        const emailFind = await userData
      
        if (emailFind) {
          
            if (emailFind.password == data.password) {
              
                setMessage(`${emailFind.email} suucess login`)
                showToast(true)
                login(emailFind); // Update user data in context
                seetUser(emailFind)
                navigate('/tutorials')
            }
            else {
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
                
            })
            .catch((err) => {
                console.log("err", err)
            })
    }, [])
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData")) != null) {
            navigate('/tutorials')
        }
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

                <div className="mb-3">
                    <label htmlFor="example@gmail.com" className="form-label">Email address</label>
                
                    <input {...register('email', { required: true })} className="form-control" />
                    {errors.email && <p>Email is required.</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input {...register('password', { required: true })} className="form-control" />
                    {errors.password && <p>Please enter password.</p>}
                </div>
               

                <button className="btn btn-success">Submit</button>

            </form>
        </>

    );
}

export default Login