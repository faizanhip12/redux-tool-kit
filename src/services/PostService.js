import http from "../http-common";

const getAll =()=>{
    return http.get("/posts")
}

const PostService={
    getAll
}

export default PostService;