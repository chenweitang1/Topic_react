import Button13 from '../button/button13'
import BackButton from '../button/backbutton'
import { useState } from 'react'

export default function BlogEditForm() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')

  const Titledata = (e) => {
    setTitle(e.target.value)
    setTitleError('')
  }

  const Imagedata = (e) => {
    setImage(e.target.value)
  }

  const Contentdata = (e) => {
    setContent(e.target.value)
    setContentError('');
  }

  const BlogSubmit = (event) => {
    event.preventDefault();

    console.log('Title:', title)
    console.log('Image:', image)
    console.log('Content:', content)

    let isValid = true;

    if (!title) {
        setTitleError('請輸入標題!!');
        isValid = false;
      }

    if (!content) {
        setContentError('請輸入文章內容!!');
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // 清空表单字段
    setTitle('')
    setImage('')
    setContent('')
  }

  return (
    <div className="container pt-5 pb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-7">
          <form onSubmit={BlogSubmit}>
            <h3 className='d-flex justify-content-center pb-5'>編輯作品</h3>
            <div className={`mb-3 pt-3 ${titleError ? 'has-error' : ''}`}>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label fs-4"
              >
                文章標題
              </label>
              <input
                type="text"
                className={`form-control ${titleError ? 'is-invalid' : ''}`}
                id="exampleFormControlInput1"
                value={title}
                onChange={Titledata}
                placeholder="請輸入標題"
              />
              {titleError && <div style={{fontSize:'16px'}} className="text-danger ps-2 pt-3">{titleError}</div>}
            </div>
            <div className="mb-3 pt-3">
              <label htmlFor="formFile" className="form-label fs-4">
                上傳圖片
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={Imagedata}
                value={image}
              />
            </div>
            <div className="mb-3 pt-5">
              <label
                htmlFor="exampleFormControlTextarea1"
                className={`form-label fs-4 ${contentError ? 'has-error' : ''}`}
              >
                文章內容
              </label>
              <textarea
                className={`form-control ${contentError ? 'is-invalid' : ''}`}
                id="exampleFormControlTextarea1"
                placeholder="請輸入文章內容"
                onChange={Contentdata}
                value={content}
                rows="6"
              ></textarea>
               {contentError && <div style={{fontSize:'16px'}} className="text-danger ps-2 pt-3">{contentError}</div>}
            </div>
            <div className="d-flex justify-content-between pt-5">
              <div>
                <Button13 />
              </div>
              <div>
                <BackButton />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}