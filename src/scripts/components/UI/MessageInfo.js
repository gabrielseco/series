'use strict';

import React, { PropTypes } from 'react';
const classNames = require('classnames');



class MessageInfo extends React.Component{

  constructor(props){
    super(props);
    const active = this.props.statusCode === 0 ? true : false;
    this.state = {active : active};
    this.interval = null;
  }

  componentDidMount(){
    this.interval = setInterval(()=> {
      this.setState({active: !this.state.active});
    },this.props.time);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  handleActive(){
    this.setState({
      active: false
    });
  }

  clear(){
    clearInterval(this.interval);
    this.handleActive();
  }



  renderMessage(){
    const active = classNames({
      'message-info': true
    });
    const status = this.props.statusCode === 0
                 ?
                 "No se puede establecer una conexión con el servidor" : null;


    if( this.state.active  ) {
      return(
        <div className={active} onClick={this.clear.bind(this)}>
          <div className="message-inner">
            <p>{status}</p>
          </div>
          <span className="button-close" onClick={this.handleActive.bind(this)}></span>
        </div>
      );
    }

    return null;


  }

  render(){
    return(
    <div>
      {this.renderMessage()}
    </div>
  );
  }

}

MessageInfo.propTypes = {
  statusCode: PropTypes.number.isRequired,
  time: PropTypes.number
};

MessageInfo.defaultProps  = {
  time: 1000
};


export default MessageInfo;
