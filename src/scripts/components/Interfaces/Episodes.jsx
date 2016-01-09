import React from 'react';
import {getAllEpisodes, deleteEpisode, generateEpisodes, getOneTV} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'




class Episodes extends React.Component {
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
    dispatch(getOneTV(this.props.params.id, res => {
      console.log('res ModifyTV',res)
      this.setState({serie: res});
    }))
    dispatch(getAllEpisodes(this.props.params.id))



  }
  generateEpisodes(){
    const {dispatch} = this.props;
    var data = {
      idSerie: this.state.serie.idSerie,
      temporada: this.state.serie.temporada,
      id:this.props.params.id
    }


    dispatch(generateEpisodes(data, res => {
      console.log('res episodes',res);
      
    }))


  }

  addEpisodes(){
    this.props.history.pushState(null, '/addEpisode/'+this.props.params.id);
  }

  modifyTV(){
    this.props.history.pushState(null, 'modifyTV/'+this.props.params.id);
  }

  render(){
    const columns = [
          {
              property: 'nombre',
              header: 'Nombre'
          },
          {
              property: 'numero',
              header: 'Número'
          },
          {
              property: 'ver',
              header: 'Ver',
              cell: (value, data, rowIndex, property) => {
                 var ver = () => {
                   var idEpisodio = data[rowIndex].id;
                   console.log('id', idEpisodio);
                   this.props.history.pushState(null,'/diccionarios/episodio/'+idEpisodio);

                   //console.log('ver palabras de un capítulo'+id);
                  // this.transitionTo('/dictionaryEpisode/:idPelicula/:idEpisodio', {idPelicula: id, idEpisodio: idEpisodio} );

                 };

                 return {
                     value: <span>
                         <a onClick={ver} className="edit-btn">ver</a>
                     </span>
                 };
               }
          },
          {
            property: 'editar',
            header: 'Editar',
            cell: (value, data, rowIndex, property) => {
               var editar = () => {
                 var id = data[rowIndex].id;
                 console.log('id editar',id);

                 this.props.history.pushState(null, 'modifyEpisode/'+id);



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
                  var nombre = data[rowIndex].nombre;
                  var numero = data[rowIndex].numero;
                  console.log(nombre+" "+id+" "+numero);

                  var del = confirm('Quieres eliminar el episodio número '+numero+ ' con nombre: '+nombre);

                  if(del){
                    const {dispatch } = this.props;
                    dispatch(deleteEpisode(id, res => {
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
    const { episodes } = this.props;
    const pagination = {
        page: 0,
        perPage: 10
    }

    const search = {
           column: '',
           query: ''
    }

    if(episodes.length > 0){

    return(
      <div>
        <BreadCrumb data={episodes[0].serie} parent={Episodes.name} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addEpisodes.bind(this)}>ADD EPISODES</button>
                <button onClick={this.generateEpisodes.bind(this)}>GENERATE</button>
          </div>
          <UITable data={episodes} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <BreadCrumb data={this.state.serie} parent={Episodes.name} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addEpisodes.bind(this)}>ADD EPISODES</button>
                <button onClick={this.generateEpisodes.bind(this)}>GENERATE</button>
          </div>
        </div>
    </div>)
  }
}

}
function mapStateToProps(state) {
  return { episodes: state.episodes }
}
export default connect(mapStateToProps)(Episodes)
