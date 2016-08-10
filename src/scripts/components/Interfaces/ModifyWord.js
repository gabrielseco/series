import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import {modifyWord, getOneWord} from '../../actions';



class ModifyWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {inputName: '', data: ''};
  }

  componentWillMount(){

    const { dispatch } = this.props;

    dispatch(getOneWord(this.props.params.id, res => {
      this.setState({data: res});
    }));

  }

  handleForm(e){
    e.preventDefault();

    const obj = {
      id: this.props.params.id,
      spanish: this.refs.spanish.value,
      english: this.refs.english.value
    };

    const { dispatch } = this.props;

    dispatch(modifyWord(obj, res => {
      this.props.history.goBack();
    }));



  }

  render() {
    if(this.state.data !== ''){
    return(
      <div>
        <DocumentTitle title="Modify Word"/>
          <form onSubmit={this.handleForm.bind(this)} id="addFilm" method="post" role="form">
                  <label className="is-required">English</label>
                  <input ref="english" className={this.state.inputName} defaultValue={this.state.data.english} type="text" name="english" required placeholder="English" autoComplete="off"></input>
                  <label className="is-required">Spanish</label>
                  <input ref="spanish" className={this.state.inputName} defaultValue={this.state.data.spanish} type="text" name="spanish" required placeholder="Spanish" autoComplete="off"></input>
                  <input type="submit" value="Enviar"></input>
          </form>
        </div>
    );
  } else {
    return (<div></div>);
  }
 }
}


export default connect()(ModifyWord);
