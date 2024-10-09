export const login = async () => {
  try {
    const submitHeaders = new Headers({
      "Content-Type": "application/json",
    });

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: submitHeaders,
      body: JSON.stringify({
        email: "m.fahrizalipradana@gmail.com",
        password: "292021173",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
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
