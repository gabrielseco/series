import React from 'react';
import DocumentTitle from 'react-document-title';
import {getOneBook, getDiccionariosLibros, deleteWord} from '../../actions';
import { connect } from 'react-redux';
import UITable from '../UI/Table';
import BreadCrumb from '../UI/BreadCrumb';
import find from 'lodash/find';
import Loading from '../UI/Loading';
import {mouseTrap} from 'react-mousetrap';





class DiccionarioLibros extends React.Component {
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
      this.modifyBook();
    });
    this.props.bindShortcut('esc', (e) => {
      e.preventDefault();
      this.context.router.goBack();
    });

    const {dispatch } = this.props;

    dispatch(getDiccionariosLibros(this.props.params.id, words => {
      this.setState({
        words: words
      });
    }));
  }


  addWords(){
    this.context.router.push('/addWords/0/0/0/'+this.props.params.id);
  }

  modifyBook(){
    this.context.router.push('/modifyBook/'+this.props.params.id);

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
    const { words } = this.state;
    const pagination = {
        page: 0,
        perPage: 10
    };

    const search = {
           column: '',
           query: ''
    };

    const texto = "Libros > " + this.props.book.nombre;

    if(words === null){
      return <Loading/>;
    } else {

    if(words.length > 0){
    return(
      <div>
        <DocumentTitle title={this.props.book.nombre + " | Words"}/>
        <BreadCrumb data={this.props.book} texto={texto} goTo={this.modifyBook.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <UITable data={words} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <BreadCrumb data={this.props.book} texto={texto} goTo={this.modifyBook.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en este libro
          </div>
        </div>
    </div>);
  }
 }
}

}


function mapStateToProps(state, props) {
  return { book: find(state.books, {id: Number(props.params.id)}) };
}

export default connect(mapStateToProps)(mouseTrap(DiccionarioLibros));
