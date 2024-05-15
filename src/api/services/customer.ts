import http from "../interceptor";

const getAll = () => {
  console.log("getAllgetAll")
  return http.get("/customer")
}

const get = (id:any) => {
  return http.get(`/tutorials/${id}`);
};

const create = (data:any) => {
  return http.post("/customer", data);
};
const remove = (id:any) => {
  console.log("removeremoveremoveremoveremoveremove",id)
  return http.delete(`/tutorials/${id}`);
};

const update = (data:any) => {
  console.log("update",data)
  return http.put(`/tutorials/${data.id}`,data);
};

const TutorialService = {
  getAll,
  get,
  create,
  remove,
  update
}

export default TutorialService;