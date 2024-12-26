import config from "../config";

export const getSubmissionStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `${config.baseURL}/dashboard/submission-status`,
      {
        headers: subHeaders,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionTotal = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `${config.baseURL}/dashboard/submission-total`,
      {
        headers: subHeaders,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
