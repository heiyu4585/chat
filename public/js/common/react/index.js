/**
 * Created by 王 on 2016/5/29.
 */
  //
  var CommentList =React.createClass({
   render:function(){
     var commentNodes = this.props.data.map(function(comment){
       return (
         <Comment author ={comment.author}>
           {comment.text}
           </Comment>
       );
     });
     return(
       <div className = "commentList">
         {commentNodes}
         </div>
     );
   }
});
var  CommentForm =React.createClass({
  handleSubmit:function(e){
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if(!text || !author){
      return;
    }
    //todo:
    this.props.onComementSubmit({author:author,text:text});
    this.refs.author.value ='';
    this.refs.text.value ='';
    return;

  },

  render:function(){
    return(
      <form className ="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="your name" ref="'author"/>
        <input type="submit" value="post" ref="text"/>
        </form>

    );
  }
});
var CommentBox =React.createClass({
 loadCommentsFromServer:function(){
   $.ajax({
     url:this.props.url,
     dataType:'json',
     cache:false,
     success:function(data){
       this.setState({data:data});
     }.bind(this),
     error:function(xhr,status,err){
       console.log(this.props.url,status,err.toString());
     }.bind(this)
   });
 },
  hendleCommentSubmit:function(comment){
    var comments= this.state.data;
    var newComments = comments.comcat([comment]);
    this.setState({data:newComments});
    $.ajax({
      url:this.props.url,
      dataType:'json',
      type:'POST',
      data:'comment',
      success:function(data){
        this.setState({data:data});
      }.bind(this),
      error:function(xhr,status,err){
        console.log(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  componentDidMount:function(){
  this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer,this.props.pollInterval);
  },
  getInitialState: function() {
    return {data: []};
  },
  render:function(){
    return(
      <div className ='CommentBox'>
       <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit ={this.handleCommentSubmit} />
       <CommentForm/>
      </div>
      );
  }
});

var Comment = React.createClass({
  rawMarkup:function(){
    var rawMarkup = marked(this.props.children.toString(),{sanitize:true});
    return {__html:rawMarkup}
  },
  render:function(){
    return (
      <div className = "comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
        {marked(this.props.children.toString())}
      </div>
    )
  }
});
// tutorial8.js
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
ReactDOM.render(
  <CommentBox url="../../react/comments.json" pollInterval="{2000}"/>,
  document.getElementById('content')
);













