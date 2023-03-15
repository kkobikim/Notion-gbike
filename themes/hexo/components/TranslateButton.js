import React, { useState } from 'react';

const TranslateButton = ({ content }) => {
  const [translatedContent, setTranslatedContent] = useState(content);

  const getBrowserLanguage = () => {
    return navigator.language || navigator.userLanguage;
  };

  const translateContent = async () => {
    const browserLanguage = getBrowserLanguage();
    const response = await fetch('https://openapi.naver.com/v1/papago/n2mt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': 'WQdE4NOH_Gt6GpbfLQ9E',
        'X-Naver-Client-Secret': 'f6grx1UfPg',
      },
      body: `source=ko&target=${browserLanguage.slice(0, 2)}&text=${encodeURIComponent(content)}`,
    });

    if (response.ok) {
      const data = await response.json();
      setTranslatedContent(data.message.result.translatedText);
    }
  };

  return (
    <div className="notion-text">
      {translatedContent}
      <button onClick={translateContent}>번역하기</button>
    </div>
  );
};

export default TranslateButton;
