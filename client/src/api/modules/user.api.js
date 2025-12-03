import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password"
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      console.log("Sending signin request");
      const response = await publicClient.post(
        userEndpoints.signin,
        { username, password }
      );
      if (response && response.token) {
        localStorage.setItem("actkn", response.token);
        console.log("Token stored successfully");
      }
      console.log("Signin response:", response);
      return { response };
    } catch (err) {
      console.log("Signin error:", err);
      return { err };
    }
  },

  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      console.log("Sending signup request");
      const response = await publicClient.post(
        userEndpoints.signup,
        { username, password, confirmPassword, displayName }
      );

      console.log("Signup response:", response);
      return { response };
    } catch (err) {
      console.log("Signup error:", err);
      return { err };
    }
  },

  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (err) {
      console.log("Get info error:", err);
      return { err };
    }
  },

  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.passwordUpdate,
        { password, newPassword, confirmNewPassword }
      );
      return { response };
    } catch (err) {
      console.log("Password update error:", err);
      return { err };
    }
  }
};

export default userApi;