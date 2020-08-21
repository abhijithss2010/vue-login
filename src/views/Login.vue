<template>
  <div class="c-login">
    <div class="container h-100">
      <div class="d-flex flex-column justify-content-center h-100">
        <div class="c-black-box rounded d-flex align-items-center">
          <div class="col text-white">
            <div class="c-left-content">
              <h2 class="font-weight-normal">Don't have an account?</h2>
              <p>
                This vue app is developed for showcasing to Paul regarding my
                Vue readiness as per the requirements shared.
              </p>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="signupFormActive = true"
              >
                SIGN UP
              </button>
            </div>
          </div>
          <div class="col text-white">
            <div class="c-right-content">
              <h2 class="font-weight-normal">Have an account?</h2>
              <p>
                This vue app is developed for showcasing to Paul regarding my
                Vue readiness as per the requirements shared.
              </p>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="signupFormActive = false"
              >
                SIGN IN
              </button>
            </div>
          </div>

          <transition name="slide">
            <div
              class="c-white-box rounded"
              :class="{
                'c-signin-box': !signupFormActive,
                'c-signup-box': signupFormActive
              }"
              v-if="initLoad"
            >
              <signup-form-component
                v-if="signupFormActive"
              ></signup-form-component>
              <signin-form-component v-else></signin-form-component>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignupFormComponent from "@/components/SignupForm.vue";
import SigninFormComponent from "@/components/SigninForm.vue";

@Component({
  components: {
    SignupFormComponent,
    SigninFormComponent
  }
})
export default class Login extends Vue {
  private signupFormActive = false;
  private initLoad = false;

  mounted() {
    this.initLoad = true;
  }
}
</script>

<style scoped lang="scss">
.c-login {
  background: center / cover no-repeat url("../assets/images/bg-login.jpg");
  height: 100vh;
  width: 100%;
}

.c-black-box {
  background: rgba($black, 0.7);
  height: rem-calc(400px);
  box-shadow: -1px 3px 17px 5px rgba($black, 0.52);
  position: relative;
}

.c-white-box {
  height: 120%;
  background: white;
  padding: rem-calc(40px);
  position: absolute;
  width: 45%;
  left: 50%;
  transition: left 0.6s cubic-bezier(0.27, -0.34, 0.65, 1.13);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  &.c-signup-box {
    left: 5%;
  }
}

.c-left-content,
.c-right-content {
  width: 80%;
  margin: 0 auto;
  p {
    font-size: rem-calc(14px);
  }
  h2 {
    font-size: rem-calc(26px);
  }
}

.btn-outline-secondary {
  border-color: $white;
  color: $white;
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
