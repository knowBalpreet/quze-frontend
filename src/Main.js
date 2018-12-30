import React, { Component } from 'react'
import DataView from './components/DataView';
import Search from './components/Search';
import Filters from './components/Filters';

import "antd/dist/antd.css"; 
const data = require('./data.json');

export default class Main extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data,
       displayData: data,
       filter: {
         search: '',
         category: [...new Set(data.map(item => item.category))],
         avgRating: {
           min: 0,
           max: Math.max.apply(Math, data.map(function (o) { return o.avgRating; }))
          },
          numSubscribers: {
            min: 0,
            max: Math.max.apply(Math, data.map(function (o) { return o.numSubscribers; }))
         }
       },
       initFilter: {
         search: '',
         category: [...new Set(data.map(item => item.category))],
         avgRating: {
           min: 0,
           max: Math.max.apply(Math, data.map(function (o) { return o.avgRating; }))
          },
          numSubscribers: {
            min: 0,
            max: Math.max.apply(Math, data.map(function (o) { return o.numSubscribers; }))
         }
       },
       key: 0,
       resetKey: 0
    }
    this.filter = this.filter.bind(this);
  }

  filter(type, value){
    let { data, displayData, key, filter } = this.state;
    filter[type] = value
    this.setState({ filter }, () => {
      displayData = data
      Object.keys(this.state.filter).map(type => {
        if (type === 'search'  && this.state.filter.search.length > 0) {
          displayData = displayData.filter(row => row.title.toLowerCase().includes(this.state.filter[type]) || row.description.toLowerCase().includes(this.state.filter[type]))
        }
        if (type === "category" && this.state.filter.category.length > 0) {
          displayData = displayData.filter(row => this.state.filter[type].includes(row.category));
        }
        if (type === 'avgRating' && this.state.filter.avgRating.length > 0) {
          displayData = displayData.filter(row => row.avgRating >= this.state.filter[type][0] && row.avgRating <= this.state.filter[type][1])
        }
        if (type === 'numSubscribers' && this.state.filter.numSubscribers.length > 0){
          displayData = displayData.filter(row => row.numSubscribers >= this.state.filter[type][0] && row.numSubscribers <= this.state.filter[type][1])
        }
      })
      this.setState({ displayData, key:key+1 })
    })
  }

  resetDefaults(){
    this.setState({ filter: this.state.initFilter, resetKey: this.state.resetKey + 1, displayData: this.state.data })
  }

  render() {
    console.log('Main', this.state)
    return (
      <div className="container" key={this.state.resetKey} >
        <div className="row">
        {/* Search filter here */}
        <Search search={this.filter} keyword={this.state.filter.search} />
        </div>
        <div className="row">
          <div className="col-md-3">
            {/* Filters here */}
            <Filters data = {this.state.displayData} filter={this.filter} filters={this.state.filter} />
          </div>
          <div className="col-md-9">
          <div className="row">
            <div className="col-md-6"> <button onClick = {() => this.resetDefaults()} className="btn-outline-danger"> Reset Defaults </button> </div>
            <div className="col-md-6">
              <h6 className="float-right">
                {this.state.displayData.length} results found
              </h6>
            </div>
          </div>
          <br/>
          <DataView data = {this.state.displayData} key={this.state.key} />
          {/* Data here */}
          </div>
        </div>
      </div>
    )
  }
}
