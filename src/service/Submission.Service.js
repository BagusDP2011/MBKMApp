export const getSubmission = async (accessId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `http://localhost:3001/api/pending-submission/${accessId}`,
      { headers: subHeaders }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const approveSubmission = async (submissionId, accessId) => {
  try {
    const token = localStorage.getItem("token");
    const subHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `http://localhost:3001/api/submission/approve/${submissionId}/${accessId}`,
      { method:"POST",headers: subHeaders }
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

    fetch("http://localhost:3001/api/submission", {
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
