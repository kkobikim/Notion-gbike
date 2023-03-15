import {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import {ArticleLock} from './components/ArticleLock'
import HeaderArticle from './components/HeaderArticle'
import JumpToCommentButton from './components/JumpToCommentButton'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import LayoutBase from './LayoutBase'
import ShareBar from './components/ShareBar'
import NotionPage from '@/components/NotionPage'
import TagItemMini from './components/TagItemMini'
import RecommendPosts from './components/RecommendPosts'
import ArticleAdjacent from './components/ArticleAdjacent'
import {isBrowser} from '@/lib/utils'

export const LayoutSlug = props => {
    const {post, recommendPosts, lock, validPassword, showArticleInfo} = props
    const drawerRight = useRef(null)

    const [translatedContent, setTranslatedContent] = useState('')
    const [browserLanguage, setBrowserLanguage] = useState('ko')

    useEffect(() => {
        setBrowserLanguage(getBrowserLanguage())
    }, [])

    const translateContent = async (content, targetLang) => {
        const url = 'https://openapi.naver.com/v1/papago/n2mt'
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': WQdE4NOH_Gt6GpbfLQ9E,
            'X-Naver-Client-Secret': f6grx1UfPg,
        }
        const data = `source=ko&target=${targetLang}&text=${encodeURIComponent(content)}`

        try {
            const response = await axios.post(url, data, {headers})
            return response.data.message.result.translatedText
        } catch (error) {
            console.error('Translation Error:', error)
            return content
        }
    }

    const getBrowserLanguage = () => {
        const language = navigator.language || navigator.userLanguage
        return language.substr(0, 2)
    }

    const handleTranslateButtonClick = async () => {
        const translatedText = await translateContent(post.content, browserLanguage)
        setTranslatedContent(translatedText)
    }

    if (!post) {
        return (
            <LayoutBase
                headerSlot={<HeaderArticle {
                    ...props
                } />}
                {...props}
                showCategory={false}
                showTag={false}></LayoutBase>
        )
    }

    const targetRef = isBrowser()
        ? document.getElementById('container')
        : null

    const floatSlot = (<> {
        post
            ?.toc
                ?.length > 1 && (
                    <div className="block lg:hidden">
                        <TocDrawerButton
                            onClick={() => {
                                drawerRight
                                    ?
                                            .current
                                            ?
                                            .handleSwitchVisible()
                            }}/>
                    </div>
                )
    } < JumpToCommentButton /> </>)

    return (
        <LayoutBase
            headerSlot={<HeaderArticle {
                ...props
            } />}
            {...props}
            showCategory={false}
            showTag={false}
            floatSlot={floatSlot}>
            <div className="w-full lg:px-2 lg:py-4">
                {lock && <ArticleLock password={post.password} validPassword={validPassword}/>}

                {
                    !lock && (
                        <div
                            id="container"
                            className="overflow-x-auto max-w-screen-md flex-grow mx-auto md:w-full md:px-5 ">
                            <article
                                itemScope="itemScope"
                                itemType="https://schema.org/Movie"
                                className="subpixel-antialiased">
                                {/* Notion 글 본문 */}
                                <section
                                    id="notion-article"
                                    className="px-5 justify-center mx-auto max-w-2xl lg:max-w-full pb-10">
                                    {post && <NotionPage post={post}/>}
                                </section>
                                <button onClick={handleTranslateButtonClick}>번역하기</button>
                                {translatedContent && <div>{translatedContent}</div>}
                                <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
                                    <div>
                                        {' '}
                                        {
                                            post
                                                .tagItems
                                                .map(tag => (<TagItemMini key={tag.name} tag={tag}/>))
                                        }
                                    </div>
                                </div>
                                <ShareBar {...props}/> {
                                    showArticleInfo && (<> < RecommendPosts currentPost = {
                                        post
                                    }
                                    recommendPosts = {
                                        recommendPosts
                                    } /> <ArticleAdjacent {...props}/> < />
)}
                            </article>
                        </div>
                    )
                }
            </div>
            <div className="block lg:hidden">
                <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef}/>
            </div>
        </LayoutBase>
    )
}