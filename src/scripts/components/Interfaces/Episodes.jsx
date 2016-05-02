import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title'
import {getAllEpisodes, deleteEpisode, generateEpisodes} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'
import Loading from '../UI/Loading'
import _ from 'lodash';



class Episodes extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {episodios: null}
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getAllEpisodes(this.props.params.id, res => {
      this.setState({
        episodios: res
      })
    }))

  }
  generateEpisodes(){
    const {dispatch} = this.props;
    const episodios = this.state.episodios;

    var data = {
      idSerie: this.props.serie.idSerie,
      temporada: this.props.serie.temporada,
      id:this.props.params.id
    }


    dispatch(generateEpisodes(data, episodios,  res => {
      console.log('res episodes',res);
      if(res === true){
        location.reload();
      }

    }))


  }

  addEpisodes(){
    this.context.router.push('/addEpisode/'+this.props.params.id);
  }

  modifyTV(){
    this.context.router.push('/modifyTV/'+this.props.params.id);
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
                   var idSerie    = data[rowIndex].serie.id;
                   this.context.router.push('/diccionarios/'+idSerie+'/episodio/'+idEpisodio);


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
                 var idEpisodio = data[rowIndex].id;
                 var idSerie = this.props.params.id

                 this.context.router.push('/modifyEpisode/'+idSerie+"/"+idEpisodio);



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
    const episodios = this.state.episodios;
    const pagination = {
        page: 0,
        perPage: 10
    }

    const search = {
           column: '',
           query: ''
    }

    if(episodios === null){
      return <Loading/>
    } else {

    if(episodios.length > 0){
      var texto = "Serie > " + this.props.serie.nombre + " > Season " +this.props.serie.temporada;
      var link  = <Link to="/tv">{texto}</Link>
      var title = this.props.serie.nombre + " Season "+ this.props.serie.temporada;
    return(
      <div>
        <DocumentTitle title={title}/>
        <BreadCrumb data={this.props.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addEpisodes.bind(this)}>ADD EPISODES</button>
                <button onClick={this.generateEpisodes.bind(this)}>GENERATE</button>
          </div>
          <UITable data={episodios} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    var texto = "Serie > " + this.props.serie.nombre + " > Season " +this.props.serie.temporada;
    return (
      <div>
        <BreadCrumb data={this.props.serie} texto={texto}  goTo={this.modifyTV.bind(this)}/>
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

}
function mapStateToProps(state, props) {
  return { serie: _.find(state.TV, {id: Number(props.params.id)}) }
}
export default connect(mapStateToProps)(Episodes)
