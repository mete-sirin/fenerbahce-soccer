export default async function fetchMatches() {
  try {
    const response = await fetch("/api/matches");
    if (!response.ok) {
      throw new Error(`Matches request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return { data: {}, errors: { network: String(error.message ?? error) } };
  }
}
