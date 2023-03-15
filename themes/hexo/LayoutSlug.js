import {useRef} from 'react'
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

const translate = async (text, sourceLang, targetLang) => {
    const res = await fetch(`https://openapi.naver.com/v1/papago/n2mt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': 'WQdE4NOH_Gt6GpbfLQ9E',
            'X-Naver-Client-Secret': 'f6grx1UfPg'
        },
        body: `source=${sourceLang}&target=${targetLang}&text=${text}`
    });
    const data = await res.json();
    return data
        ?.message
            ?.result
                ?.translatedText;
};

export const LayoutSlug = props => {
    const {post, recommendPosts, lock, validPassword, showArticleInfo} = props
    const drawerRight = useRef(null)

    if (!post) {
        return <LayoutBase
            headerSlot={<HeaderArticle {
                ...props
            } />}
            {...props}
            showCategory={false}
            showTag={false}></LayoutBase>
    }

    const targetRef = isBrowser()
        ? document.getElementById('container')
        : null

    const floatSlot = <> {
        post
            ?.toc
                ?.length > 1 && <div className="block lg:hidden">
                        <TocDrawerButton
                            onClick={() => {
                                drawerRight
                                    ?
                                            .current
                                            ?
                                            .handleSwitchVisible()
                            }}/>
                    </div>
    } < JumpToCommentButton /> </>
    const [translatedText, setTranslatedText] = useState('');

    const translateText = async (text) => {
        const translated = await translate(text, 'ko', 'en'); // 기본 언어는 한글, 브라우저 기기 언어로 번역하는 경우 영어로 설정
        setTranslatedText(translated);
    }
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
                    !lock && <div
                            id="container"
                            className="overflow-x-auto max-w-screen-md flex-grow mx-auto md:w-full md:px-5 ">

                            <article
                                itemScope="itemScope"
                                itemType="https://schema.org/Movie"
                                className="subpixel-antialiased">
                                {/* Notion文章主体 */}
                                <section
                                    id='notion-article'
                                    className='px-5 justify-center mx-auto max-w-2xl lg:max-w-full pb-10'>
                                    {post && <NotionPage post={post}/>}
                                       {/* 번역하기 버튼 */}
                                <button
                                    onClick={() => translateText(post)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    번역하기
                                </button>
                                 {/* 번역된 텍스트 */}
                            {
                                translatedText && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold mb-4">번역된 텍스트:</h3>
                                        <p>{translatedText}</p>
                                    </div>
                                )
                            }
                                </section>
                            

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
                                    showArticleInfo && <> < RecommendPosts currentPost = {
                                        post
                                    }
                                    recommendPosts = {
                                        recommendPosts
                                    } /> <ArticleAdjacent {...props}/>
                                    </>
                                }
                            </article>

                      

                        </div>
                }
            </div>

            <div className='block lg:hidden'>
                <TocDrawer post={post} cRef={drawerRight} targetRef={targetRef}/>
            </div>

        </LayoutBase>
    )
}
