// @flow
import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { addOneFilm } from '../../actions';
import type { DispatchProps, HistoryProps } from './../../types';

type State = {
  name: string,
  films: any[],
  obj: any
}

type Props = DispatchProps & HistoryProps;

class AddFilm extends React.Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      films: [], 
      obj:{},
      name: ''
    };
  }

  handleForm(e){

    e.preventDefault();

    let obj = this.state.obj;

    if(this.state.films.length === 0){
      obj.nombre = this.state.name;
    }

    const { dispatch } = this.props;


    dispatch(addOneFilm(obj, this.state.films, res => {
      if(res.id !== undefined){
        this.props.history.push('/');
      }
      this.setState({
        films: res,
        obj: res[0]
      });

    }));

  }

  updateFilm(film){
    this.setState(prevState => {
      return {
        ...prevState,
        obj: film,
        name: film.nombre        
      };
    });
  }

  onChange(evt) {
    const { name, value } = evt.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }

  render() {

    return(
      <div>
        <DocumentTitle title="ADD FILM"/>
        <form onSubmit={this.handleForm.bind(this)} role="form">
          <label className="is-required">Nombre</label>
          <input value={this.state.name} type="text" name="name" autoFocus required placeholder="Nombre" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
          <input type="submit" value="Enviar"></input>
        </form>
        <div className="films-results">
        {this.state.films.map((film, i) => {
          return(
            <img src={film.imagen} key={i} alt={film.nombre} onClick={this.updateFilm.bind(this,film)}/>
          );
        })}
        </div>
      </div>
    );
 }
}

export default connect()(AddFilm);
