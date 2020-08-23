import { shallowMount } from "@vue/test-utils";
import SigninForm from "@/components/SigninForm.vue";
import LoginService from "@/services/login-service";

describe("Signin Form validation - Isolated", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(SigninForm);
  });

  //Checking required validation for email field
  it("Should pass after checking required validation for email field", async () => {
    let email = wrapper.vm.$v.siginFormVal.email;

    email.$model = "";
    expect(email.required).toBeFalsy();
    expect(email.$dirty).toBeTruthy();

    email.$model = "ab";
    expect(email.required).toBeTruthy();
    expect(email.$dirty).toBeTruthy();
  });

  //Checking email pattern validation for email field
  it.each([
    ["adfgmail.com", false],
    ["adf@gmailcom", false],
    ["ard@gmail.com", true],
    ["adf@yahoo.com", true],
  ])(`Checking email %s returns %s`, (a, expected) => {
    let email = wrapper.vm.$v.siginFormVal.email;

    email.$model = a;
    expect(email.emailVal).toBe(expected);
    expect(email.$dirty).toBeTruthy();
  });

  //Checking required validation for password field
  it("Should pass after checking required validation for password field", () => {
    let pwd = wrapper.vm.$v.siginFormVal.pwd;

    pwd.$model = "";
    expect(pwd.required).toBeFalsy();
    expect(pwd.$dirty).toBeTruthy();

    pwd.$model = "ab";
    expect(pwd.required).toBeTruthy();
    expect(pwd.$dirty).toBeTruthy();
  });

  //Checking max length validation for password field
  it("Should pass after checking max length validation for password field", () => {
    let pwd = wrapper.vm.$v.siginFormVal.pwd;
    const maxLength = 20;
    const generateText = (length: number) =>
      new Array(length).fill("a").join("");

    pwd.$model = generateText(21);
    expect(pwd.maxLength).toBeFalsy();

    pwd.$model = generateText(20);
    expect(pwd.maxLength).toBeTruthy();
  });
});

describe("Signin Form validation - Shallow", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(SigninForm);
  });

  //Checking required validation for email field
  it("Should pass after checking required validation for email field", async () => {
    const textInput = wrapper.find('input[type="email"]');

    textInput.setValue("");
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").text()).toEqual("Email is required");
    });

    textInput.setValue("ab");
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").exists()).toBeFalsy();
    });
  });

  //Checking email pattern validation for email field
  it.each([
    ["adfgmail.com", false],
    ["adf@gmailcom", false],
    ["ard@gmail.com", true],
    ["adf@yahoo.com", true],
  ])(`Checking email %s returns %s`, async (a, expected) => {
    const textInput = wrapper.find('input[type="email"]');

    textInput.setValue(a);
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expected
        ? expect(wrapper.find(".error").exists()).toBeFalsy()
        : expect(wrapper.find(".error").text()).toEqual("Enter a valid email");
    });
  });

  //Checking required validation for password field
  it("Should pass after checking required validation for password field", async () => {
    const textInput = wrapper.find('input[type="password"]');

    textInput.setValue("");
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").text()).toEqual("Password is required");
    });

    textInput.setValue("ab@345");
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").exists()).toBeFalsy();
    });
  });

  //Checking max length validation for password field
  it("Should pass after checking max length validation for password field", async () => {
    const textInput = wrapper.find('input[type="password"]');
    const maxLength = 20;
    const generateText = (length: number) =>
      new Array(length).fill("a").join("");

    textInput.setValue(generateText(21));
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").text()).toEqual(
        `Password should not contain more than ${maxLength} characters.`
      );
    });

    textInput.setValue(generateText(20));
    textInput.trigger("blur");
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find(".error").exists()).toBeFalsy();
    });
  });
});
