import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spineer from "./Spineer";
import PropType from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
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
      article: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = this.props.category;
  }

  async updatenews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updatenews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center ">Top HeadLines</h2>

        {this.state.loading && <Spineer />}

        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spineer />}
        >
          <div className="container">
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
