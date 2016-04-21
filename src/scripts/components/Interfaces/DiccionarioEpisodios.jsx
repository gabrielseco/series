import React from 'react';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title'
import {getOneTV, getDiccionariosEpisodios, deleteWord} from '../../actions'
import { connect } from 'react-redux';
import UITable from '../UI/Table'
import BreadCrumb from '../UI/BreadCrumb'





class DiccionarioEpisodios extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context){
    super(props)
    this.context = context;
    this.state = {serie: '', episodio: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;
    dispatch(getOneTV(this.props.params.idSerie, res => {
      this.setState({serie: res});
    }))
    dispatch(getDiccionariosEpisodios(this.props.params.idEpisodio))


  }

  checkNumber(number){

    if (number < 10 && typeof number !== 'string') {
      number = "0" + number;
    }
    return number
  }

  getEpisode(idEpisodio, episodios){

    for( var i = 0; i < episodios.length; i++ ){
      if (episodios[i].id === idEpisodio) {
        episodios[i].numero = this.checkNumber(episodios[i].numero)
        return episodios[i];
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
               var editar = () => {
                 var id = data[rowIndex].id;

                 this.props.history.pushState(null, '/modifyWord/'+id);



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
      var numero = this.checkNumber(words[0].episodios.numero)
      var url = "/episodes/"+this.props.params.idSerie
      var texto = "Serie > " + words[0].series.nombre + " > " +words[0].series.temporada + "x" + numero + " > " + words[0].episodios.nombre;
      var link = <Link to={url}>{texto}</Link>

    return(
      <div>
        <DocumentTitle title={words[0].series.nombre + " Words"}/>
        <BreadCrumb data={this.state.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <UITable data={words} columns={columns} pagination={pagination} search={search}/>
        </div>
      </div>
    );
  } else {
    if(this.state.serie > ''){
      var url = "/episodes/"+this.props.params.idSerie
      var episodio = this.getEpisode(+this.props.params.idEpisodio, this.state.serie.episodios)
      var texto = "Serie > " + this.state.serie.nombre + " > " +this.state.serie.temporada + "x" + episodio.numero + " > " + episodio.nombre
      var link = <Link to={url}>{texto}</Link>
    }
    return (
      <div>
      <BreadCrumb data={this.state.serie} texto={link} goTo={this.modifyTV.bind(this)}/>
        <div className="table-react">
          <div className="dictionaryButton">
                <button onClick={this.addWords.bind(this)}>ADD WORDS</button>
          </div>
          <div>
            No hay palabras en este episodio
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
