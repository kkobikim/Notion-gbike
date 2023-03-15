import { useState } from 'react';

function TranslateButton({ content }) {
  const [translatedContent, setTranslatedContent] = useState('');

  const translateContent = async () => {
    const API_KEY = 'YOUR_PAPAGO_API_KEY';
    const API_URL = 'https://openapi.naver.com/v1/papago/n2mt';
    const LANG = 'en';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': 'YOUR_CLIENT_ID',
        'X-Naver-Client-Secret': 'YOUR_CLIENT_SECRET',
      },
      body: `source=ko&target=${LANG}&text=${content}`,
    });

    const data = await response.json();
    setTranslatedContent(data.message.result.translatedText);
  };

  return (
    <button onClick={translateContent}>번역하기</button>
    {translatedContent && (
      <p>번역 결과: {translatedContent}</p>
    )}
  );
}

export default TranslateButton;
