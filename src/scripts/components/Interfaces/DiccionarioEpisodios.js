import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';
import {getOneTV, getDiccionariosEpisodios, deleteWord} from '../../actions';
import { connect } from 'react-redux';
import UITable from '../UI/Table';
import BreadCrumb from '../UI/BreadCrumb';
import Loading from '../UI/Loading';
import find from 'lodash/find';
import {mouseTrap} from 'react-mousetrap';
import tableStyles from 'styles/_reactabular.scss';
import utils from 'styles/_utils.scss';
import dictionary from 'styles/_diccionarios.scss';
import classNames from 'classnames';



class DiccionarioEpisodios extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context){
    super(props);
    this.context = context;
    this.state = {words: null};
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
      this.context.router.goBack();
    });

    const {dispatch } = this.props;

    dispatch(getDiccionariosEpisodios(this.props.params.idEpisodio, words => {
      this.setState({
        words: words
      });
    }));
  }

  checkNumber(number){

    if (number < 10 && typeof number !== 'string') {
      number = "0" + number;
    }
    return number;
  }

  getEpisode(idEpisodio){
    const { episodes } = this.props;

    for( let i = 0; i < episodes.length; i++ ){
      if (episodes[i].id === idEpisodio) {
        episodes[i].numero = this.checkNumber(episodes[i].numero);
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
               const editar = () => {
                 const id = data[rowIndex].id;

                 this.context.router.push('/modifyWord/'+id);



               };

               return {
                   value: <span>
                       <a onClick={editar} className={tableStyles.edit__btn}>Editar</a>
                   </span>
               };
             }
           },
           {
             property: 'eliminar',
             header: 'Eliminar',
             cell: (value, data, rowIndex, property) => {
                const eliminar = () => {
                  const id = data[rowIndex].id;
                  const english = data[rowIndex].english;
                  const del = confirm('Quieres eliminar la palabra: '+english);

                  if(del){
                    const {dispatch } = this.props;
                    dispatch(deleteWord(id, res => {
                      location.reload();
                    }));
                  }
                };

                return {
                    value: <span>
                        <a onClick={eliminar} className={tableStyles.delete__btn}>Eliminar</a>
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

    let numero, url, texto, link,episodio = null;

    const composedStyles = classNames({
      [dictionary.dictionaryButton]: true,
      [utils.align__right]:true
    })

    if(this.state.words === null){
      return <Loading/>;
    } else {
    if(words.length > 0){
       numero = this.checkNumber(words[0].episodios.numero);
       url = "/episodes/"+this.props.params.idSerie;
       texto = "Serie > " + this.props.serie.nombre + " > " +this.props.serie.temporada + "x" + numero + " > " + words[0].episodios.nombre;
       link = <Link to={url}>{texto}</Link>;

    return(
      <div>
        <DocumentTitle title={this.props.serie.nombre + " Words"}/>
        <BreadCrumb data={this.props.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className={tableStyles.table__react}>
          <div className={composedStyles}>
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <UITable data={words} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    if(this.props.serie > ''){
       url = "/episodes/"+this.props.params.idSerie;
       episodio = this.getEpisode(+this.props.params.idEpisodio);
       texto = "Serie > " + this.props.serie.nombre + " > " +this.props.serie.temporada + "x" + episodio.numero + " > " + episodio.nombre;
       link = <Link to={url}>{texto}</Link>;

    }
    return (
      <div>
      <BreadCrumb data={this.props.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className={tableStyles.table__react}>
          <div className={composedStyles}>
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en este episodio
          </div>
        </div>
    </div>);
  }
}
}

}
function mapStateToProps(state, props) {
  return {
    words: state.words,
    serie: find(state.TV, {id: Number(props.params.idSerie)}),
    episodes: state.episodes
  };
}
export default connect(mapStateToProps)(mouseTrap(DiccionarioEpisodios));
