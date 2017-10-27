import React from 'react';
import { connect } from 'react-redux';
import {addOneEpisode} from '../../actions';

class AddEpisode extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props, context) {
    super(props);
    this.context = context;
  }

  componentDidMount(){
    let {episodes} = this.context.store.getState();
        episodes = episodes.length + 1;

    if( !isNaN(episodes)){
      this.refs.numero.value = episodes;
    }
  }

  handleForm(e){
    e.preventDefault();

    const obj = {
      nombre: this.refs.name.value,
      numero: this.refs.numero.value,
      serie: this.props.params.id
    };

    const { dispatch } = this.props;

    dispatch(addOneEpisode(obj, res => {
      this.props.history.push('/episodes/'+this.props.params.id);
    }));



  }

  render() {

    return(
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input ref="name" type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
              <label className="is-required">Número</label>
              <input ref="numero" type="text" name="numero" required placeholder="Número" autoComplete="off"></input>
              <input type="submit" value="Enviar"></input>
      </form>
    );
 }
}

export default connect()(AddEpisode);
