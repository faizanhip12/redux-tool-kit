import http from "../http-common";

const getAll = () => {
  console.log("getAllgetAll")
  return http.get("/tutorials")
}

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/tutorials", data);
};
const remove = id => {
  console.log("removeremoveremoveremoveremoveremove",id)
  return http.delete(`/tutorials/${id}`);
};

const update = data => {
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