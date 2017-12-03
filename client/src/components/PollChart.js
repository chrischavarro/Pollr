import React, { Component } from 'react';
import { Pie } from "react-chartjs-2";

class PollChart extends Component {
  render(data) {
    return (
      <div>
      <Pie
        data={this.props.chartData}
        width={300}

      />
      </div>
    )
  }
}

export default PollChart;
