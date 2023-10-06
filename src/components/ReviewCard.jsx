import React from 'react'

const ReviewCard = ({review}) => {

  return (
    <div className='review-card'>
        <h3>{review.author}</h3>
        <p>{review.content}</p>
        <p>{review.created_at}</p>
    </div>
  )
}

export default ReviewCard