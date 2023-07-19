import CartTitle from '@/components/Cart_component/Cart_title'
import OrderInput from '@/components/Cart_component/order/order_small/order-input'
import OrderState from '@/components/Cart_component/order/order_state'
import DeepButton from '@/components/common/CBtn/DeepgreenBtn'
import React from 'react'

export default function OrderCheckout() {
  return (
    <>
      <OrderState/>
      <CartTitle titlecontent={"付款完成後，就大功告成啦"} />
      <div>
        <OrderInput labelcontent={"卡號"} type={"number"}/>
        <OrderInput labelcontent={"日期"} type={"number"} />
        <OrderInput labelcontent={"安全碼"} type={"number"} />
      </div>
      <div style={{marginBottom:"40px"}}>
        <DeepButton DeepButtoncontent={"完成付款"} route="/order/complete"/>
      </div>
        
    </>
  )
}
