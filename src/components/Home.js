import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        if(!user){
            navigate('/login')
        }
    }, [])

    return (
        <div>Home</div>
    )
}

export default Home