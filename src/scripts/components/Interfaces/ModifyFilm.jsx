import React from 'react';
import { connect } from 'react-redux';
import {modifyFilm, getOneFilm} from '../../actions'



class ModifyFilm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''}
  }

  componentDidMount(){
    console.log(this.props.params.id)

    const { dispatch } = this.props;

    dispatch(getOneFilm(this.props.params.id, ((res) => {
      console.log('res ModifyFilm',res)
      this.setState({data: res});
    })))

  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      id: this.props.params.id,
      nombre: this.refs.name.value,
      overview: this.refs.overview.value,
      imagen: this.refs.imagen.value
    }

    console.log('obj ModifyFilm',obj)

    const { dispatch } = this.props;

    dispatch(modifyFilm(obj, ( (res) => {
      console.log('res modify FILM',res);
      this.props.history.push('/')
    })));



  }

  render() {
    if(this.state.data !== ''){
    return(
      <div>
        <img className='img' src={this.state.data.imagen} width="230" height="345"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">Nombre</label>
                  <input ref="name" className={this.state.inputName} defaultValue={this.state.data.nombre} type="text" name="name" required placeholder="Nombre" autoComplete="off"></input>
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


export default connect()(ModifyFilm)
