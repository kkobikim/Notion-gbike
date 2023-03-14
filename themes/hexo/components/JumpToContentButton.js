import { useGlobal } from '@/lib/global'
import React from 'react'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToContentButton = ({ showPercent = true, percent }) => {
  const { locale } = useGlobal()
  return (<div className='space-x-1 items-center justify-center transform duration-200 w-7 h-auto pb-1 text-center cursor-pointer' onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })} >
        <div title='포스트 보기' ><i class="fas fa-chevron-circle-down shadow-2xl text-white opacity-40 text-3xl"></i></div>
        {showPercent && (<div className='text-xs hidden lg:block'>{percent}</div>)}
    </div>)
}

export default JumpToContentButton
