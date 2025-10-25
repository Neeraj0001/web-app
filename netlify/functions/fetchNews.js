export async function handler(event) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NEWS_API_KEY env variable" }),
    };
  }

  const { page = 1, pageSize = 8, category = "general" } = event.queryStringParameters;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

  try {
    // ✅ Native fetch (no need for node-fetch)
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
