import React from 'react';
import d3 from 'd3';
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class D3 extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }



  render() {
    const data = [
          {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
          {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
          {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
          {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
          {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
          {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
          {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];
    return(
      <div>
          <DocumentTitle title="D3"/>
          <BarChart width={1200} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
      </div>
    )
 }
}
function mapStateToProps(state) {
  return { }
}
export default connect(mapStateToProps)(D3)
