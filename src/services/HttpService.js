import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

class HttpService {
  // 메모 리스트 조회
  async findAll(params) {
    const res = await axios.get("/memo", { params });
    return res.data;
  }
  // 메모 상세 보기
  async findById(id) {
    const res = await axios.get(`/memo/${id}`);
    return res.data;
  }
  // 메모 저장하기
  async save(josonBody) {
    const res = await axios.post("/memo", josonBody);
    return res.data;
  }
  // 메모 수정하기
  async modify(josonBody) {
    const res = await axios.put("/memo", josonBody);
    return res.data;
  }
  // 메모 삭제하기
}

export default new HttpService();
