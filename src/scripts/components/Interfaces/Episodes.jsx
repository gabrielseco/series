import React from 'react';
import {getAllEpisodes} from '../../actions'
import { connect } from 'react-redux';

class Episodes extends React.Component {
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getAllEpisodes(this.props.params.id))
  }
  render(){
    return(
      <div>hola vecinos {this.props.params.id}</div>
    );
  }

}
function mapStateToProps(state) {
  return { episodes: state.episodes }
}
export default connect(mapStateToProps)(Episodes)
