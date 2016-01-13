import React from 'react';
import { connect } from 'react-redux';
import {modifyWord, getOneWord} from '../../actions'



class ModifyWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''}
  }

  componentDidMount(){
    console.log(this.props.params.id)

    const { dispatch } = this.props;

    dispatch(getOneWord(this.props.params.id, res => {
      console.log('res Modify Word',res)
      this.setState({data: res});
    }))

  }

  handleForm(e){
    e.preventDefault();

    var obj = {
      id: this.props.params.id,
      spanish: this.refs.spanish.value,
      english: this.refs.english.value,
    }

    console.log('obj ModifyTV',obj)

    const { dispatch } = this.props;

    dispatch(modifyWord(obj, res => {
      console.log('res modify WORD',res);
      this.props.history.push('/diccionarios_pelicula/'+this.state.data.peliculas.id);
    }));



  }

  render() {
    if(this.state.data !== ''){
    return(
      <div>
        <img className='img' src={this.state.data.peliculas.imagen} width="230" height="345"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">English</label>
                  <input ref="english" className={this.state.inputName} defaultValue={this.state.data.english} type="text" name="english" required placeholder="English" autoComplete="off"></input>
                  <label className="is-required">Spanish</label>
                  <input ref="spanish" className={this.state.inputName} defaultValue={this.state.data.spanish} type="text" name="spanish" required placeholder="Spanish" autoComplete="off"></input>
                  <input type="submit" value="Enviar"></input>
          </form>
        </div>
    )
  } else {
    return (<div></div>)
  }
 }
}


export default connect()(ModifyWord)