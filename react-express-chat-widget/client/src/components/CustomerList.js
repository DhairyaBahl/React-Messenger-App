class CustomerList extends Component {
    render(){
      const {customers, customerIsLoading, selectedCustomer} = this.props;
      if (customerIsLoading) {
        return (
          <div className='col-xl-12 my-auto text-center'>
            <MDSpinner size='72'/>
          </div>
        )
      }
      else {
        // simple mapping of array from props
        return (
          <ul className="list-group list-group-flush w-100">
            { 
              customers
              .map(customer => 
                <li 
                  key={customer.uid} 
                  className={
                    `list-group-item ${customer.uid === selectedCustomer ? 'active':''}`
                  } 
                  onClick={ () => this.props.selectCustomer(customer.uid) }>
                    {customer.name} 
                </li>)
            }                
          </ul>
        )
      }
    }
  }