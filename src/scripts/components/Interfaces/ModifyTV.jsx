import React from 'react';
import { connect } from 'react-redux';
import {modifyTV, getOneTV} from '../../actions'



class ModifyTV extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''}
  }

  componentDidMount(){
    console.log(this.props.params.id)

    const { dispatch } = this.props;

    dispatch(getOneTV(this.props.params.id, res => {
      console.log('res ModifyTV',res)
      this.setState({data: res});
    }))

  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      imagen: this.refs.imagen.value,
      temporada: this.refs.temporada.value
    }

    console.log('obj ModifyTV',obj)

    const { dispatch } = this.props;

    dispatch(modifyTV(obj, res => {
      console.log('res modify TV',res);
      this.props.history.push('/tv')
    }));



  }

  render() {
    if(this.state.data !== ''){
    return(
      <div>
        <img className='img' src={this.state.data.imagen} width="230" height="345"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">Nombre</label>
                  <input ref="name" className={this.state.inputName} defaultValue={this.state.data.nombre} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
                  <input ref="temporada" className={this.state.inputName} defaultValue={this.state.data.temporada} type="text" name="temporada" required placeholder="Temporada" autoComplete="off"></input>
                  <textarea ref="overview" className={this.state.inputName} defaultValue={this.state.data.overview}  name="overview" required placeholder="Descripcion" autoComplete="off"></textarea>
                  <input ref="imagen" className={this.state.inputName} defaultValue={this.state.data.imagen} type="text" name="ref" required placeholder="Imagen" autoComplete="off"></input>

                  <input type="submit" value="Enviar"></input>
          </form>
        </div>
    )
  } else {
    return (<div></div>)
  }
 }
}


export default connect()(ModifyTV)
