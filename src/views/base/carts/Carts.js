import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import axios from 'axios'

const Carts = () => {
  const [menuData, setMenuData] = useState([])

  useEffect(() => {
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

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4" style={{ margin: '30px 0px' }}>
            <h1>장바구니</h1>
          </div>
          <div className="col-4" style={{ textAlign: 'right', margin: '30px' }}>
            <CButton color="primary" shape="rounded-0">
              주문하기
            </CButton>
          </div>
        </div>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">메뉴명</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">수량</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">금액</CTableHeaderCell>
              <CTableHeaderCell scope="col">총 금액</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell scope="row">소고기타타기</CTableDataCell>
              <CTableDataCell scope="row">
                <CButton color="dark" shape="rounded-pill">
                  -
                </CButton>
              </CTableDataCell>
              <CTableDataCell>3</CTableDataCell>
              <CTableDataCell scope="row">
                <CButton color="dark" shape="rounded-pill">
                  +
                </CButton>
              </CTableDataCell>
              <CTableDataCell scope="row">3,000</CTableDataCell>
              <CTableDataCell scope="row">9,000</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <div className="row">
          <div className="col-sm">
            <h2>합계 금액 : 23,000</h2>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </>
  )
}

export default Carts
