import React, { Component } from 'react'
import NewsItem from '../NewsItem/NewsItem'
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    pageSize: 8,
    category: 'general'
  } 

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  };



  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async updateNews() {
    const { pageSize, category } = this.props;
    const { page } = this.state;
    console.log("Updating news..."+ page  + " " + category+ " "+ pageSize);

    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=3e2ae3fab65b4ac2906464e92adc5d13&page=${page}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const parsedData = await response.json();
    console.log(parsedData)

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  }
 async componentDidMount() {
  if (!this.didMountOnce) {
    this.didMountOnce = true;
    await this.updateNews();
  }
}

  fetchMoreData = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => this.updateNews()
    );
  };

  // handleNext = async () => {
  //   let {pageSize} = this.props;
  //   if (this.state.page + 1 <= Math.ceil(this.state.totalResults / pageSize)) {
  //     this.updateNews();
  //     this.setState({page: this.state.page + 1})
  //   }
  //   else{
  //     console.log("No more pages");
  //   }
  // }
  
  // handlePrevious = async () => {   
  //    this.updateNews();
  //   this.setState({page: this.state.page - 1})
  // } 

  render() {
    
      return (
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsApp`,
      <div className='container'>
        <h1 className='my-3 text-center'>Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element, index)=>(
            
          <div className='col-md-3 d-flex align-items-stretch' key={index}>
                          <NewsItem page={element.page} author={element.author} publishedAt={element.publishedAt} source={element.source.name} title={element.title?element.title.slice(0,60):''} description={element.description?element.description.slice(0,100):''} url={element.url} imageUrl={element.urlToImage?element.urlToImage:'https://img.freepik.com/free-vector/gradient-breaking-news-background_23-2151126846.jpg?t=st=1761199778~exp=1761203378~hmac=a6dfb8c0601e56d932be1d0b1f7e914253022986b816a2c19eb6ce514d84df1a&w=1480'}/>
                          </div>
                    ))}
          

        </div>
        {/* <nav aria-label="Page navigation example" style={{'marginTop': '3%'}}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${this.state.page === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="#" onClick={this.handlePrevious} >Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">{this.state.page}</a></li>
            <li className={`page-item ${this.state.page < Math.ceil(this.state.totalResults / pageSize) ? '' : 'disabled'}`}>
              <a className="page-link" href="#" onClick={this.handleNext}>Next</a>
            </li>
          </ul>
        </nav> */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >

          </InfiniteScroll>

      </div>
    )
  }
}
