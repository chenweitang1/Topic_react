import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Image from 'next/image'
import Trash from "@/assets/Nav_Image/trashcan.svg"
import styles from "@/components/Cart_component/cart/CartProductlist.module.css"
import fake from "@/assets/Cart_Image/fake.svg"



export default function CurtProduct({data,addcount}) {
  console.log(data.cart);
  const Countcut = {
    textAlign: "center",
    border: "1px solid var(--color6)",
    width:"30px",
    backgroundColor: "var(--bgc7)",
    borderRadius:"50%",
    padding:"3px"
  }
  const Countplus = {
    textAlign: "center",
    border: "1px solid var(--color6)",
    width:"30px",
    backgroundColor: "var(--bgc7)",
    borderRadius:"50%"
  }
  const Header1={
    textAlign:"center",
    fontSize:"var(--txp24)"
  }

const limitText = (text,maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const PLheader = ["產品","ISBN","價格","數量","小計","刪除"]
  
  return (
  <>
    <Table className={styles.tablecontain}>
      <thead>
        <tr>
          {PLheader.map((v,i)=>{
          return(   
              <th key={i}  style={Header1}>{v}</th>
              )
          })}
          </tr>  
      </thead> 
      `<tbody>
      {data.cart.map((v,i)=>{
        const truncatedBookName = limitText(v.book_name,10);
          return(
          <tr key={i} className={styles.Prodeucttr}>
              <td className={styles.ProdeuctBlock}><Image src={fake}  alt='icon'/>{truncatedBookName}</td>
              <td className={styles.ProdeuctBlock}>{v.ISBN}</td>
              <td className={styles.ProdeuctBlock}><span className={styles.oneprice}>{v.price}</span></td>
              <td>
                  <div className={styles.CountBlock}>
                    <button style={Countcut} className={styles.Countcut} >-</button>
                    <div className={styles.Countvalue}>{v.count}</div>
                    <button style={Countplus} className={styles.Countplus} onClick={() => addcount(v.ISBN)}>+</button>
                  </div>
              </td> 
              <td className={styles.ProdeuctBlock}><span className={styles.totalprice}>{v.price*v.count}</span></td>
              <td className={styles.ProdeuctBlock}><button className={styles.trashbtn}><Image src={Trash} width={40} height={40} alt='icon'/></button></td>
          </tr>)
      })}
      </tbody>
    </Table>
    {data.cart.map((v,i)=>{
        return(
          <div className={styles.CProductlist} key={i}>
            <div className={styles.CProductlist1} >
              <div><Image src={fake} alt='icon' width={100} height={80}/></div>
              <div className={styles.CProductlist2}>
                <h6 className={styles.Clisttext}>{v.book_name}</h6>
                <h6 className={styles.Clisttext}>{v.ISBN}</h6>
                <div className={styles.CountBlock}>
                    <button  className={styles.Countcut}>-</button>
                    <div className={styles.Countvalue}>{v.count}</div>
                    <button  className={styles.Countplus} onClick={() => addcount(v.ISBN)}>+</button>
                </div>
              </div>
              <div className={styles.CProductlist3}>
                <button className={styles.trashbtn}><Image src={Trash} width={30} height={30} alt='icon'/></button>
              </div>
            </div>
            <div className={styles.CPtotaltext}>
              <p><span className={styles.totalprice}>{v.price*v.count}</span></p>
            </div>
          </div>

        )
    })}
  </>
  )
}
