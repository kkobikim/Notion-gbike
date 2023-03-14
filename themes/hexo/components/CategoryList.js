import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

const CategoryList = ({ currentCategory }) => {
    const router = useRouter();
    const selected0 = router.pathname !== '/category/[category]'
    const selected = currentCategory
    return (
        <ul
            className="flex py-4 md:pl-5 pb-12 space-x-3 overflow-x-scroll hidden-scrollbar">
            <li
                className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                 ${selected0
                    ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300  dark:text-gr' +
                            'ay-600'}`}>
                <a href="../">전체</a>
            </li>
             <li
                className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                ${selected === '새소식'
                    ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-600'
                }`}>
                <a href="/category/%EC%83%88%EC%86%8C%EC%8B%9D">새소식</a>
            </li>

            <li
                className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                ${selected === '인사이드'
                    ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300 dark:text-gra' +
                            'y-600'}`}>
                <a href="/category/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C">인사이드</a>
            </li>
            <li
                className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                ${selected === '보도자료'
                    ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300 dark:text-gra' +
                            'y-600'}`}>
                <a href="/category/%EB%B3%B4%EB%8F%84%EC%9E%90%EB%A3%8C">보도자료</a>
            </li>
            <li
                className={`cursor-pointer duration-200 mr-1 my-1 px-1 py-1 font-medium text-2xl md:text-3xl whitespace-nowrap
                ${selected === '테크'
                    ? 'text-gray-700 dark:md:hover:text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 md:hover:text-gray-700 dark:md:hover:text-gray-300 dark:text-gra' +
                            'y-600'}`}>
                <a href="/category/%ED%85%8C%ED%81%AC">테크</a>
            </li>
        </ul>
    );
}

export default CategoryList;
