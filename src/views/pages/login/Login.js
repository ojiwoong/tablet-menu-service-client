import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginClickHandler = async () => {
    // const url = `http://localhost:8000/auth-service/login`
    const url = `${process.env.REACT_APP_AUTH_API_URL}/login`
    const data = {
      loginId: loginId,
      password: password,
    }

    try {
      const response = await axios.post(url, data)

      const { accessToken, userId } = response.data

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('userId', userId)

      navigate('/base/menus')
    } catch (error) {
      alert('로그인 에러')
      console.log(error.response)
    }
  }

  const loginIdChangeHandler = (e) => {
    const { value } = e.target
    setLoginId(value)
  }

  const passwordChangeHandler = (e) => {
    const { value } = e.target
    setPassword(value)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>로그인</h1>
                    <p className="text-medium-emphasis">
                      사용자 계정을 로그인하세요. ( id : guest / pw : guest )
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="아이디"
                        autoComplete="username"
                        value={loginId}
                        onChange={loginIdChangeHandler}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        onChange={passwordChangeHandler}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={loginClickHandler}>
                          로그인
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
