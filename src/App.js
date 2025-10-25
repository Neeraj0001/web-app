import React, { Component } from 'react'
import Navbar from "./Components/Navbar/Navbar";
import News from './Components/News/News';
import {Routes, Route, BrowserRouter} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={8} category="general"/>}/>
          <Route exact path="/business" element={<News key="business" pageSize={8} category="business"/>}/>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={8} category="entertainment"/>}/>
          <Route exact path="/general" element={<News key="general" pageSize={8} category="general"/>}/>
          <Route exact path="/health" element={<News key="health" pageSize={8} category="health"/>}/>
          <Route exact path="/science" element={<News key="science" pageSize={8} category="science"/>}/>
          <Route exact path="/sports" element={<News key="sports" pageSize={8} category="sports"/>}/>
          <Route exact path="/technology" element={<News key="technology" pageSize={8} category="technology"/>}/>
        </Routes>
        
        </BrowserRouter>
        
        {/* <News pageSize={8}/> */}
      </div>
    )
  }
}
