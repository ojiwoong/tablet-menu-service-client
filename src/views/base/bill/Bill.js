import React, { useEffect, useState } from 'react'
import {
  CButton,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import axios from 'axios'
import { getAllByPlaceholderText } from '@testing-library/react'
import BillList from './BillList'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'

const Bill = () => {
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const [paymentMethodCode, setPaymentMethodCode] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('현금')

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`

  useEffect(() => {
    // JWT 토큰값이 없을경우 로그인 페이지로 이동
    if (
      localStorage.getItem('accessToken') === '' ||
      localStorage.getItem('accessToken') === null
    ) {
      navigate('/')
      return
    }

    const getOrder = async () => {
      const url = `${process.env.REACT_APP_ORDER_API_URL}/orders?userId=${localStorage.getItem(
        'userId',
      )}`

      try {
        const response = await axios.get(url)
        const { data, status } = response

        if (status === 200) {
          setOrderData(data)
          calTotalAmount(data)
        } else {
          console.log(response)
          alert('잘못된 응답코드입니다.')
        }
      } catch (error) {
        console.log(error.response)
        alert('계산서 조회 에러')
      }
    }
    getOrder()
  }, [])

  const calTotalAmount = (orderData) => {
    let amount = 0
    orderData.forEach((order) => {
      amount += order.totalAmount
    })

    setTotalAmount(amount)
  }

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const [visible, setVisible] = useState(false)

  // 결제수단 변경핸들러
  const paymentMethodChangeHandler = (e) => {
    const { value, id } = e.target
    setPaymentMethodCode(value)
    setPaymentMethod(id)
  }

  // 결제 팝업 오픈
  const openPaymentPopup = () => {
    if (orderData.length === 0) {
      alert('결제할 내역이 없습니다.')
      return
    }

    setVisible(!visible)
  }

  // 결제하기
  const payment = async () => {
    if (
      !window.confirm(
        `${priceToString(totalAmount)}원 ${paymentMethod} 결제수단으로 결제하시겠습니까?`,
      )
    ) {
      return
    }

    const url = `${process.env.REACT_APP_ORDER_API_URL}/payments/${localStorage.getItem('userId')}`

    const data = {
      paymentMethodId: paymentMethodCode,
      totalAmount: totalAmount,
    }

    try {
      const response = await axios.post(url, data)

      const { status } = response
      if (status === 201) {
        alert('정상적으로 결제되었습니다.')
        navigate('/base/menus')
      } else {
        alert('잘못된 응답코드 입니다.')
      }
    } catch (error) {
      console.log(error)
      alert('결제 에러')
    }
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4" style={{ margin: '30px 0px' }}>
            <h1>계산서</h1>
          </div>
          <div className="col-4" style={{ textAlign: 'right', margin: '30px' }}>
            <CButton onClick={openPaymentPopup}>결제하기</CButton>
            <CModal visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>결제 수단을 선택해주세요.</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormCheck
                  type="radio"
                  name="paymentMthod"
                  id="현금"
                  value="1"
                  label="현금 결제"
                  defaultChecked
                  onChange={paymentMethodChangeHandler}
                />
                <CFormCheck
                  type="radio"
                  name="paymentMthod"
                  id="카드"
                  value="2"
                  label="카드 결제"
                  onChange={paymentMethodChangeHandler}
                />
                <CFormCheck
                  type="radio"
                  name="paymentMthod"
                  id="QR"
                  value="3"
                  label="QR 결제"
                  onChange={paymentMethodChangeHandler}
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  취소
                </CButton>
                <CButton color="primary" onClick={payment}>
                  결제하기
                </CButton>
              </CModalFooter>
            </CModal>
          </div>
        </div>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">주문번호</CTableHeaderCell>
              <CTableHeaderCell scope="col">주문시간</CTableHeaderCell>
              <CTableHeaderCell scope="col">메뉴명</CTableHeaderCell>
              <CTableHeaderCell scope="col">수량</CTableHeaderCell>
              <CTableHeaderCell scope="col">금액</CTableHeaderCell>
              <CTableHeaderCell scope="col">총 금액</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          {orderData &&
            orderData.map((order, idx) =>
              order.orderMenuEntity.map((orderMenu, idx) => (
                <BillList key={idx} order={order} orderMenu={orderMenu} />
              )),
            )}
        </CTable>
        <div className="row">
          <div className="col-sm">
            <h2>총 결제금액 : {priceToString(totalAmount)} 원</h2>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    </>
  )
}

export default Bill
