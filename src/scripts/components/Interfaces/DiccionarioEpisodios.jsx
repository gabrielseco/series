import React from 'react';
import {getOneTV, getDiccionariosEpisodios, deleteWord} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'




class DiccionarioEpisodios extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {serie: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getOneTV(this.props.params.idSerie, res => {
      this.setState({serie: res});
    }))
    dispatch(getDiccionariosEpisodios(this.props.params.idEpisodio))


  }
  addWords(){
    this.props.history.pushState(null, '/addWords/'+this.props.params.id);
  }

  modifyTV(){
    this.props.history.pushState(null, 'modifyTV/'+this.props.params.id);
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
    const series = 'Series';
    const pagination = {
        page: 0,
        perPage: 10
    }

    const search = {
           column: '',
           query: ''
    }


    if(words.length > 0){
      console.log(words[0]);
      var texto = "Serie > " + words[0].series.nombre + " > Season " +words[0].series.temporada + " > " + words[0].episodios.nombre;

    return(
      <div>
        <BreadCrumb data={this.state.serie} texto={texto} goTo={this.modifyTV.bind(this)}/>
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
      <BreadCrumb data={this.state.serie} texto={texto} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en esta serie
          </div>
        </div>
    </div>)
  }
}

}
function mapStateToProps(state) {
  return { words: state.words }
}
export default connect(mapStateToProps)(DiccionarioEpisodios)
