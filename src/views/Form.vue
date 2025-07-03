<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import httpService from "@/services/HttpService";

const router = useRouter();
const state = reactive({
  memo: {
    id: 0,
    title: "",
    content: "",
    createdAt: "",
  },
});
// Detail.vue에서 넘겨받은 데이터
const passData = history.state.data;
// 수정하기 화면에 데이터 받기
onMounted(() => {
  if (passData) {
    state.memo = JSON.parse(passData);
  }
});
// submit 이벤트
const submit = async () => {
  let path = "/";
  let data = null;
  const jsonBody = {
    title: state.memo.title,
    content: state.memo.content,
  };
  if (history.state.data) {
    jsonBody.id = state.memo.id;
    path = `/memo/${jsonBody.id}`;
    data = await httpService.modify(jsonBody);
  } else {
    data = await httpService.save(jsonBody);
    state.memo = data.resultData;
  }

  if (data.resultData === 1) {
    router.push({ path });
  }
};
</script>

<template>
  <form class="detail" @submit.prevent="submit" @keyup.enter="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        class="form-control p-3"
        v-model="state.memo.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">
      {{ state.memo.id > 0 ? "수정" : "저장" }}
    </button>
  </form>
</template>

<style scoped></style>
