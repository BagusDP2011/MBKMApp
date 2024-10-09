import config from "../config";

export const getSubmission = async (accessId) => {
  try {
    const response = await fetch(
      `${config.baseURL}/pending-submission/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
