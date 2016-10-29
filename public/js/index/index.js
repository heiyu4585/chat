var ChatLi = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">{this.props.name} : {this.props.chat}</li>
        )
    }
});

var ChatList = React.createClass({
    render: function () {
        var key = 1;
        var chatNodes = this.props.data.map(function (ele) {
            return (
                <ChatLi key={key++} id={ele._id} chat={ele.chat} name={ele.name}/>
            )
        });
        return (
            <ul className="list-group">
                {chatNodes}
            </ul>
        )
    }
});

var ChatForm = React.createClass({
    handleSubmit:function(e){
        e.preventDefault();
        var content = ReactDOM.findDOMNode(this.refs.chat).value.trim();
        //var id = ReactDOM.findDOMNode(this.refs.id).value.trim();
        //var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        var userId= $("#userInfo h4").data("id").trim();
        var userName = $("#userInfo h4").text().trim();
        if(content.trim()){
            this.props.onChatSubmit({content:content,userId:userId,userName:userName});
            ReactDOM.findDOMNode(this.refs.chat).value = "";
        }
    },
    render: function () {
        return (
            <div className="input-group">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" ref="chat" id="userInput"/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit" id="userSubmit">Go!</button>
                    </span>
                </form>
            </div>
        )
    }
});
var ChatBox = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        this.loadChatList();
    },
    loadChatList: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleChatSubmit: function (obj) {
        iosocket.send(obj);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'get',
            data: obj,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <ChatList data={this.state.data}/>
                <ChatForm userId ={this.props.userId} userName={this.props.userName} onChatSubmit={this.handleChatSubmit}/>
            </div>
        )
    }
});

ReactDOM.render(
    <ChatBox url="/index/chatList" pollInterval={2000} />, document.getElementById("EV-chatList")
);