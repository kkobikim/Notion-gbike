import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'Text not provided' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that translates Korean to English.' },
        { role: 'user', content: text },
      ],
    });

    const translatedText = completion.data.choices[0]?.message?.content?.trim();
    if (translatedText) {
      res.status(200).json({ translatedText });
    } else {
      res.status(500).json({ message: 'Translation failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
