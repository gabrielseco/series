import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import {getAllEpisodes, deleteEpisode, generateEpisodes} from '../../actions';
import { connect } from 'react-redux';
import UITable from '../UI/Table';
import BreadCrumb from '../UI/BreadCrumb';
import Loading from '../UI/Loading';
import _ from 'lodash';
import {mouseTrap} from 'react-mousetrap';




class Episodes extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  };

  constructor(props, context){
    super(props);
    this.context = context;
    this.state = {episodios: null};
  }

  componentWillMount(){
    this.props.bindShortcut(['ctrl+g','command+g'], (e) => {
      e.preventDefault();
      this.generateEpisodes();
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

    dispatch(getAllEpisodes(this.props.params.id, res => {
      this.setState({
        episodios: res
      });
    }));
  }

  generateEpisodes(){
    const {dispatch} = this.props;
    const episodios = this.state.episodios;

    const data = {
      idSerie: this.props.serie.idSerie,
      temporada: this.props.serie.temporada,
      id:this.props.params.id
    };


    dispatch(generateEpisodes(data, episodios,  res => {
      if(res === true){
        location.reload();
      }

    }));


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
                 const ver = () => {
                   const idEpisodio = data[rowIndex].id;
                   const idSerie    = data[rowIndex].serie.id;
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
               const editar = () => {
                 const idEpisodio = data[rowIndex].id;
                 const idSerie = this.props.params.id;

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
                const eliminar = () => {
                  const id = data[rowIndex].id;
                  const nombre = data[rowIndex].nombre;
                  const numero = data[rowIndex].numero;

                  const del = confirm('Quieres eliminar el episodio número '+numero+ ' con nombre: '+nombre);

                  if(del){
                    const {dispatch } = this.props;
                    dispatch(deleteEpisode(id, res => {
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
    const episodios = this.state.episodios;
    const pagination = {
        page: 0,
        perPage: 10
    };

    const search = {
           column: '',
           query: ''
    };

    if(episodios === null){
      return <Loading/>;
    } else {

    if(episodios.length > 0){
      const texto = "Serie > " + this.props.serie.nombre + " > Season " +this.props.serie.temporada;
      const link  = <Link to="/tv">{texto}</Link>;
      const title = this.props.serie.nombre + " Season "+ this.props.serie.temporada;
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
    let texto = "Serie > " + this.props.serie.nombre + " > Season " +this.props.serie.temporada;
    return (
      <div>
        <BreadCrumb data={this.props.serie} texto={texto}  goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addEpisodes.bind(this)}>ADD EPISODES</button>
                <button onClick={this.generateEpisodes.bind(this)}>GENERATE</button>
          </div>
        </div>
    </div>);
  }
}
}

}
function mapStateToProps(state, props) {
  return { serie: _.find(state.TV, {id: Number(props.params.id)}) };
}
export default connect(mapStateToProps)(mouseTrap(Episodes));
