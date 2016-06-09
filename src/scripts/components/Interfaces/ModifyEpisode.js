import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {modifyEpisode, getOneEpisode} from '../../actions';

let fieldValues = {};

const float = {
    float: 'right'
};

class ModifyEpisode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''};
  }

  componentDidMount(){

    const { dispatch } = this.props;

    dispatch(getOneEpisode(this.props.params.idEpisodio));

  }

  handleForm(e){
    e.preventDefault();

    const obj = {
      id: this.props.params.idEpisodio,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      numero: this.refs.numero.value,
      airdate: this.refs.airdate.value
    };

    const { dispatch } = this.props;

    dispatch(modifyEpisode(obj, res => {
      this.props.history.goBack();
    }));



  }

  addWords(){
    this.props.history.pushState(null, '/addWords/0/'+this.props.params.idSerie+"/"+this.props.params.idEpisodio + "/0");

  }

  render() {
    const  { episodes } = this.props;
    if(episodes.nombre !== undefined){
      fieldValues = episodes;
      return(
        <div>
        <DocumentTitle title={fieldValues.nombre}/>
        <div className="dictionaryButton" style={float}>
           <button className="addWords" onClick={this.addWords.bind(this)}>ADD WORDS</button>
         </div>
          <img className="img" src={fieldValues.serie.imagen} width="230" height="345"/>
            <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input ref="name" className={this.state.inputName} type="text" name="name" required placeholder="Nombre"
                     defaultValue={fieldValues.nombre}></input>
              <label>Numero</label>
              <input ref="numero" className={this.state.inputName} type="text" name="numero" placeholder="Número"
                     defaultValue={fieldValues.numero}></input>
              <label className="is-required">Fecha</label>
              <input ref="airdate" className={this.state.inputName} type="text" name="airdate" required placeholder="Fecha"
                              defaultValue={fieldValues.airdate}></input>
              <label className="is-required">Descripción</label>
              <textarea ref="overview" defaultValue={fieldValues.overview}></textarea>
              <input type="submit" value="enviar"/>
            </form>
          </div>
      );
    }
    return (<div></div>);

  }
}

function mapStateToProps(state) {
  return { episodes: state.episodes };
}
export default connect(mapStateToProps)(ModifyEpisode);
