import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title'
import {getOneTV, getDiccionariosEpisodios, deleteWord} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'
import Loading from '../UI/Loading'
import _ from 'lodash';
import {mouseTrap} from 'react-mousetrap';




class DiccionarioEpisodios extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {words: null}
  }

  componentWillMount(){
    this.props.bindShortcut(['command+e', 'ctrl+e'], (e) => {
      e.preventDefault();
      this.addWords();
    });
    this.props.bindShortcut(['ctrl+m','command+m'], (e) => {
      e.preventDefault();
      this.modifyTV();
    });
    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      console.log(this.context.router)
      this.context.router.goBack();
    });
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getDiccionariosEpisodios(this.props.params.idEpisodio, words => {
      this.setState({
        words: words
      })
    }));

  }

  checkNumber(number){

    if (number < 10 && typeof number !== 'string') {
      number = "0" + number;
    }
    return number
  }

  getEpisode(idEpisodio){
    const { episodes } = this.props

    for( var i = 0; i < episodes.length; i++ ){
      if (episodes[i].id === idEpisodio) {
        episodes[i].numero = this.checkNumber(episodes[i].numero)
        return episodes[i];
      }
    }


  }
  addWords(){
    this.context.router.push('/addWords/0/'+this.props.params.idSerie+"/"+this.props.params.idEpisodio + "/0");
  }

  modifyTV(){
    this.context.router.push('/modifyTV/'+this.props.params.idSerie);
  }

  render(){
    const columns = [
          {
              property: 'english',
              header: 'English'
          },
          {
              property: 'spanish',
              header: 'Spanish'
          },
          {
            property: 'editar',
            header: 'Editar',
            cell: (value, data, rowIndex, property) => {
               var editar = () => {
                 var id = data[rowIndex].id;

                 this.context.router.push('/modifyWord/'+id);



               };

               return {
                   value: <span>
                       <a onClick={editar} className="edit-btn">Editar</a>
                   </span>
               };
             }
           },
           {
             property: 'eliminar',
             header: 'Eliminar',
             cell: (value, data, rowIndex, property) => {
                var eliminar = () => {
                  var id = data[rowIndex].id;
                  var english = data[rowIndex].english
                  var del = confirm('Quieres eliminar la palabra: '+english);

                  if(del){
                    const {dispatch } = this.props;
                    dispatch(deleteWord(id, res => {
                      location.reload()
                    }))
                  }
                };

                return {
                    value: <span>
                        <a onClick={eliminar} className="delete-btn">Eliminar</a>
                    </span>
                };
              }
            }

        ];
    const series = 'Series';
    const pagination = {
        page: 0,
        perPage: 10
    };

    const search = {
           column: '',
           query: ''
    };

    const words = this.state.words;
    if(this.state.words === null){
      return <Loading/>
    } else {
    if(words.length > 0){
      var numero = this.checkNumber(words[0].episodios.numero)
      var url = "/episodes/"+this.props.params.idSerie
      var texto = "Serie > " + this.props.serie.nombre + " > " +this.props.serie.temporada + "x" + numero + " > " + words[0].episodios.nombre;
      var link = <Link to={url}>{texto}</Link>

    return(
      <div>
        <DocumentTitle title={this.props.serie.nombre + " Words"}/>
        <BreadCrumb data={this.props.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <UITable data={words} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    if(this.props.serie > ''){
      var url = "/episodes/"+this.props.params.idSerie
      var episodio = this.getEpisode(+this.props.params.idEpisodio)
      var texto = "Serie > " + this.props.serie.nombre + " > " +this.props.serie.temporada + "x" + episodio.numero + " > " + episodio.nombre
      var link = <Link to={url}>{texto}</Link>

    }
    return (
      <div>
      <BreadCrumb data={this.props.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en este episodio
          </div>
        </div>
    </div>)
  }
}
}

}
function mapStateToProps(state, props) {
  console.log(state.episodes);
  return {
    words: state.words,
    serie: _.find(state.TV, {id: Number(props.params.idSerie)}),
    episodes: state.episodes
  }
}
export default connect(mapStateToProps)(mouseTrap(DiccionarioEpisodios))
