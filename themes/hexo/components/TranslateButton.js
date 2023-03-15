import React, { useState } from 'react';
import axios from 'axios';
import qs from 'querystring';

const Papago = {
  config: {
    NAVER_CLIENT_ID: 'WQdE4NOH_Gt6GpbfLQ9E',
    NAVER_CLIENT_SECRET: 'f6grx1UfPg',
  },

  async lookup(term, targetLanguage) {
    const url = 'papago/n2mt';

    const params = qs.stringify({
      source: 'ko',
      target: targetLanguage,
      text: term,
    });

    const config = {
      baseURL: 'https://openapi.naver.com/v1/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': this.config.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': this.config.NAVER_CLIENT_SECRET,
      },
    };

    const response = await axios.post(url, params, config);

    return response.data.message.result.translatedText;
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
