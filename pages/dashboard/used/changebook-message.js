import React, { useEffect, useState, useRef } from 'react'
import MemberNav from '@/components/common/member-nav/member-nav'
import UsedTdUncomfirmed from '@/components/used/chk-msg/used-td-uncomfirmed'
import UsedTdExchange from '@/components/used/chk-msg/used-td-exchange'
import UsedTdReturn from '@/components/used/chk-msg/used-td-return'
import UsedTdUnreceive from '@/components/used/chk-msg/used-td-unreceive'
import Link from 'next/link'
import Member_info from '@/components/Leo/member/member_info'
import MemberBreadcrumbs_2 from '@/components/Leo/member/member_breadcrumbs-2'
import { useRouter } from 'next/router'
import UsedTdGiveUpReturn from '@/components/used/chk-msg/used-td-GiveUpReturn'
import Head from 'next/head'
import UsedPrint from '@/components/used/used_print'
import UsedPintInfo from '@/components/used/used_printinfo'
import { useReactToPrint } from 'react-to-print'
import Loading from '@/components/common/loading'
import Popup_window from '@/components/used/popup_window'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export default function ChangebookMessage() {
  const { notify, setnotify } = useContext(AuthContext)

  const printref = useRef()
  const router = useRouter()
  const [usedlist, setusedlist] = useState(false)
  const [data, setData] = useState({
    redirect: '',

    perPage: 4,
    totalPages: 0,
    page: 1,
    rows: [],
    error: '',
  })
  const [usedInfo, setusedInfo] = useState([])
  const [usedPrintInfo, setusedPrintInfo] = useState([])
  const [memberinfo, setmemberinfo] = useState([])
  const [qrcode_info, setqrcode_info] = useState([])
  const [loading, setloading] = useState(true)
  const [nodata, setnodata] = useState(false)
  // const [totalpage, setTotalpage] = useState(1)
  // const [nowpage, setnowpage] = useState(1)
  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      router.push('/member/login')
    } else {
      getData()
    }
  }, [router.query])
  // console.log(router.query)
  const getData = async () => {
    const authToken = JSON.parse(localStorage.getItem('auth')).token

    const usp = new URLSearchParams(router.query)
    // console.log(usp.toString())

    const getdata1 = await fetch(
      `${process.env.API_SERVER}/used/change/item/?${usp.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    const getdata2 = await getdata1.json()

    // console.log(getdata2)
    // console.log(getdata2.notify)
    const auth_old = JSON.parse(localStorage.getItem('auth'))
    const auth_old_new = JSON.stringify({
      ...auth_old,
      notify: getdata2.notify,
    })
    localStorage.setItem('auth', auth_old_new)
    setnotify(getdata2.notify)
// console.log(getdata2)
    setData(getdata2)
    setTimeout(() => {
      setloading(false)
    }, 1800)
  }
  const getUsedInfo = async () => {
    const authToken = JSON.parse(localStorage.getItem('auth')).token
    const getUsedInfo1 = await fetch(
      `${process.env.API_SERVER}/used/getUsedinfo`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    const getUsedInfo12 = await getUsedInfo1.json()

    setusedInfo(getUsedInfo12[0])
    setmemberinfo(getUsedInfo12[1][0])
    setusedlist(true)
  }
  //取消二手書資訊框
  const closeItem = (e) => {
    const usedUpCheckElement = document.querySelector('.used_display_chkbox')
    if (!usedUpCheckElement.contains(e.target)) {
      setusedlist(false)
    }
  }
  const printALL = (used_data) => {
    const printrow = used_data.filter((v, i) => {
      if (v.checked) return v
    })
    const qrcode_infodata = printrow.map((v, i) => {
      return v.used_id
    })

    setusedPrintInfo(printrow)
    setqrcode_info(JSON.stringify(qrcode_infodata))
  }

  useEffect(() => {
    if (qrcode_info.length >= 1) {
      print_item()
    }
  }, [qrcode_info])

  const handleAfterPrint = () => {
    setusedlist(false) // Update the state when onAfterPrint is triggered
  }

  const print_item = useReactToPrint({
    content: () => printref.current,
    documentTitle: '上架資訊',
    onAfterPrint: handleAfterPrint,
  })

  return (
    <>
      <Head>
        <title>Book書易</title>
      </Head>
      <Member_info />
      <MemberNav />
      <MemberBreadcrumbs_2 />
      {loading ? (
        <div style={{ paddingTop: '100px' }}>
          <Loading />
        </div>
      ) : (
        <>
          <div className="px-2 mt-3">
            <div className="dropdown pb-3 d-flex justify-content-between ">
              <button
                className="btn btn-success dropdown-toggle letter-spacing border-radius-5px textp-20px used-search-text-16"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                狀態篩選
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" href="?book_state=all">
                    ALL
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="?book_state=1">
                    待確認
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="?book_state=2">
                    待收書
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="?book_state=3">
                    退回
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="?book_state=4">
                    已兌換
                  </Link>
                </li>
              </ul>
              <button
                className="btn btn-success  letter-spacing border-radius-5px textp-20px used-search-text-16 "
                onClick={getUsedInfo}
              >
                列印二手書資訊
              </button>
            </div>
            {data.error === 'no_data' ? (
              <div className="text-center fs-3">目前沒有資料</div>
            ) : (
              <>
                {' '}
                <table
                  className="table used_table_layout  "
                  style={{ border: '6px solid #84A98C' }}
                >
                  <thead>
                    <tr>
                      <th
                        className="text-center col-2 textp-20px fw-bold used-search-text-16"
                        style={{ background: '#84A98C' }}
                      >
                        序號
                      </th>
                      <th
                        className="text-center col-6 textp-20px fw-bold used-search-text-16"
                        style={{ background: '#84A98C' }}
                      >
                        二手書
                      </th>
                      <th
                        className="text-center col-2 textp-20px fw-bold used-search-text-16"
                        style={{ background: '#84A98C' }}
                      >
                        狀態
                      </th>
                      <th
                        className="text-center col-2 textp-20px fw-bold used-search-text-16"
                        style={{ background: '#84A98C' }}
                      >
                        詳細資料
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((v, i) => {
                      const { used_id, ISBN, book_name, used_state, price } = v
                      let snumber = i + 1
                      if (used_state === '1') {
                        //待確認
                        return (
                          <UsedTdUncomfirmed
                            snumber={snumber}
                            key={used_id}
                            used_id={used_id}
                            ISBN={ISBN}
                            book_name={book_name}
                            used_state={used_state}
                          />
                        )
                      } else if (used_state === '2') {
                        //待收書
                        return (
                          <UsedTdUnreceive
                            snumber={snumber}
                            key={used_id}
                            used_id={used_id}
                            ISBN={ISBN}
                            book_name={book_name}
                            used_state={used_state}
                          />
                        )
                      } else if (used_state === '3') {
                        //退回
                        return (
                          <UsedTdReturn
                            snumber={snumber}
                            key={used_id}
                            used_id={used_id}
                            ISBN={ISBN}
                            book_name={book_name}
                            used_state={used_state}
                          />
                        )
                      } else if (used_state === '4') {
                        //已兌換
                        return (
                          <UsedTdExchange
                            snumber={snumber}
                            key={used_id}
                            used_id={used_id}
                            ISBN={ISBN}
                            book_name={book_name}
                            used_state={used_state}
                            price={price}
                          />
                        )
                      } else if (used_state === '5') {
                        //取消退回
                        return (
                          <UsedTdGiveUpReturn
                            snumber={snumber}
                            key={used_id}
                            used_id={used_id}
                            ISBN={ISBN}
                            book_name={book_name}
                            used_state={used_state}
                            price={price}
                          />
                        )
                      }
                    })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center mt-5 ">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="?page=1"
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      {Array(5)
                        .fill(1)
                        .map((v, i) => {
                          let p
                          if (data.page === 1) {
                            p = data.page + i
                          } else if (data.page === 2) {
                            p = data.page - 1 + i
                          } else if (data.page === data.totalPages) {
                            p = data.page - 4 + i
                          } else if (data.page === data.totalPages - 1) {
                            p = data.page - 3 + i
                          } else {
                            p = data.page - 2 + i
                          }

                          const query = { ...router.query }

                          if (p < 1 || p > data.totalPages) return
                          query.page = p
                          return (
                            <li
                              className={`page-item ${
                                p === data.page ? 'active' : ''
                              }`}
                              key={p}
                            >
                              <Link
                                className="page-link"
                                href={
                                  '?' + new URLSearchParams(query).toString()
                                }
                              >
                                {p}
                              </Link>
                            </li>
                          )
                        })}

                      <li className="page-item">
                        <a
                          className="page-link"
                          href={`?page=${data.totalPages}`}
                          aria-label="Next"
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )}

            <div className="used_rwd_botton" style={{ height: '300px' }}></div>
          </div>
          {usedlist ? (
            <div
              className="used_display_UsedUpCheck"
              role="button"
              tabIndex={0}
              onClick={
                closeItem
                // 在這裡處理點擊事件
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  closeItem

                  // 在這裡處理回車鍵或空白鍵事件，模擬點擊效果
                }
              }}
              // 此處可以添加其他滑鼠或觸控事件處理程序
            >
              <UsedPrint usedInfo={usedInfo} printALL={printALL} />
            </div>
          ) : (
            ''
          )}
          <div className="d-none">
            <UsedPintInfo
              usedPrintInfo={usedPrintInfo}
              memberinfo={memberinfo}
              printref={printref}
              qrcode_info={qrcode_info}
            />
          </div>
        </>
      )}
    </>
  )
}
