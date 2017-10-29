// @flow
import React from 'react';
import { add } from '../../lib/sails';
import shared from '../../api/shared';

type State = {
  english: string;
  spanish: string;
}

type Props = {
  fieldValues: {
    idPelicula: number,
    idSerie: number,
    idLibro: number,
    idEpisodio: number,
  },
  finalizar: Function
}


class FormWords extends React.Component<Props, State> {
  state: State;
  englishInput: any;
  EMPTY_STRING: string = '';
  
  constructor(props: Props){
    super(props);
    this.state = {
      english: '',
      spanish: ''
    };
  }

  componentDidMount(){
    this.englishInput.focus();
  }

  checkObject(data: any){

    let obj = {};

    Object.keys(data).map((value) => {
      if(data[value] === this.EMPTY_STRING){
        delete data[value];
      }
    });

    return data;

  }

  fixGrammar(value: string){
    value = value.trim();
    value = value.charAt(0).toUpperCase() + value.slice(1);

    return value;
  }

  handleForm(evt: any){
    evt.preventDefault();

    let data = {
      english: this.fixGrammar(this.state.english),
      spanish: this.fixGrammar(this.state.spanish),
      peliculas: this.props.fieldValues.idPelicula,
      series: this.props.fieldValues.idSerie,
      episodios: this.props.fieldValues.idEpisodio,
      libros: this.props.fieldValues.idLibro

    };

    data = this.checkObject(data);


    add('dictionary', data, response => {
      console.log('response',response);


    }).catch(error => {
      if(error){
        const $query = {
          english: data.english,
          spanish: data.spanish
        };


        let $where = "?where="+JSON.stringify($query);



        shared.findWhere('dictionary', $where,  words => {
          console.log('words',words);
          const errorData = {
            word: words[0].id
          };
          add('repeatedwords', errorData, repeatedWord => {

          });
        });
      }
    });

    this.setState({
      english: '',
      spanish: ''
    });
    
    this.englishInput.focus();
  }

  onChange(evt: any) {
    const { name, value } = evt.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  render() {
    return (
      <form onSubmit={this.handleForm.bind(this)} id="addFilm" role="form">
        <input ref={input => this.englishInput = input} type="text" value={this.state.english} name="english" required placeholder="English" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
        <input type="text" value={this.state.spanish} name="spanish" required placeholder="Español" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
        <input type="submit" value="Siguiente"></input>
        <input type="button" value="Finalizar" onClick={this.props.finalizar.bind(this)}></input>
      </form>
    );
  }

}

export default FormWords;
