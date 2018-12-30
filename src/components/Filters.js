import React, { Component } from 'react'
import { Slider, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class Filters extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      data: this.props.data,
      rating: this.props.filters.avgRating,
      subscribers:this.props.filters.numSubscribers
    }
    this.applyFilters = this.applyFilters.bind(this)
  }
  
  applyFilters(type, value){
    this.props.filter(type, value)
  }

  render() {
    const uniqueCategories = [...new Set(this.state.data.map(item => item.category))];

    return (
      <div>
        <div className="card">
          <div className="card-header">
            Filters
          </div>
          <div className="card-body">
            <h6 className="card-title">Category</h6>
            <CheckboxGroup onChange={(selected) => this.applyFilters('category', selected)} options={uniqueCategories} defaultValue={uniqueCategories}  />
            <br/>
            <br/>
            <h6 className="card-title">Average Rating</h6>
            <Slider onChange={(range) => this.applyFilters('avgRating', range)} range defaultValue={[this.state.rating.min, this.state.rating.max]} max={this.state.rating.max} />
            <h6 className="card-title">Subscribers</h6>
            <Slider onChange={(range) => this.applyFilters('numSubscribers', range)} range defaultValue={[this.state.subscribers.min, this.state.subscribers.max]} max={this.state.subscribers.max} />

          </div>
        </div>
      </div>
    )
  }
}
