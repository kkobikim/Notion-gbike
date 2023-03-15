import axios from 'axios';
import qs from 'querystring';

export default async function handler(req, res) {
  const { source, target, text } = req.body;

  const params = qs.stringify({
    source,
    target,
    text,
  });

  const config = {
    baseURL: 'https://openapi.naver.com/v1/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': 'WQdE4NOH_Gt6GpbfLQ9E',
      'X-Naver-Client-Secret': 'f6grx1UfPg',
    },
  };

  try {
    const response = await axios.post('papago/n2mt', params, config);
    res.status(200).json(response.data.message.result);
  } catch (error) {
    res.status(500).json({ error: 'Error while translating text' });
  }
}
