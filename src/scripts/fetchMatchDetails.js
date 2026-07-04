export default async function fetchMatchDetails(id) {
  try {
    const response = await fetch(`/api/match/${id}`);
    if (!response.ok) {
      throw new Error(`Match details request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
