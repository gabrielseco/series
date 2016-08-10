import React from 'react';
import Vibrant from 'node-vibrant';


const claves = ["Muted","DarkVibrant","DarkMuted","LightVibrant","LightMuted"];

 function  getTypes(data, cb){
  let array = [];
  Vibrant.from(data).getPalette((err, palette) => {
    for(let i = 0; i < claves.length; i++){
      array.push(palette[claves[i]].getHex());
    }
    cb( array);
});
}

function getStyle(color){
  return {
    background:color,
    color:'#fff'
  };
}

class Colors extends React.Component {
  constructor(props){
    super(props);
    this.state = {colors: ''};
  }

  componentWillMount(){
    getTypes(this.props.data, res => {
      this.setState({colors: res});
    });
  }

  render(){

    if(this.state.colors > '') {

      return (
        <div>{this.state.colors.map((color, i) => {
          return (<button style={getStyle(color)} key={i} onClick={this.props.changeColor}>{color}</button>);
        })}
        </div>
      );

    }
    return(<div></div>);

  }

}
export default Colors;
