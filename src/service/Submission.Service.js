import config from "../config";

export const getSubmission = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `${config.baseURL}/pending-submission`,
      { headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `${config.baseURL}/submission-status`,
      { headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const approveSubmission = async (submissionId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `http://localhost:3001/api/submission/approve/${submissionId}`,
      { method:"POST",headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const rejectSubmission = async (submissionId, note) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const body = {
      note: note
    }
    const response = await fetch(
      `http://localhost:3001/api/submission/reject/${submissionId}`,
      { method:"POST",
        headers: subHeaders,
        body: JSON.stringify(body), }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubmissionByID = async (submissionId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `http://localhost:3001/api/submission/${submissionId}`,
      { headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteSubmission = async (submissionId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `http://localhost:3001/api/submission/${submissionId}`,
      { method:"DELETE",headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const submit = async (submission) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    fetch(`${config.baseURL}/submission`, {
      method: "POST",
      headers: subHeaders,
      body: JSON.stringify(submission),
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

export const reAssign = async (submission) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    fetch(`${config.baseURL}/submission/re-assign`, {
      method: "PUT",
      headers: subHeaders,
      body: JSON.stringify(submission),
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
