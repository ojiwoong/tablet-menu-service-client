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
import { useNavigate } from 'react-router-dom'

const CartList = (props) => {
  const { cart, idx, setCartData } = props

  useEffect(() => {}, [])

  // 수량 감소
  const minusQty = () => {
    const carts = JSON.parse(localStorage.getItem('carts'))

    // 수량이 1이거나 1보다 작은경우 해당 메뉴 삭제
    if (cart.count <= 1) {
      carts.splice(idx, 1)
    } else {
      // 기존 메뉴 개수에서 수량 -1
      carts[idx].count -= 1
    }

    refreshCart(carts)
  }

  // 수량 증가
  const plusQty = () => {
    const carts = JSON.parse(localStorage.getItem('carts'))

    // 기존 메뉴 개수에서 수량 +1
    carts[idx].count += 1

    refreshCart(carts)
  }

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // 장바구니 메뉴 삭제
  const deleteCartItem = () => {
    const carts = JSON.parse(localStorage.getItem('carts'))

    carts.splice(idx, 1)

    refreshCart(carts)
  }

  // 장바구니 갱신
  const refreshCart = (carts) => {
    localStorage.removeItem('carts')
    localStorage.setItem('carts', JSON.stringify(carts))

    // 장바구니 데이터 갱신
    setCartData(JSON.parse(localStorage.getItem('carts')))
  }

  return (
    <CTableBody>
      <CTableRow>
        <CTableDataCell scope="row">{cart.name}</CTableDataCell>
        <CTableDataCell scope="row">
          <CButton color="dark" shape="rounded-pill" onClick={minusQty}>
            -
          </CButton>
        </CTableDataCell>
        <CTableDataCell>{cart.count}</CTableDataCell>
        <CTableDataCell scope="row">
          <CButton color="dark" shape="rounded-pill" onClick={plusQty}>
            +
          </CButton>
        </CTableDataCell>
        <CTableDataCell scope="row">{priceToString(cart.price)}</CTableDataCell>
        <CTableDataCell scope="row">{priceToString(cart.price * cart.count)}</CTableDataCell>
        <CTableDataCell scope="row">
          <CButton color="dark" shape="rounded-pill" onClick={deleteCartItem}>
            삭제
          </CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  )
}

export default CartList
