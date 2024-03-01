
import store from '../store'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
// import { fetchData } from "../slices/tutorials";

function Test() {
  // console.log("testtesttesttesttesttesttest")
  // const tutorials = useSelector(state => state.tutorial);
  // console.log("tutorials",tutorials )
  // const tutorials = store
  const tutorials = useSelector(state => state.tutorials);
  // const status = useSelector(state => state);
  // console.log("status status status status status", status)
  // Now you can use the tutorials array as needed
  console.log("tutorials",tutorials);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //  console.log("tutorialstutorialstutorialstutorials",tutorials)
  // }, []);

  return (
    <div>
      {/* Render tutorials here */}
    </div>
  );
}

export default Test