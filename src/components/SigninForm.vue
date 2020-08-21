<template>
  <form class="c-signin-form" @submit.prevent="signin()" novalidate>
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
      >
        Email is required
      </div>
      <div
        class="error"
        v-if="$v.siginFormVal.email.$dirty && !$v.siginFormVal.email.emailVal"
      >
        Enter a valid email
      </div>
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
      >
        Password is required
      </div>
      <div
        class="error"
        v-if="$v.siginFormVal.pwd.$dirty && !$v.siginFormVal.pwd.maxLength"
      >
        Password should not contain more than
        {{ $v.siginFormVal.pwd.$params.maxLength.max }} characters.
      </div>
    </div>

    <div class="form-group">
      <a href>Forgot password?</a>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      Email does not exist
    </div>
    <button type="submit" class="btn btn-secondary">SIGN IN</button>
    <div class="clearfix"></div>
    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import router from "@/router";
import SigninData from "@/models/signin-interface";
import LoginService from "@/services/login-service";
import { emailVal } from "@/constants/custom-validations";

@Component({
  mixins: [validationMixin],
  validations: {
    siginFormVal: {
      email: { required, emailVal },
      pwd: { required, maxLength: maxLength(20) }
    }
  }
})
export default class SigninForm extends Vue {
  private siginFormVal = {
    email: "",
    pwd: ""
  };
  private loading = false;
  private error = false;

  signin() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.loading = true;
      const data: SigninData = {
        email: this.siginFormVal.email,
        password: window.btoa(this.siginFormVal.pwd)
      };

      LoginService.signin(data)
        .then(() => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.c-signin-form {
  a {
    font-size: 12px;
    color: #333;
  }
}

.error {
  color: #f96666;
  font-size: 14px;
}
</style>
