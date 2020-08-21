<template>
  <form class="c-signup-form" novalidate>
    <h4>SIGN UP</h4>
    <div class="form-group">
      <label for="name">Full name</label>
      <input type="text" class="form-control" id="name" disabled />
    </div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" disabled />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" disabled />
    </div>

    <button type="submit" class="btn btn-secondary" disabled>SIGN UP</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SignupForm extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
