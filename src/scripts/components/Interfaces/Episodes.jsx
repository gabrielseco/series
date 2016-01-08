import React from 'react';
import {getAllEpisodes} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'

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
             /*var id = data[rowIndex].ID;
             var idSerie = this.getParams().id;
             var idGenerator = this.getParams().idGenerator;


             this.transitionTo('/modifyEpisode/:id/:idSerie/:idGenerator', {id: id, idSerie: idSerie, idGenerator: idGenerator });
             */
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
              var id = data[rowIndex].ID;
              var nombre = data[rowIndex].Nombre;
              var numero = data[rowIndex].Numero;
              //console.log(nombre+" "+id+" "+numero);

              /*var del = confirm('Quieres eliminar el episodio numero '+numero+ ' con nombre: '+nombre);

              if(del){
                this.props.flux.getActions('tv').deleteEpisode(id).then(function(res){
                  //console.log('res delete', res);
                  if(res[0].Resultado === 200){
                    location.reload();
                  }
                });
              }*/
            };

            return {
                value: <span>
                    <a onClick={eliminar} className="delete-btn">Eliminar</a>
                </span>
            };
          }
        }

    ];

class Episodes extends React.Component {
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getAllEpisodes(this.props.params.id))
  }
  render(){
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
      <div className="table-react">
        <div className='img-info'>
          <img src={episodes[0].serie.imagen}/>
          BREADCRUMB
        </div>
        <div className="dictionaryButton">
              <button onClick={this.addEpisodes}>ADD EPISODES</button>
              <button onClick={this.generateEpisodes}>GENERATE</button>
        </div>
        <UITable data={episodes} columns={columns} pagination={pagination} search={search}/>
      </div>
    );
  } else {
    return (<div></div>)
  }
}

}
function mapStateToProps(state) {
  return { episodes: state.episodes }
}
export default connect(mapStateToProps)(Episodes)
