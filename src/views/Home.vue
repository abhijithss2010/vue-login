<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center vh-100"
  >
    <h2>Login successful</h2>
    <button type="submit" class="btn btn-secondary" @click="logout()">
      LOG OUT
    </button>
  </div>
</template>
<style scoped lang="scss"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({})
export default class Home extends Vue {
  logout() {
    router.push("/");
  }
}
</script>
