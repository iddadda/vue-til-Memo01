<script setup>
import { reactive, onMounted } from "vue";
import httpService from "@/services/HttpService";

const state = reactive({
  memos: [],
});
const model = {
  searchText: "",
};
let data = null;
// 메모 리스트 조회 함수
const findAll = async (params) => {
  data = await httpService.findAll(params);
  state.memos = data.resultData;
};
// 메모 검색
const search = () => {
  const params = {
    search_text: model.searchText,
  };
  findAll(params);
};
// 메모 삭제 이벤트
const remove = async (params) => {
  if (!confirm(`[${params.title}]을/를 삭제하겠습니까?`)) {
    return;
  }
  data = await httpService.deleteById(params);
  alert("삭제 완료");
};
// 첫 화면
onMounted(() => {
  findAll({});
});
</script>

<template>
  <div class="memo-list">
    <router-link to="/memo/add" class="add btn btn-light">
      + 추가하기
    </router-link>

    <div class="mb-3 mt-3 d-flex">
      <input
        type="text"
        class="form-control p-3 me-1"
        placeholder="검색어를 입력하시오"
        v-model="model.searchText"
        @keyup.enter="search"
      />
      <button type="button" class="btn btn-primary" @click="search">
        검색
      </button>
    </div>
    <router-link
      v-for="m in state.memos"
      :to="`/memo/${m.id}`"
      class="item"
      :key="m.id"
    >
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ m.title }}</b>
            <div>
              <span role="button" @click.prevent="remove(m)">삭제</span>
            </div>
          </div>
          <div class="mt-2">{{ m.content }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.memo-list {
  .item {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    &:hover {
      border-color: #aaa;
    }
  }
}

.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>
