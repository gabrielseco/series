import React from 'react';
import d3 from 'd3';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {ResponsiveContainer, ComposedChart, Line, Area,
        Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {getWordsBetweenMonths} from '../../actions';
import {repeatedWords} from '../../actions/repeated';
import UITable from '../UI/Table';
import utils from 'styles/_utils.scss';
import dictionary from 'styles/_diccionarios.scss';
import classNames from 'classnames';



class D3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: [], words:[], year: new Date().getFullYear()};
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
    this.getStats(e.target.value);
  }



  render() {
    /*const columns = [
          {
              property: 'english',
              header: 'English'
          },
          {
              property: 'spanish',
              header: 'Spanish'
          },
          {
              property:'counter',
              header:'Counter'
          }

        ];

        const pagination = {
            page: 0,
            perPage: 10
        };

        const search = {
               column: '',
               query: ''
        };*/

        const composedStyles = classNames({
          [dictionary.dictionaryButton]: true,
          [utils.align__right]:true
        });


    return(
      <div>
          <DocumentTitle title="D3"/>
          {/* <h3>Repeated words</h3>
          <UITable data={this.state.words} columns={columns} pagination={pagination} search={search}/>
          */}
          <h3>ESTADÍSTICAS DE PALABRAS INSERTADAS POR MES</h3>
            <div className={composedStyles}>
              <input type="number" onBlur={this.onYear.bind(this)} defaultValue={this.state.year} />

            </div>
          <ResponsiveContainer height={400}>
              <ComposedChart data={this.state.data} height={200} width={600}>
                <XAxis dataKey="month"/>
                <YAxis />
                <Tooltip/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Bar dataKey="words" barSize={60} fill="#413ea0"/>
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
