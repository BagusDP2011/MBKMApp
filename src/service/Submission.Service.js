export const getSubmission = async (accessId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/pending-submission/${accessId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
