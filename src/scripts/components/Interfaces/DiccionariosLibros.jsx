import React from 'react';
import DocumentTitle from 'react-document-title'
import {getOneBook, getDiccionariosLibros, deleteWord} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'




class DiccionarioLibros extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {libro: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getOneBook(this.props.params.id, res => {
      console.log('res DiccionarioLibros',res)
      this.setState({libro: res});
    }))

    dispatch(getDiccionariosLibros(this.props.params.id))



  }

  addWords(){
    this.props.history.pushState(null, '/addWords/0/0/0/'+this.props.params.id);
  }

  modifyBook(){
    this.props.history.pushState(null, '/modifyBook/'+this.props.params.id);

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
                 console.log('id editar',id);

                 this.props.history.pushState(null, 'modifyWord/'+id);



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
    const { words } = this.props;
    const pagination = {
        page: 0,
        perPage: 10
    }

    const search = {
           column: '',
           query: ''
    }

    var texto = "Libros > " + this.state.libro.nombre



    if(words.length > 0){
    return(
      <div>
        <DocumentTitle title={this.state.libro.nombre + " | Words"}/>
        <BreadCrumb data={this.state.libro} texto={texto} goTo={this.modifyBook.bind(this)}/>
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
        <BreadCrumb data={this.state.libro} texto={texto} goTo={this.modifyBook.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en este libro
          </div>
        </div>
    </div>)
  }
}

}
function mapStateToProps(state) {
  return { words: state.words }
}
export default connect(mapStateToProps)(DiccionarioLibros)
