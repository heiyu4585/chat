var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

var ProductRow = React.createClass({
  render: function () {
    var name = this.props.product.stocked ? this.props.product.name :
      //样式写法
      <span style={{color:'red'}}> {this.props.product.name} </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
});

var SearchBar = React.createClass({
  handleChange:function(){
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function () {
    return (
      <form action="">
        <input type="text"
               value={this.props.filterText}
               ref="filterTextInput"
               onChange ={this.handleChange}/>

        <p>
          <input type="checkbox"
                  checked={this.props.inStockOnly}
                  ref="inStockOnlyInput"
            />
          Only show products in stock
        </p>
      </form>
    )
  }
});

//表头
var ProductCategoryRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td colSpan="2">{this.props.category}</td>
      </tr>
    )
  }
});

var ProductTable = React.createClass({

  render: function () {
    var lastcategory = null;
    var rows = [];
    var filterText = this.props.filterText;
    this.props.products.forEach(function (ele, index) {
      if (ele.name.indexOf(filterText) === -1) {
        return;
      }
      if (ele.category != lastcategory) {
        rows.push(<ProductCategoryRow category={ele.category} key={index}/>)
      }
      rows.push(<ProductRow product={ele} key={ele.name}/>);
      lastcategory = ele.category;
    });
    return (
      <table>
        <thead>
        <tr>
          <td>name</td>
          <td>price</td>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    )
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function () {
    return (  {
      filterText: "",
      inStockOnly: false
    })
  },
  handleUserInput:function(filterText, inStockOnly){
  this.setState({
    filterText: filterText,
    inStockOnly: inStockOnly
  })
  },
  render: function () {
    return (
      //只能有一个根元素
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
          />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          />
      </div>
    )
  }
});
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS}/>,
  document.getElementById('container')
);
