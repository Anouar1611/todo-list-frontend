import http from "../http-common";

class TodoDataService {
  getAll() {
    return http.get("/todolist");
  }

  getAllItems(id) {
    return http.get(`/todolist/${id}/items`);
  }


  get(id) {
    return http.get(`/todolist/${id}`);
  }

  create(data) {
    return http.post("/todolist", data);
  }

  update(id, data) {
    return http.put(`/todolist/${id}`, data);
  }

  updateItem(id, itemId, data) {
    return http.put(`/todolist/${id}/items/${itemId}`, data);
  }

  delete(id) {
    return http.delete(`/todolist/${id}`);
  }

  deleteItem(id, itemId) {
    return http.delete(`/todolist/${id}/item/${itemId}`);
  }
}

export default new TodoDataService();