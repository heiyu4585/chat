/**
 * Created by 王 on 2016/10/18.
 */
var user = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
var UserList = React.createClass({
    //getInitialState: function () {
    //    return (  {
    //        filterText: "",
    //        inStockOnly: false
    //    })
    //},
    //handleUserInput:function(filterText, inStockOnly){
    //    this.setState({
    //        filterText: filterText,
    //        inStockOnly: inStockOnly
    //    })
    //},

    render: function () {
       var userList= this.props.user.map(function (ele, index) {
           console.log(ele.category);

            if(index==0){
                return  <a href="#" class="list-group-item active">{ele.category}</a>
            }else{
                return  <a href="#" class="list-group-item">{ele.category}</a>
            }

        });
        return (
            //只能有一个根元素
            <div>
                {userList}
            </div>

        )
    }
});
ReactDOM.render(
    <UserList user={user}/>,
    document.getElementById('userList')
);
