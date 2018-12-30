import React, { Component } from 'react'
import { Input } from "antd";

const SearchBar = Input.Search;

export default class Search extends Component {
  render() {
    return (
      <div className="m-3 col-md-12">
        <SearchBar
          defaultValue={this.props.keyword}
          placeholder="Search here ..."
          enterButton="Search"
          onSearch={value => this.props.search('search', value)}
        />
      </div>
    )
  }
}
