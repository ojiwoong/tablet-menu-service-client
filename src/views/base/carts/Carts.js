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
import CartList from './CartList'

const Carts = () => {
  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('carts')))
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const calTotalAmount = () => {
      let total = 0

      cartData &&
        cartData.forEach((cart, idx) => {
          total += cart.count * cart.price
        })

      return total
    }

    setTotalAmount(calTotalAmount())
  }, [cartData])

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
              <CTableHeaderCell scope="col">삭제</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {cartData &&
            cartData.map((cart, idx) => (
              <CartList
                cart={cart}
                idx={idx}
                setCartData={setCartData}
                setTotalAmount={setTotalAmount}
                key={idx}
              />
            ))}
        </CTable>
        <div className="row">
          <div className="col-sm">
            <h2>합계 금액 : {priceToString(totalAmount)} 원</h2>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </>
  )
}

export default Carts
