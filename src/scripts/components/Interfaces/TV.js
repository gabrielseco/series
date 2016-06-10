import React from 'react';
import DocumentTitle from 'react-document-title';
import {getAllTV, deleteTV} from '../../actions';
import { connect } from 'react-redux';
import ListItem from '../Dumb/ListItem';
import SearchInput from 'react-search-input';
import Modal from 'react-modal';
import MessageInfo from '../UI/MessageInfo';
import Loading from '../UI/Loading';
import Paginator from 'react-pagify';

const modalStyle = {
  content : {
    height: '20%'
  }
};


class TV extends React.Component {

  constructor(props,context) {
    super(props, context);
    this.state = {modalIsOpen: false, tv: '', searchTerm: '', series: null, pagination:{ page: 0, perPage: 10 }};
  }
  componentDidMount(){
    const {dispatch } = this.props;

    dispatch(getAllTV(TV => {
      this.setState({
        series: TV
      });
    }));


  }

  onSelect(page) {
     let pagination = this.state.pagination || {};

     pagination.page = page;

     this.setState({
         pagination: pagination
     });
 }

 onPerPage(e) {
     let pagination = this.state.pagination || {};

     pagination.perPage = parseInt(event.target.value, 10);

     this.setState({
         pagination: pagination
     });
 }

  addTV(){
    this.context.router.push('/addTV');

  }
  modifyTV(data){
    this.context.router.push('/modifyTV/'+data.id);
  }

  remove(){
    const { dispatch } = this.props;

    dispatch(deleteTV(this.state.tv.id , res => {
      location.reload();
    }));

  }

  episodios(id){
    this.context.router.push('/episodes/'+id);
  }


  openModal(data) {
    this.setState({modalIsOpen: true, tv: data});
  }

  closeModal() {
    this.setState({modalIsOpen: false, tv:''});
  }


  renderModal(){

    if(this.state.tv === ''){
      return null;
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
    );

  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  render() {
    let message, list = null;
    let _series = this.state.series;


    if(this.state.series !== null){
      message = this.renderMessage(this.state.series);

      if (this.state.searchTerm.length > 0) {
        const filters = ['nombre'];
        _series = this.state.series.filter(this.refs.search.filter(filters));
      }

      if(_series.length > 0){
        _series = Paginator.paginate(_series, this.state.pagination);

        list = _series.data.map((TV, i) => {
          const episodios = (
            <div className="diccionarios">
                <button onClick={this.episodios.bind(this, TV.id)}>EPISODIOS</button>
            </div>
          );
          return (
            <ListItem key={TV.id} data={TV} palabras={episodios} modify={this.modifyTV.bind(this)} openModal={this.openModal.bind(this,TV)}/>
          );

        });
      }

      return(
          <div>
            <DocumentTitle title="TV"/>
            {message}
            {this.renderList(list, _series)}
            {this.renderModal(this.state.TV)}
          </div>
      );

    } else {
      return(<Loading/>);
    }

 }
 renderMessage(series){
    if(series.status == undefined)
       return null;

    return <MessageInfo statusCode={series.status}/>;
 }

 renderSearch(){
   return (
     <div className="search-input">
       <div className="search-wrapper">
         <span className="search-icon">⚲</span>
         <SearchInput ref="search" className="search-field" onChange={this.searchUpdated.bind(this)} placeholder="Buscar..." autoFocus />
       </div>
     </div>
   );
 }

 renderList(list, series){
   if(series.status !== 0){
     return (
       <div id="films" className="films">
        {this.renderSearch()}
         <div className="filmButton">
           <button className="addFilm" onClick={this.addTV.bind(this)}>ADD TV</button>
         </div>
           {list}
           <br/>
           <div className="pagination">
               <Paginator
                   page={series.page}
                   pages={series.amount}
                   beginPages={3}
                   endPages={3}
                   onSelect={this.onSelect.bind(this)}/>
           </div>
       </div>
     );
   }
 }
}

TV.contextTypes =  {
  router: React.PropTypes.object.isRequired
};

export default connect()(TV);
