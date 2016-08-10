import React from 'react';
import DocumentTitle from 'react-document-title';
import {getOneFilm, getDiccionariosPalabras, deleteWord} from '../../actions';
import { connect } from 'react-redux';
import UITable from '../UI/Table';
import BreadCrumb from '../UI/BreadCrumb';
import Loading from '../UI/Loading';
import find from 'lodash/find';
import {mouseTrap} from 'react-mousetrap';


class DiccionarioPeliculas extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props);
    this.context = context;
    this.state = {words: null};
  }

  componentWillMount(){
    this.props.bindShortcut(['ctrl+e','command+e'], (e) => {
      e.preventDefault();
      this.addWords();
    });
    this.props.bindShortcut(['ctrl+m','command+m'], (e) => {
      e.preventDefault();
      this.modifyFilm();
    });
    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      this.context.router.goBack();
    });

    const {dispatch } = this.props;

    dispatch(getDiccionariosPalabras(this.props.params.id, words => {
      this.setState({
        words: words
      });
    }));

  }


  addWords(){
    this.context.router.push('/addWords/'+this.props.params.id+"/0/0/0");
  }


  modifyFilm(){
    this.context.router.push('modifyFilm/'+this.props.params.id);
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

                 this.context.router.push(null, 'modifyWord/'+id);



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
                        <a onClick={eliminar} className="delete-btn">Eliminar</a>
                    </span>
                };
              }
            }

        ];
    const peliculas = 'Peliculas';
    const pagination = {
        page: 0,
        perPage: 10
    };

    const search = {
           column: '',
           query: ''
    };
    const words = this.state.words;

    if(words === null){
      return <Loading/>;
    } else {
    if(words.length > 0){
      const texto = "Película > " + this.props.film.nombre;
    return(
      <div>
        <DocumentTitle title={this.props.film.nombre + " | Words"}/>
        <BreadCrumb data={this.props.film} texto={texto} goTo={this.modifyFilm.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <UITable data={this.state.words} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    const texto = "Película > " + this.props.film.nombre;
    return (
      <div>
        <BreadCrumb data={this.props.film} texto={texto} goTo={this.modifyFilm.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en esta película
          </div>
        </div>
    </div>);
  }
}
}

}
function mapStateToProps(state, props) {
  return { film: find(state.films, {id: Number(props.params.id)}) };
}
export default connect(mapStateToProps)(mouseTrap(DiccionarioPeliculas));
