export default async function fetchSquad() {
  try {
    const response = await fetch("/api/squad");
    if (!response.ok) {
      throw new Error(`Squad request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
