export const getColumn = async (type, accessId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/column/${type}/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (accessId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/menu/${accessId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
