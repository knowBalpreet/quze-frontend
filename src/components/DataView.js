import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroller";
// import InfiniteScroll from "react-masonry-infinite";
import { Icon, Tooltip } from 'antd';

class DataView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      hasMore: true,
      limit: 10,
      offset: 10
    }
  }

  loadMore() {
    let { hasMore, offset, data, limit } = this.state;
    if (offset >= data.length) {
      hasMore = false;
    } else {
      offset = offset + limit;
    }
    this.setState({ hasMore, offset })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <InfiniteScroll
            hasMore={this.state.hasMore}
            loadMore={this.loadMore.bind(this)}
            className="row"
          >
            {
              this.state.data.slice(0, this.state.offset).map((row, index) =>
                <div className="col-4" key={index} >
                  <div className="card">
                    <div className="card-header">
                      {row.category} <Icon type="right" style={{ position: 'relative', bottom: '3px' }} /> {row.subCategory}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{row.title}</h5>
                      <p className="card-text">{row.description}</p>
                      <center>
                        {row.isPaid &&
                          <h3> { row.price } </h3>
                        }
                      </center>
                    </div>
                    <div className="card-footer">
                      <div className="row">
                        <div className="col-md-4">
                          <Tooltip title={`Subscribers: ${row.numSubscribers}`}>
                            <span className="fas fa-3x fa-users"></span>
                          </Tooltip>
                        </div>
                        <div className="col-md-4">
                          <a href={`http://udemy.com${row.url}`} className="btn btn-primary" target="_blank">View</a>
                        </div>
                        <div className="col-md-4">
                          <Tooltip title={`Average Rating: ${row.avgRating}`}>
                            <span className="fas fa-3x fa-star-of-david"></span>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <br/>
                </div>
              )
            }
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default DataView;
