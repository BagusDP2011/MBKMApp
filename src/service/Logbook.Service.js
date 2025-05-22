import config from "../config";
import { decodeToken } from "./Auth.Service";

export const getLogbookBySubmissionID = async (submissionId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(`${config.baseURL}/logbook/${submissionId}`, {
      headers: subHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLogbookMentorship = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(`${config.baseURL}/logbook-mentorship`, {
      headers: subHeaders,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitLogbook = async (logbook) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    fetch(`${config.baseURL}/logbook`, {
      method: "POST",
      headers: subHeaders,
      body: JSON.stringify(logbook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    throw error;
  }
};

export const getKuisioner = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${config.baseURL}/kuisioner-get`, {
      method: "POST", // change to POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }), // send both values
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
