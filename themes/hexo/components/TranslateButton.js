import React, { useState } from 'react';
import axios from 'axios';

const TranslateButton = ({ content, setContent }) => {
  const [loading, setLoading] = useState(false);

  const translateContent = async () => {
    setLoading(true);
    const browserLanguage = navigator.language || navigator.userLanguage;
    const targetLanguage = browserLanguage.substr(0, 2);

    try {
      const response = await axios.post(
        'https://openapi.naver.com/v1/papago/n2mt',
        { source: 'ko', target: targetLanguage, text: content },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': 'WQdE4NOH_Gt6GpbfLQ9E',
            'X-Naver-Client-Secret': 'f6grx1UfPg',
          },
        }
      );

      if (response.data.message.result) {
        setContent(response.data.message.result.translatedText);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={translateContent} disabled={loading}>
      번역
    </button>
  );
};

export default TranslateButton;
