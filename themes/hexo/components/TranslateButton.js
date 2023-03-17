import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TranslateButton = () => {
  const [translatedText, setTranslatedText] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [buttonText, setButtonText] = useState('AI번역하기');

  const getBrowserLanguage = () => {
    return navigator.language.split('-')[0];
  };

  const getLanguageCodeAndTranslation = (language) => {
    const supportedLanguages = {
      en: { name: 'English', translation: 'Translate to English' },
      ja: { name: 'Japanese', translation: '日本語に翻訳' },
      zh: { name: 'Chinese', translation: '翻译成中文' },
      th: { name: 'Thai', translation: 'แปลเป็นไทย' },
      de: { name: 'German', translation: 'Ins Deutsche übersetzen' },
      es: { name: 'Spanish', translation: 'Traducir al español' },
      vi: { name: 'Vietnamese', translation: 'Dịch sang tiếng Việt' },
      id: { name: 'Indonesian', translation: 'Terjemahkan ke bahasa Indonesia' },
      ru: { name: 'Russian', translation: 'Перевести на русский' },
      fr: { name: 'French', translation: 'Traduire en français' },
      pt: { name: 'Portuguese', translation: 'Traduzir para português' },
    };

    return supportedLanguages[language] || { name: 'English', translation: 'Translate to English' };
  };

  useEffect(() => {
    const browserLanguage = getBrowserLanguage();
    const languageInfo = getLanguageCodeAndTranslation(browserLanguage);
    setButtonText(languageInfo.translation);
  }, []);

  const extractText = () => {
    const articleSection = document.getElementById('notion-article');
    const textBlocks = Array.from(articleSection.querySelectorAll('.notion-text'));
    return textBlocks.map(block => block.textContent).join(' ');
  };

  const handleTranslate = async () => {
    if (translating) return;

    setTranslating(true);
    const text = extractText();
    const targetLanguage = getLanguageCodeAndTranslation(getBrowserLanguage()).name;

    try {
      const response = await axios.post('/api/translate', { text, targetLanguage });
      setTranslatedText(response.data.translatedText);
      setTranslating(false);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleTranslate}
        disabled={translating || translatedText !== null}
      >
        {translating ? (
          <>
            <span className="animate-spin text-blue-500 material-icons">sync</span>
            {' '}
            {buttonText}...
          </>
        ) : translatedText ? (
          `${getLanguageCodeAndTranslation(getBrowserLanguage()).translation}`
        ) : (
          buttonText
        )}
      </button> <span class="bg-yellow-100 text-yellow-800 text-xs font-medium ml-2 mb-2 px-2 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">AI Beta</span>
      {translatedText && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>{translatedText}</p>
        </div>
      )}
    </>
  );
};

export default TranslateButton;
