import { shallowMount } from "@vue/test-utils";
import SigninForm from "@/components/SigninForm.vue";
import LoginService from "@/services/login-service";

describe("Signin Form validation", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(SigninForm);
  });

  //Checking required validation for email field
  it("Should pass after checking required validation for email field", () => {
    const textInput = wrapper.find('input[type="email"]');

    textInput.setValue("");
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.email.required).toBeFalsy();

    textInput.setValue("ab");
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.email.required).toBeTruthy();
  });

  //Checking email pattern validation for email field
  it.each([
    ["adfgmail.com", false],
    ["adf@gmailcom", false],
    ["ard@gmail.com", true],
    ["adf@yahoo.com", true],
  ])(`Checking email %s returns %s`, (a, expected) => {
    const textInput = wrapper.find('input[type="email"]');

    textInput.setValue(a);
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.email.emailVal).toBe(expected);
  });

  //Checking required validation for password field
  it("Should pass after checking required validation for password field", () => {
    const textInput = wrapper.find('input[type="password"]');

    textInput.setValue("");
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.pwd.required).toBeFalsy();

    textInput.setValue("ab@345");
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.pwd.required).toBeTruthy();
  });

  //Checking max length validation for password field
  it("Should pass after checking max length validation for password field", () => {
    const textInput = wrapper.find('input[type="password"]');
    const maxLength = 20;
    const generateText = (length: number) =>
      new Array(length).fill("a").join("");

    textInput.setValue(generateText(21));
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.pwd.maxLength).toBeFalsy();

    textInput.setValue(generateText(20));
    textInput.trigger("blur");
    expect(wrapper.vm.$v.siginFormVal.pwd.maxLength).toBeTruthy();
  });
});
