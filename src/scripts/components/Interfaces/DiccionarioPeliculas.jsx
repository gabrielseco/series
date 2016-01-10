import React from 'react';
import {getOneFilm, getDiccionariosPalabras, deleteWord} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'




class DiccionarioPeliculas extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {pelicula: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getOneFilm(this.props.params.id, res => {
      console.log('res ModifyTV',res)
      this.setState({pelicula: res});
    }))

    dispatch(getDiccionariosPalabras(this.props.params.id))



  }

  addEpisodes(){
    this.props.history.pushState(null, '/addEpisode/'+this.props.params.id);
  }

  addWords(){
    this.props.history.pushState(null, '/addWords/'+this.props.params.id);
  }

  modifyTV(){
    this.props.history.pushState(null, 'modifyTV/'+this.props.params.id);
  }
  modifyFilm(){
    this.props.history.pushState(null, 'modifyFilm/'+this.props.params.id);
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
    const peliculas = 'Peliculas';
    const pagination = {
        page: 0,
        perPage: 10
    }

    const search = {
           column: '',
           query: ''
    }


    if(words.length > 0){

    return(
      <div>
        <BreadCrumb data={this.state.pelicula} parent={peliculas} goTo={this.modifyFilm.bind(this)}/>
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
        <BreadCrumb data={this.state.pelicula} parent={peliculas} goTo={this.modifyFilm.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en esta película
          </div>
        </div>
    </div>)
  }
}

}
function mapStateToProps(state) {
  return { words: state.words }
}
export default connect(mapStateToProps)(DiccionarioPeliculas)
