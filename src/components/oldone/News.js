import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spineer from "./Spineer";
import PropType from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  article = [];

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propType = {
    country: PropType.string,
    pageSize: PropType.number,
    category: PropType.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      article: this.article,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = this.props.category;
  }

  async updatenews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updatenews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatenews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Top HeadLines</h2>

        {/* {this.state.loading && <Spineer />} */}

        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spineer />}
        >
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4" Key={element.url}>
                  {/* SEND DATA TO NEWSITEMS */}
                  <NewsItems
                    title={element.title.slice(0, 50)}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    authorName={element.author}
                    date={element.publishedAt}
                    sources={element.source.name}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
