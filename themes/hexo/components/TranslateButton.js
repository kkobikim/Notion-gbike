// components/TranslateButton.js
import React, { useState } from 'react'
import axios from 'axios'

const getBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage
  return language
}

const translateText = async (text, targetLanguage) => {
  const apiUrl = `https://openapi.naver.com/v1/papago/n2mt`
  const sourceLanguage = 'ko'

  const response = await axios.post(apiUrl, `source=${sourceLanguage}&target=${targetLanguage}&text=${encodeURIComponent(text)}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': 'WQdE4NOH_Gt6GpbfLQ9E',
      'X-Naver-Client-Secret': 'f6grx1UfPg',
    }
  })

  const translatedText = response.data.message.result.translatedText
  return translatedText
}

const TranslateButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    const browserLanguage = getBrowserLanguage()
    const targetLanguage = browserLanguage.substring(0, 2)

    const notionTextElements = document.querySelectorAll('.notion-text')

    for (const element of notionTextElements) {
      const translatedText = await translateText(element.innerText, targetLanguage)
      element.innerText = translatedText
    }

    setIsLoading(false)
  }

  return (
    <button className="translate-button" onClick={handleClick} disabled={isLoading}>
      {isLoading ? '번역 중...' : '번역'}
    </button>
  )
}

export default TranslateButton

