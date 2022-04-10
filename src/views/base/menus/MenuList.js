import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

const MenuList = (props) => {
  const { menu } = props

  // 메뉴 장바구니 담기
  function PutMenu(menu) {
    const carts = JSON.parse(localStorage.getItem('carts')) || []
    let isExits = false

    let count = 1

    carts.forEach((cart, idx) => {
      // 같은 메뉴 아이디인 경우
      if (menu.id === cart.id) {
        isExits = true
        carts[idx].count = cart.count + 1
        count = carts[idx].count
      }
    })

    if (isExits) {
      // 장바구니에 이미 있는 메뉴일 경우 장바구니 삭제 후 다시 생성
      if (
        window.confirm(
          `${
            menu.name
          }은 이미 장바구니에 담긴 상품입니다. \r\n메뉴 개수를 추가할까요 ? (현재 개수 ${
            count - 1
          })`,
        )
      ) {
        localStorage.removeItem('carts')
      } else {
        return
      }
    } else {
      // 장바구니에 없는 메뉴일 경우
      menu.count = count
      carts.push(menu)
      alert(`${menu.name} 메뉴를 장바구니에 담았습니다.`)
    }

    localStorage.setItem('carts', JSON.stringify(carts))
  }

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <CCol xs>
      <CCard className="h-100" onClick={() => PutMenu(menu)} style={{ cursor: 'pointer' }}>
        <CCardImage orientation="top" src={menu.imageUrl} />
        <CCardBody>
          <CCardTitle>{menu.name}</CCardTitle>
          <CCardText>{`${priceToString(menu.price)} 원`}</CCardText>
          <CCardText>{menu.description}</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default MenuList
