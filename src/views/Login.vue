<template>
  <div class="c-login">
    <div class="container h-100">
      <div class="d-flex flex-column justify-content-center h-100">
        <div class="c-black-box rounded d-flex align-items-center">
          <div class="col text-white">
            <div class="c-left-content">
              <h2 class="font-weight-normal">Don't have an account?</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="sigupFormActive = true"
              >SIGN UP</button>
            </div>
          </div>
          <div class="col text-white">
            <div class="c-right-content">
              <h2 class="font-weight-normal">Have an account?</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="sigupFormActive = false"
              >SIGN IN</button>
            </div>
          </div>

          <transition name="slide">
            <div
              class="c-white-box rounded"
              :class="{'c-signin-box':!sigupFormActive,'c-signup-box':sigupFormActive}"
              v-if="initLoad"
            >
              <form v-if="sigupFormActive" class="c-signup-form" novalidate>
                <h4>SIGN UP</h4>
                <div class="form-group">
                  <label for="name">Full name</label>
                  <input type="text" class="form-control" id="name" />
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" class="form-control" id="email" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" />
                </div>

                <button type="submit" class="btn btn-secondary">SIGN UP</button>
              </form>

              <form v-else class="c-signin-form" @submit.prevent="signin()" novalidate>
                <h4>SIGN IN</h4>
                <div class="form-group">
                  <label for="email_l">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email_l"
                    :value="$v.siginFormVal.email.$model"
                    @blur="$v.siginFormVal.email.$model = $event.target.value.trim()"
                  />
                  <div
                    class="error"
                    v-if="$v.siginFormVal.email.$dirty && !$v.siginFormVal.email.required"
                  >Email is required</div>
                  <div
                    class="error"
                    v-if="$v.siginFormVal.email.$dirty && !$v.siginFormVal.email.emailVal"
                  >Enter a valid email</div>
                </div>

                <div class="form-group">
                  <label for="password_l">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password_l"
                    :value="$v.siginFormVal.pwd.$model"
                    @blur="$v.siginFormVal.pwd.$model = $event.target.value"
                  />
                  <div
                    class="error"
                    v-if="$v.siginFormVal.pwd.$dirty && !$v.siginFormVal.pwd.required"
                  >Password is required</div>
                  <div
                    class="error"
                    v-if="$v.siginFormVal.pwd.$dirty && !$v.siginFormVal.pwd.maxLength"
                  >Password should not contain more than {{ $v.siginFormVal.pwd.$params.maxLength.max }} characters.</div>
                </div>

                <div class="form-group">
                  <a href>Forgot password?</a>
                </div>
                <div v-if="error" class="alert alert-danger" role="alert">Email does not exist</div>
                <button type="submit" class="btn btn-secondary">SIGN IN</button>
                <div class="clearfix"></div>
                <div class="d-flex justify-content-center" v-if="loading">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <pre>
                <!-- {{$v }} -->
                </pre>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.c-login {
  background: center / cover no-repeat url("../assets/images/bg-login.jpg");
  height: 100vh;
  width: 100%;
}

.c-black-box {
  background: rgba(0, 0, 0, 0.7);
  height: 400px;
  box-shadow: -1px 3px 17px 5px rgba(0, 0, 0, 0.52);
  position: relative;
}

.c-white-box {
  height: 120%;
  background: white;
  padding: 40px;
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
    font-size: 14px;
  }
  h2 {
    font-size: 26px;
  }
}

.c-signin-form {
  a {
    font-size: 12px;
    color: #333;
  }
}

.btn-outline-secondary {
  border-color: white;
  color: white;
}

.error {
  color: #f96666;
  font-size: 14px;
}
//animation

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LoginService from "@/services/login-service";
import SigninData from "@/models/signin-interface";
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import router from "@/router";
import { helpers } from "vuelidate/lib/validators";

const emailVal = helpers.regex(
  "emailVal",
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  mixins: [validationMixin],
  validations: {
    siginFormVal: {
      email: { required, emailVal },
      pwd: { required, maxLength: maxLength(20) }
    }
  },
  components: {}
})
export default class Login extends Vue {
  private siginFormVal: any = {
    email: "",
    pwd: ""
  };

  private sigupFormActive = false;
  private initLoad = false;
  private loading = false;
  private error = false;

  mounted() {
    this.initLoad = true;
  }

  signin(event: any) {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.loading = true;
      const data: SigninData = {
        email: this.siginFormVal.email,
        password: window.btoa(this.siginFormVal.pwd)
      };

      LoginService.signin(data)
        .then(response => {
          router.push("home");
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
          this.error = true;
        });
    }
  }
}
</script>
