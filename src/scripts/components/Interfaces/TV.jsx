import React from 'react';
import {getAllTV} from '../../actions'
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';


class TV extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const {dispatch } = this.props;

    var data = dispatch(getAllTV());

  }
  addTV(){
    this.props.history.push('/addTV');

  }
  modifyTV(data){
    console.log('modifyTV',data)
    this.props.history.pushState(null,'/modifyTV/'+data.id)
  }

  episodios(){

  }

  openModal(data) {
    console.log('data',data)
    this.setState({modalIsOpen: true, tv: data});
  }

  render() {
    const { TV } = this.props
    const episodios = (
      <div className="diccionarios">
          <button onClick={this.episodios.bind(this)}>EPISODIOS</button>
      </div>
    )

    if(TV.length > 0){
      var list = TV.map((TV, i) => {
        return (
          <ListItem key={TV.id} data={TV} palabras={episodios} modify={this.modifyTV.bind(this)} openModal={this.openModal.bind(this,TV)}/>
        );

      });

    }
    return(
        <div id='films' className="films">
          <div className="filmButton">
            <button className="addFilm" onClick={this.addTV.bind(this)}>ADD TV</button>
          </div>
            {list}
        </div>
    )
 }
}
function mapStateToProps(state) {
  return { TV: state.TV }
}
export default connect(mapStateToProps)(TV)
