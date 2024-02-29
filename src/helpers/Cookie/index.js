import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 365,
    path: "/",
  });
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 365,
  });
};
