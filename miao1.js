var Botton = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1
    }
  },

  componentDidMount: function (eve) {
    var opacity= this.state.opacity;
    this.timer = setInterval(function(){
      opacity-=.05;
      if(opacity<0.1){
        opacity =1
      };
      this.setState({
        opacity:opacity
      })
    },100)

  },
  render: function () {

    return (
      <div style={{opacity:opacity}}>
        hello {this.props.name}
      </div>
    )
  }
});

ReactDOM.render(
  <Botton name="world"/>,
  document.getElementById("container")
)
