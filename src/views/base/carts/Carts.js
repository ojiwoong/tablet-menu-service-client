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
import { getAllByPlaceholderText } from '@testing-library/react'

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

  // 주문하기
  const order = async () => {
    const carts = JSON.parse(localStorage.getItem('carts'))

    if (carts === null || carts.length === 0) {
      alert('장바구니에 메뉴가 없습니다.')
      return
    }

    if (!window.confirm('해당 메뉴들을 주문하시겠습니까?')) {
      return
    }

    carts.totalAmount = totalAmount

    // 서버에 보낼 데이터 생성
    const orderMenuListJsonAry = new Array()

    carts.forEach((cart) => {
      const orderMenuJson = new Object()
      orderMenuJson.menuId = cart.id
      orderMenuJson.quantity = cart.count
      orderMenuJson.amount = cart.price

      orderMenuListJsonAry.push(orderMenuJson)
    })

    const orderJson = new Object()
    orderJson.orderMenuList = orderMenuListJsonAry
    orderJson.totalAmount = totalAmount

    const url = `${process.env.REACT_APP_ORDER_API_URL}/orders/${localStorage.getItem('userId')}`

    try {
      const response = await axios.post(url, orderJson)
      const { data, status } = response

      if (status === 201) {
        alert('주문 완료되었습니다.')
        localStorage.removeItem('carts')
        setCartData([])
        console.log(data)
      } else {
        alert('잘못된 응답코드 입니다.')
        console.log(response)
      }
    } catch (error) {
      alert('주문 에러')
      console.log(error.response)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4" style={{ margin: '30px 0px' }}>
            <h1>장바구니</h1>
          </div>
          <div className="col-4" style={{ textAlign: 'right', margin: '30px' }}>
            <CButton color="primary" shape="rounded-0" onClick={order}>
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
