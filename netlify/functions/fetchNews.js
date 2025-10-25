const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const { page = 1, pageSize = 8, category = "general" } =
    event.queryStringParameters || {};

  console.log("🔍 Function called with:", { page, pageSize, category });
  console.log("🔑 NEWS_API_KEY exists:", !!NEWS_API_KEY);

  if (!NEWS_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing NEWS_API_KEY env variable" }),
    };
  }

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
  console.log("🌍 Fetching URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("✅ Fetched successfully:", data.status);
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
