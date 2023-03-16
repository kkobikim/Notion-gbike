import React, { useState } from 'react';
import axios from 'axios';

const TranslateButton = () => {
  const [translatedText, setTranslatedText] = useState(null);
  const [translating, setTranslating] = useState(false);

  const extractText = () => {
    const articleSection = document.getElementById('notion-article');
    const textBlocks = Array.from(articleSection.querySelectorAll('.notion-text'));
    return textBlocks.map(block => block.textContent).join(' ');
  };

  const handleTranslate = async () => {
    if (translating) return;

    setTranslating(true);
    const text = extractText();

    try {
      const response = await axios.post('/api/translate', { text });
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
            ChatGPT로 AI 번역중입니다...
          </>
        ) : translatedText ? (
          '번역완료'
        ) : (
          '번역하기'
        )}
      </button> <span class="bg-yellow-100 text-yellow-800 text-xs font-medium ml-2 mb-2 px-2 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">베타</span>
      {translatedText && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">번역된 내용:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </>
  );
};

export default TranslateButton;
