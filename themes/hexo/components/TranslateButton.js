// components/TranslateButton.js

import { useState } from 'react';
import axios from 'axios';

const TranslateButton = ({ post, onTranslated }) => {
  const [loading, setLoading] = useState(false);

  const translateContent = async () => {
    setLoading(true);
    try {
      // ChatGPT API 호출을 위한 설정값을 추가하세요.
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // 여기에 API 키를 추가하세요.
        },
      };

      // 번역을 원하는 post.content를 보내고 번역된 내용을 받습니다.
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions', // ChatGPT API 엔드포인트
        {
          model: 'text-davinci-002', // 사용할 모델을 설정하세요.
          prompt: `Translate the following Korean text to English: "${post.content}"`,
          max_tokens: 1000, // 번역 결과의 최대 길이 설정
          n: 1, // 생성할 결과 개수
          stop: null,
          temperature: 0.8, // 결과의 다양성 설정
        },
        config
      );

      const translatedText = response.data.choices[0].text;

      // 번역된 결과를 상위 컴포넌트에 전달합니다.
      onTranslated({ ...post, content: translatedText });
    } catch (error) {
      console.error('Error translating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={translateContent}
      disabled={loading}
    >
      {loading ? '번역 중...' : '번역하기'}
    </button>
  );
};

export default TranslateButton;
