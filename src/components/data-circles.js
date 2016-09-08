import React from 'react';

const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(coords[0]),
    cy: props.yScale(coords[1]),
    r: 2,
    key: index
  };
  return <circle {...circleProps} />;
};

export default (props) => <g>{ props.data.map(renderCircles(props)) }</g>;
