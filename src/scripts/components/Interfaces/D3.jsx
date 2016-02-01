import React from 'react';
import d3 from 'd3';
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux';

class D3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dataSet:[5, 10, 15, 20, 40, 45, 36, 40, 15, 60, 2, 5, 30 , 30, 35], width: 400, height: 300}
  }
  componentDidMount(){
    const {dispatch } = this.props;
    var height = this.state.height;
    var width  = this.state.width;

    var svg = d3.select(this.refs.d3).append('svg')
              .attr('width', width)
              .attr('height', height);

    var multiplier  = 5;

    var yScale = d3.scale.linear()
                         .domain([0, d3.max(this.state.dataSet) * 1.1])
                         .range([0, height]);





      svg.selectAll('rect')
      .data(this.state.dataSet)
      .enter()
      .append('rect')
      .attr('class','bar-d3')
      .attr('x', function(d, i){
        return (i * 22)
      })
      .attr('y', function(d){
        return height - yScale(d)
      })
      .attr('width',20)
      .attr('height', function(d){
        return yScale(d)
      })

  }



  render() {

    return(
      <div>
          <DocumentTitle title="D3"/>
          <div ref='d3' id='d3' ></div>
        </div>
    )
 }
}
function mapStateToProps(state) {
  return { books: state.books }
}
export default connect(mapStateToProps)(D3)
