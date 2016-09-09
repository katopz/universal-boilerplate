import React from 'react';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const node = this.refs.axis;
    const axis = (this.props.orient === 'bottom' ? axisBottom(this.props.scale) : axisLeft(this.props.scale)).ticks(5);
    select(node).call(axis);
  }

  render() {
    return <g className='axis' ref='axis' transform={this.props.translate} />;
  }
}
