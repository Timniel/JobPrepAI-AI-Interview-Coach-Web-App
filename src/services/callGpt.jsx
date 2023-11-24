import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
export async function callGpt(input) {
  const model = import.meta.env.VITE_MODEL;
  try {
    const response = await axios.post(
      `${serverUrl}/execute-openai`,
      {
        input,
        model,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          Accept: "text/event-stream",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Request failed");
    }

    const data = response.data;
    console.log(data.result[0].message.content);
    return data.result[0].message.content;
  } catch (error) {
    return error;
  }
}
