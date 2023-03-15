import { useEffect, useState } from 'react';
import axios from 'axios';

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
    // 파파고 API 호출 및 번역 처리 코드 작성
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const data = new FormData();
    data.append('source', 'ko');
    data.append('target', browserLanguage);
    data.append('text', notionText);

    try {
      const response = await axios.post(api_url, data, {
        headers: {
          'X-Naver-Client-Id': client_id,
          'X-Naver-Client-Secret': client_secret,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const translatedText = response.data.message.result.translatedText;
        // notion-text 클래스를 가진 모든 요소에 번역된 텍스트 적용
        document.querySelectorAll('.notion-text').forEach((element, index) => {
          element.innerText = translatedText[index];
        });
      } else {
        console.error('error = ' + response.status);
      }
    } catch (error) {
      console.error('error = ' + error);
    }
  };

  return (
    <button onClick={handleTranslate}>
      {browserLanguage ? `번역 (${browserLanguage})` : '번역'}
    </button>
  );
};

export default TranslateButton;
