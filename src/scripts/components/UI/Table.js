import React from 'react';
import ReactDOM from 'react-dom';
import { orderBy } from 'lodash';
const Table = require('reactabular').Table;
const Search = require('reactabular').Search;
const Paginator = require('react-pagify');
const sortColumn = require('reactabular').sortColumn;
const ColumnNames = require('reactabular').ColumnNames;

const cx = require('classnames');




class UITable extends React.Component {
  constructor(props){
    super(props);
    this.state = { columns: this.props.columns,
                   data: this.props.data,
                   pagination: this.props.pagination,
                   search:this.props.search,
                   header: {
                    onClick: (column) => {
                        sortColumn(
                            this.props.columns,
                            column,
                            this.setState.bind(this)
                        );
                    },
                    className: cx(['header-table'])

                },
                sortingColumn: null // reference to sorting column

  };
 }

 onSearch(search) {
   this.setState({
       search: search
   });
 }
 onSelect(page) {
    let pagination = this.state.pagination || {};

    pagination.page = page;

    this.setState({
        pagination: pagination
    });
}

onPerPage(e) {
    let pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
        pagination: pagination
    });
}

columnFilters() {
        const headerConfig = this.state.header;
        const columns = this.state.columns;
        // if you don't want an header, just return;
        return(
          <thead>
            <ColumnNames config={headerConfig} columns={columns} />
          </thead>
        );
 }


  render(){
      let dataPagination = this.props.data;
      let pagination = this.props.pagination;
      let header = this.state.header;


      if (this.state.search.query) {
        // apply search to data
        // alternatively you could hit backend `onChange`
        // or push this part elsewhere depending on your needs
        dataPagination = Search.search(
            this.state.data,
            this.props.columns,
            this.state.search.column,
            this.state.search.query
        );


      }
      dataPagination = sortColumn.sort(dataPagination, this.state.sortingColumn, orderBy);


      let paginated = Paginator.paginate(dataPagination, pagination);

    let headers = this.columnFilters.bind(this);
    return (
      <div>
      <div className="per-page-container">
                        Per page <input type="text" defaultValue={pagination.perPage} onChange={this.onPerPage.bind(this)}/>
      </div>
        <div className="search-container">
                Search <Search ref="search" columns={this.props.columns} data={this.state.data} onChange={this.onSearch.bind(this)}/>
        </div>
          <Table columnNames={headers} columns={this.props.columns} data={paginated.data} />
          <div className="pagination">
              <Paginator
                  page={paginated.page}
                  pages={paginated.amount}
                  beginPages={3}
                  endPages={3}
                  onSelect={this.onSelect.bind(this)}/>
          </div>
      </div>

    );
  }
}

export default UITable;
