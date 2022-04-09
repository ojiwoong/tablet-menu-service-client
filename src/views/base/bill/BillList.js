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

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const BillList = (props) => {
  const { order, orderMenu } = props
  return (
    <>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">{order.id}</CTableHeaderCell>
          <CTableDataCell>{orderMenu.menuEntity.name}</CTableDataCell>
          <CTableDataCell>{orderMenu.quantity}</CTableDataCell>
          <CTableDataCell>{priceToString(orderMenu.menuEntity.price)}</CTableDataCell>
          <CTableDataCell>
            {priceToString(orderMenu.quantity * orderMenu.menuEntity.price)}
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </>
  )
}

export default BillList
