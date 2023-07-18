import BookReviewElement from "./book-review-element"
import BookElement from "./book-element"

export default function BookContent() {

    return (
    <div className="col-7 d-flex flex-column ps-5 pe-5">
        <BookElement/>
        <BookReviewElement/>
        <BookReviewElement/>
        <BookReviewElement/>
        <BookReviewElement/>
        <BookReviewElement/>
    </div>
    )
}