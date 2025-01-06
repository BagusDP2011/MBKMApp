import config from "../config";

export const getColumn = async (type) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(`${config.baseURL}/column/${type}`, {
      method: "GET",
      headers: subHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async () => {
  const token = localStorage.getItem("token");
  const subHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  const response = await fetch(`${config.baseURL}/menu`, {
    method: "GET",
    headers: subHeaders,
  });
  const data = await response.json();
  return data;
};

export const getMenuAccessDetail = async (accessId) => {
  try {
    const response = await fetch(
      `${config.baseURL}/menu/menu-access-detail/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRedirectMenu = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  
    const response = await fetch(`${config.baseURL}/redirect-menu`, {
      method: "GET",
      headers: subHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getListRoleDetail = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/role-detail`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserByAccessID = async (accessId) => {
  try {
    const response = await fetch(`${config.baseURL}/user/${accessId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
