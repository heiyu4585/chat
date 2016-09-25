var Botton = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1
        }
    },

    componentDidMount: function (eve) {
        var opacity = this.state.opacity;
        var _this = this;
        this.timer = setInterval(function () {
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1
            }
            _this.setState({
                opacity: opacity
            })
        }, 100)

    },
    render: function () {
        var opacity = this.state.opacity;
        console.log(opacity);
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
