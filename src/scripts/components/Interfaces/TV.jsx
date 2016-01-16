import React from 'react';
import {getAllTV, deleteTV} from '../../actions'
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import SearchInput from 'react-search-input';
import Modal from 'react-modal'
import axios from 'axios'
import { add } from '../../lib/sails'

const modalStyle = {
  content : {
    height: '20%'
  }
}

class TV extends React.Component {

  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false, tv: '', searchTerm: ''}
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getAllTV());

    this.refs.search.refs.search.focus();

  }
  addTV(){
    this.props.history.push('/addTV');

  }
  modifyTV(data){
    console.log('modifyTV',data)
    this.props.history.pushState(null,'/modifyTV/'+data.id)
  }

  remove(){
    console.log('remove',this.state.tv);
    const { dispatch } = this.props;

    dispatch(deleteTV(this.state.tv.id , res => {
      console.log('res DELETE TV',res);
      location.reload()
    }));

  }

  episodios(id){
    console.log('episodios')
    this.props.history.pushState(null,'/episodes/'+id)
  }

  syncData(){
    axios.get('http://192.168.1.130:5412/web/series_sails').then(res => {
      console.log('res sync',res.data)
      res = res.data;
      res.map((value, i) => {
        if(+value.Borrado === 0){
          var data = {
            id: value.ID,
            idSerie: value.IDSerie,
            idSeason: value.IDSeason,
            temporada: value.Temporada,
            year:value.Year,
            overview: value.Descripcion,
            nombre: value.Nombre,
            imagen: value.Foto
          }
          add('series', data, response => {
            console.log('response',response)
          });
        }
        setTimeout(() =>{location.reload()},2500)
      });


    })


  }

  syncDataEpisodes(){
    axios.get('http://192.168.1.130:5412/web/episodios_sails').then(res => {
      console.log('res sync',res.data)
      res = res.data;
      res.map((value, i) => {
        if(+value.Borrado === 0){
          if(value.Airdate !== ''){
            var fecha = value.Airdate.split("/");
                if(fecha[0] < 10) {
                  fecha[0] ="0"+fecha[0];
                }
                if(fecha[1] < 10) {
                  fecha[1] ="0"+fecha[1];
                }
                fecha = fecha[2] + "-" +fecha[0] + "-"+fecha[1];
          }
          var data = {
            id: value.ID,
            idSerie: value.IDSerie,
            nombre:value.Nombre,
            numero:Number(value.Numero),
            overview: value.Descripcion,
            airdate: fecha,
            serie: value.IDSerie
          }
          add('episodes', data, response => {
            console.log('response',response)
          });
          setTimeout(() =>{location.reload()},5000)
        }
      });


    })
  }

  openModal(data) {
    console.log('data',data)
    this.setState({modalIsOpen: true, tv: data});
  }

  closeModal() {
    this.setState({modalIsOpen: false, tv:''});
  }


  renderModal(){

    if(this.state.tv === ''){
      return null
    }

    return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal.bind(this)}
      style={modalStyle}>
        <h2>Desea eliminar la serie {this.state.tv.nombre} Season {this.state.tv.temporada}?</h2>
        <div className="buttons">
            <button className="cancel" onClick={this.closeModal.bind(this)}>Cancelar</button>
            <button className="submit" onClick={this.remove.bind(this)}>Eliminar</button>
        </div>
      </Modal>
    )

  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  render() {
    const { TV } = this.props



    if(TV.length > 0){
      this.state.TV = TV;
      if (this.state.searchTerm.length > 0) {
        var filters = ['nombre'];
        this.state.TV = this.state.TV.filter(this.refs.search.filter(filters));
      }
      var list = this.state.TV.map((TV, i) => {
        var episodios = (
          <div className="diccionarios">
              <button onClick={this.episodios.bind(this, TV.id)}>EPISODIOS</button>
          </div>
        )
        return (
          <ListItem key={TV.id} data={TV} palabras={episodios} modify={this.modifyTV.bind(this)} openModal={this.openModal.bind(this,TV)}/>
        );

      });

    }
    return(
        <div id='films' className="films">
        <SearchInput className='search-input' ref='search' onChange={this.searchUpdated.bind(this)} placeholder='Buscar...' />
          <div className="filmButton">
            <button className="addFilm" onClick={this.addTV.bind(this)}>ADD TV</button>
            <button onClick={this.syncData.bind(this)}> SYNC DATA</button>
            <button onClick={this.syncDataEpisodes.bind(this)}> SYNC DATA EPISODES</button>

          </div>
            {list}
            {this.renderModal()}
        </div>
    )
 }
}
function mapStateToProps(state) {
  return { TV: state.TV }
}
export default connect(mapStateToProps)(TV)
