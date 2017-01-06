import React from 'react';
import d3 from 'd3';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {ResponsiveContainer, ComposedChart, Line, Area,
        Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {getWordsBetweenMonths} from '../../actions';


class D3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: [], year: new Date().getFullYear()};
  }

  componentWillMount(){
    const {year} = this.state;

    this.getStats(year);


  }

  getStats(year){
    const {dispatch } = this.props;
    const that = this;

    dispatch(getWordsBetweenMonths(year, function(data){
      that.setState({
        data: data
      });
    }));
  }

  onYear(e){
    this.setState({
      year: e.target.value
    });

    this.getStats(e.target.value)
  }



  render() {

    return(
      <div>
          <DocumentTitle title="D3"/>
          <h3>ESTADÍSTICAS DE PALABRAS INSERTADAS POR MES</h3>
          <div>
            <input onBlur={this.onYear.bind(this)} defaultValue={this.state.year} />

          </div>
          <ResponsiveContainer height={400}>
          <ComposedChart data={this.state.data}>
          <XAxis dataKey="month"/>
          <YAxis />
          <Tooltip/>
          <CartesianGrid stroke="#f5f5f5"/>
          {/*<Area type='monotone' dataKey='words' fill='#8884d8' stroke='#8884d8'/>*/}
          <Bar dataKey="words" barSize={60} fill="#413ea0"/>
          {/*<<Line type='monotone' dataKey='words' stroke='#ff7300'/>*/}
       </ComposedChart>
       </ResponsiveContainer>
      </div>
    );
 }
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps)(D3);
