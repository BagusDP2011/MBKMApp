import config from "../config";

export const getColumn = async (type, accessId) => {
  try {
    const response = await fetch(
      `${config.baseURL}/column/${type}/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (accessId) => {
  try {
    const response = await fetch(`${config.baseURL}/menu/${accessId}`);
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