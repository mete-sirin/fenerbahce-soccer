export default async function fetchNews() {
  try {
    const response = await fetch("/api/news");
    if (!response.ok) {
      throw new Error(`News request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
