import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { text } = req.body;

  try {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '지쿠 is GCOO 지쿠터, is Gcooter, Please translate it into English.' },
          { role: 'user', content: text },
        ],
      });

    const translatedText = completion.data.choices[0].message.content;

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Error in translating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
