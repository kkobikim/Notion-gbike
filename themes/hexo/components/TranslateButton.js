import React, { useState } from 'react';
import axios from 'axios';
import qs from 'querystring';

const Papago = {
    async lookup(term, targetLanguage) {
      const response = await axios.post('./api/translate', {
        source: 'ko',
        target: targetLanguage,
        text: term,
      });
  
      return response.data.translatedText;
    },
  };

const TranslateButton = ({ content, setContent }) => {
  const [loading, setLoading] = useState(false);

  const translateContent = async () => {
    setLoading(true);
    const browserLanguage = navigator.language || navigator.userLanguage;
    const languageCode = browserLanguage.substr(0, 2);

    const supportedLanguages = {
      en: 'en',
      zh: 'zh-CN',
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      es: 'es',
      fr: 'fr',
      vi: 'vi',
      th: 'th',
      id: 'id',
    };

    const targetLanguage =
      languageCode === 'ko' || !supportedLanguages[languageCode]
        ? 'en'
        : supportedLanguages[languageCode];

    try {
      const translatedText = await Papago.lookup(content, targetLanguage);
      setContent(translatedText);
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
