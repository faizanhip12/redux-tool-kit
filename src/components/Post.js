import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrievePosts
 
} from "../slices/posts";
import { Link } from "react-router-dom";


function Post() {
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const posts = useSelector(state=>state.posts)
    const dispatch = useDispatch();
    console.log("posts",posts)
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
      };
    
      const initFetch = useCallback(() => {
        dispatch(retrievePosts());
        console.log("AddTutiorals retrieveTutorials")
      }, [dispatch])
    
      useEffect(() => {
        initFetch()
        console.log("useEffect initFetch()")
      }, [initFetch])
  return (
    <div>Post</div>
  )
}

export default Post