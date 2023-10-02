export async function callGpt(input) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const messages = input.map((message) => ({
    role: message.sender.toLowerCase(),
    content: message.text,
  }));
  console.log(messages);
  const reqBody = {
    messages,
    model: "gpt-3.5-turbo",
    max_tokens: 3000,
    temperature: 1,
    top_p: 1,
    stream: false,
  };

  const apiResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(reqBody),
    }
  );

  if (!apiResponse.ok) {
    throw new Error(`HTTP error! status: ${apiResponse.status}`);
  }

  const data = await apiResponse.json();
  // console.log(data);
  return data.choices[0].message.content;
}
