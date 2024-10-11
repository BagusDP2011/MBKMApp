export const login = async (data) => {
  try {
    const submitHeaders = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch("https://9jxf315d-3001.asse.devtunnels.ms/api/login", {
      method: "POST",
      headers: submitHeaders,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const decodeToken = () => {
  var token = localStorage.getItem("token");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export function isTokenExpired() {
  var token = localStorage.getItem("token");
  const arrayToken = token.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
}
