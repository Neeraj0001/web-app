import React, { Component } from 'react'
import loader from './loading.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh' 
        }}
      >
        <img src={loader} alt="Loading..." style={{ width: '80px', height: '80px' }} />
      </div>
    )
  }
}
