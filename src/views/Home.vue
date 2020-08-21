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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({})
export default class Home extends Vue {
  logout() {
    router.push("/");
    sessionStorage.removeItem("is-auth");
  }
}
</script>

<style scoped lang="scss"></style>
