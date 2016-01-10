import React from 'react';
import FormWords from './FormWords';


var fieldValues = {
  idPelicula: '',
  idSerie: '',
  idEpisodio: '',
  idLibro: '',
  english:'',
  spanish: ''
}


class AddWords extends React.Component {

  constructor(props){
    super(props)
    this.state = {form: ''}
  }

  componentDidMount(){
    var idPelicula = +this.props.params.pelicula;
    if(idPelicula !== undefined){
      fieldValues.idPelicula = idPelicula;
      this.setState({
        form: 1
      })
    }

  }

  render(){
    switch(+this.state.form){
      case 1:
        return <FormWords {...this.props} fieldValues={fieldValues}/>
    }

    return <div></div>
  }

}

export default AddWords
