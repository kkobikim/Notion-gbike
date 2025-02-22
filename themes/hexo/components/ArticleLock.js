import { useGlobal } from '/lib/global'

/**
 * 加密文章校验组件
 * @param {password, validPassword} props
 * @param password 正确的密码
 * @param validPassword(bool) 回调函数，校验正确回调入参为true
 * @returns
 */
export const ArticleLock = props => {
  const { password, validPassword } = props
  const { locale } = useGlobal()
  const submitPassword = () => {
    const p = document.getElementById('password')
    if (p && p.value && p.value === password) {
      validPassword(true)
    } else {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }

  return <div id='container' className='w-full flex justify-center items-center h-96 font-sans'>
    <div className='text-center space-y-3'>
      <div className='font-bold'>{locale.COMMON.ARTICLE_LOCK_TIPS}</div>
      <div className='flex'>
        <input id="password" type='password' className='w-full text-sm pl-5 rounded-l transition focus:shadow-lg dark:text-gray-300 font-light leading-10 text-black bg-gray-100 dark:bg-gray-500'></input>
        <div onClick={submitPassword} className="px-3 whitespace-nowrap cursor-pointer items-center justify-center py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-r duration-300" >
          <i className={'duration-200 cursor-pointer fas fa-key'} >&nbsp;{locale.COMMON.SUBMIT}</i>
        </div>
      </div>
      <div id='tips'>
      </div>
    </div>
  </div>
}
