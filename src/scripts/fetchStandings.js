export default async function fetchStandings() {
  try {
    const response = await fetch("/api/standings");
    if (!response.ok) {
      throw new Error(`Standings request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
