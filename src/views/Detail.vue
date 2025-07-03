<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import httpService from "@/services/HttpService";

const route = useRoute();
const router = useRouter();
const state = reactive({
  memo: {
    id: 0,
    title: "",
    content: "",
    createdAt: "",
  },
});

// 상세 페이지 첫 화면
onMounted(() => {
  findById(route.params.id);
});

// 메모 상세화면 보기
const findById = async (id) => {
  const data = await httpService.findById(id);
  state.memo = data.resultData;
};

// 수정 화면으로 이동하는 함수
const moveToForm = () => {
  // 수정할 때 보낼 데이터
  const json = JSON.stringify(state.memo);
  router.push({
    path: "/memo/add",
    state: {
      data: json,
    },
  });
};
</script>

<template>
  <div class="mb-3" v-if="state.memo.createdAt">
    등록일시: {{ state.memo.createdAt }}
  </div>
  <div class="mb-3">제목: {{ state.memo.title }}</div>
  <div class="mb-3">내용: {{ state.memo.content }}</div>
  <button type="submit" class="btn btn-primary w-100 py-3" @click="moveToForm">
    수정하기
  </button>
</template>

<style scoped></style>
