import React, { Component } from 'react'
import './NewsItem.css' // we will add CSS here

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, publishedAt, source, author} = this.props;
    return (
     <div className="card my-3 position-relative" style={{ width: "22rem", zIndex: 1 }}>
        
        <span 
          className="badge bg-danger position-absolute top-0 end-0 m-2 shadow " title={source || 'Unknown'}
          style={{ fontSize: '0.8rem', padding: '0.5em 0.7em' }}
        >
          {source.slice(0,20)+'...' || 'Unknown'}
        </span>
        <img
          src={imageUrl}
          className="card-img-top img-fluid"
          alt="Breaking News"
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title title-clamp mb-2">{title || ' '}</h5>
          <p className="card-text description-clamp flex-grow-1">{description || ' '}</p>
          <a href={url} target='_blank' rel="noreferrer" className="btn btn-primary mt-auto">
            Read More
          </a>
          <p className="card-text mt-3 text-center"><small className="text-muted">By Author: {author|| 'Unnown'}, On: {new Date(publishedAt).toDateString()} </small></p>
        </div>
      </div>
    )
  }
}
