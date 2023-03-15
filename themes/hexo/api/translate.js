import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { source, target, text } = req.body;
  const client_id = 'WQdE4NOH_Gt6GpbfLQ9E';
  const client_secret = 'f6grx1UfPg';
  const api_url = 'https://openapi.naver.com/v1/papago/n2mt';

  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret,
      },
      body: new URLSearchParams({
        source,
        target,
        text,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
