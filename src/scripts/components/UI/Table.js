import React from 'react';
import ReactDOM from 'react-dom';
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
var sortColumn = require('reactabular').sortColumn;


class UITable extends React.Component {
  constructor(props){
    super(props)
    this.state = { columns: this.props.columns,
                   data: this.props.data,
                   pagination: this.props.pagination,
                   search:this.props.search,
                   header: {
                    onClick: (column) => {
                    sortColumn(
                        this.state.columns,
                        column,
                        this.setState.bind(this)
                    );
                  }

                }
  }
 }

 componentDidMount(){
   }

 onSearch(search) {
   this.setState({
       search: search
   });
 }
 onSelect(page) {
    var pagination = this.state.pagination || {};

    pagination.page = page;

    this.setState({
        pagination: pagination
    });
}

onPerPage(e) {
    var pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
        pagination: pagination
    });
}

  render(){
      var dataPagination = this.props.data;
      var pagination = this.props.pagination;
      var header = this.state.header;

      if (this.state.search.query) {
        // apply search to data
        // alternatively you could hit backend `onChange`
        // or push this part elsewhere depending on your needs
        dataPagination = Search.search(
            this.state.data,
            this.state.columns,
            this.state.search.column,
            this.state.search.query
        );


      }

      dataPagination = sortColumn.sort(dataPagination, this.state.sortingColumn);


      var paginated = Paginator.paginate(dataPagination, pagination);


    return (
      <div>
      <div className='per-page-container'>
                        Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage.bind(this)}></input>
      </div>
        <div className='search-container'>
                Search <Search ref="search" columns={this.state.columns} data={this.state.data} onChange={this.onSearch.bind(this)}></Search>
        </div>
          <Table columns={this.props.columns} data={paginated.data} header={header}></Table>
          <div className='pagination'>
              <Paginator
                  page={paginated.page}
                  pages={paginated.amount}
                  beginPages={3}
                  endPages={3}
                  onSelect={this.onSelect.bind(this)}>
             </Paginator>
          </div>
      </div>

    )
  }
}

export default UITable
