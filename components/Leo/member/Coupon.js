import React from 'react'
import styles from '@/components/Leo/member/Coupon.module.css'
import { useRouter } from 'next/router'

export default function Coupon() {
  const router = useRouter()
  const c = {
    display: 'flex',
    justifyContent: 'space-evenly',
  }
  const d = {
    position: 'relative',
    left: '120px',
  }
  return (
    <>
      <div className={`col`} style={c}>
        <div
          className={`${
            router.asPath === '/dashboard/coupon'
              ? styles.coupon
              : styles.coupon_ex
          }`}
        >
          <div className={styles.c_title}>
            <p>生日禮</p>
          </div>
          <div className={styles.c_content}>
            <p>8折</p>
          </div>
          <div style={d}>
            <p>~2023/08/17</p>
          </div>
        </div>
      </div>
    </>
  )
}
