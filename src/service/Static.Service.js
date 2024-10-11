export const getColumn = async (type, accessId) => {
  try {
    const response = await fetch(
      `https://9jxf315d-3001.asse.devtunnels.ms/api/column/${type}/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMenu = async (accessId) => {
  try {
    const response = await fetch(`https://9jxf315d-3001.asse.devtunnels.ms/api/menu/${accessId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
