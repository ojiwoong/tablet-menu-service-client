import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

import axios from 'axios'
import MenuList from './MenuList'
import { useNavigate } from 'react-router-dom'

const Menus = () => {
  const navigate = useNavigate()

  const [menuData, setMenuData] = useState([])

  useEffect(() => {
    // JWT 토큰값이 없을경우 로그인 페이지로 이동
    if (
      localStorage.getItem('accessToken') === '' ||
      localStorage.getItem('accessToken') === null
    ) {
      navigate('/')
      return
    }

    // 메뉴 조회
    const getMenu = async () => {
      const url = `${process.env.REACT_APP_MENU_API_URL}/menus`

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
        'accessToken',
      )}`

      try {
        const response = await axios.get(url)

        const { data } = response

        setMenuData(data)
      } catch (error) {
        alert('메뉴 조회 에러')
        console.log(error.response)
      }
    }
    getMenu()
  }, [])

  return (
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      {menuData && menuData.map((menu, idx) => <MenuList menu={menu} key={idx} />)}
    </CRow>
  )
}

export default Menus
