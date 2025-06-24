import config from "../config";
import { getToken, decodeToken } from "./Auth.Service";

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

export const getUserByTarget = async (submissionId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `${config.baseURL}/submission/${submissionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Unauthorized or submission not found");

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Gagal mengambil user dari submissionId", error);
    throw error;
  }
};

export const getUserByUserID = async (UserID) => {
  try {
    const userData = decodeToken();
    let UserID = userData.id;
    const response = await fetch(`${config.baseURL}/user/id/${UserID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createHasilLaporan = async (data) => {
  console.log(data);
  const payload = {
    ...data,
  };
  const token = localStorage.getItem("token");

  const response = await fetch(`${config.baseURL}/hasil-nilai-add/${data.StudentID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log(response);
  if (!response.ok) {
    throw new Error("Gagal menambahkan hasil nilai laporan");
  }

  const result = await response.json();
  return result;
};

export const getRowHasil = async (StudentID) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${config.baseURL}/hasil-nilai-get/${StudentID}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mencari hasil nilai");
  }

  const result = await response.json();
  return result;
};

export const deleteHasilLaporan = async (HasilID) => {
  const userData = decodeToken();
  // let UserID = userData.id;
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${config.baseURL}/hasil-nilai-delete/${HasilID}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Gagal menghapus hasil nilai");
  }

  const result = await response.json();
  return result;
};
