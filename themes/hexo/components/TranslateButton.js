import { useEffect, useState } from 'react';

const TranslateButton = ({ notionText }) => {
  const [browserLanguage, setBrowserLanguage] = useState(null);
  const client_id = 'WQdE4NOH_Gt6GpbfLQ9E';
  const client_secret = 'f6grx1UfPg';
  const supportedLanguages = ['en', 'zh-CN', 'zh-TW', 'es', 'fr', 'vi', 'th', 'id'];

  useEffect(() => {
    if (window && window.navigator) {
      let lang = window.navigator.language.slice(0, 2);
      if (lang === 'ko' || !supportedLanguages.includes(lang)) {
        lang = 'en';
      }
      setBrowserLanguage(lang);
    }
  }, []);

  const handleTranslate = async () => {
    const api_url = './api/translate';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'source': 'ko',
        'target': browserLanguage,
        'text': notionText,
      }),
    };
  
    try {
      const response = await fetch(api_url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        const translatedText = data.message.result.translatedText;
        // notion-text 클래스를 가진 모든 요소에 번역된 텍스트 적용
        document.querySelectorAll('.notion-text').forEach((element, index) => {
          element.innerText = translatedText[index];
        });
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <button onClick={handleTranslate}>
      {browserLanguage ? `번역 (${browserLanguage})` : '번역'}
    </button>
  );
};

export default TranslateButton;
