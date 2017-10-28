import React from 'react';
import { connect } from 'react-redux';
import { modifyBook, getOneBook } from '../../actions';
import { mouseTrap } from 'react-mousetrap';
import utils from 'styles/_utils.scss';
import type { Book } from './../../types/App';

type State = {
  data: Book
}

type DefaultProps = {
  data: ?Book
}

class ModifyBook extends React.Component<DefaultProps, void, State > {
  state: State;

  static defaultProps = {
    data: undefined
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        airdate: '',
        color: '',
        imagen: '',  
        nombre: '',
        overview: '',
        youtube: ''
      }
    };
  }

  componentDidMount(){
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          ...this.props.book
        }
      };
    });
  }

  handleForm(e){
    e.preventDefault();

    let obj: Book = Object.assign({}, this.state.data, {
      id: this.props.params.id  
    });

    const { dispatch } = this.props;

    dispatch(modifyBook(obj, res => {
      this.props.history.goBack();
    }));

  }

  onChange(evt){
    const { name, value } = evt.target;
    this.setState(prevState => {
      return {
        ...prevState,
        data: {
          ...prevState.data,          
          [name]: value          
        }
      };
    });
  }

  render() {
    if(this.state.data !== undefined){
      return(
        <div>
          <img ref="imagen" className={utils.pull__left} src={this.state.data.imagen} width="230" height="345"/>
            <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
              <label className="is-required">Nombre</label>
              <input type="text" name="nombre" required placeholder="Nombre"
                     value={this.state.data.nombre} onChange={(evt) => this.onChange(evt)}></input>
              <label>Youtube</label>
              <input type="text" name="youtube" placeholder="Youtube"
                     value={this.state.data.youtube} onChange={(evt) => this.onChange(evt)}></input>
              <label className="is-required">Imagen</label>
              <input type="text" name="imagen" required placeholder="Imagen"
                      value={this.state.data.imagen} onChange={(evt) => this.onChange(evt)}></input>
              <label className="is-required">Fecha</label>
              <input type="text" name="airdate" required placeholder="Fecha"
                              value={this.state.data.airdate} onChange={(evt) => this.onChange(evt)}></input>
              <label className="is-required">Descripción</label>
              <textarea name="overview" value={this.state.data.overview} onChange={(evt) => this.onChange(evt)}></textarea>
              <input value={this.state.data.color} type="text" name="color" placeholder="Color" autoComplete="off" onChange={(evt) => this.onChange(evt)}></input>
              <input type="submit" value="ENVIAR"/>
            </form>
          </div>
      );
    } else {
    return (<div></div>);
   }

  }
}

function mapStateToProps(state, props) {
  const id = parseInt(props.params.id, 10);
  return { book: state.books.find(book => book.id === id) };
}

export default connect(mapStateToProps)(ModifyBook);
