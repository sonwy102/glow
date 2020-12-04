const ProductSearch = (props) => {
  
  const history = useHistory();

  const handleInputChange = (evt) => {
      const name = evt.target.name;
      const value = evt.target.value;
      props.setSearchParams((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    history.push(
      `/productsearch?term=${props.searchTerms}`
    );
    
    //TODO: reset searchState after user submits form
  }

  return (
    <div>
      <Form inline className="product-search-form" onSubmit={handleSubmit}>
        <Form.Label htmlFor="search-field" className="sr-only">
          Product Search
        </Form.Label>
        <Form.Control
          name="product-search"
          className="mb-2 mr-sm-2"
          id="search-field"
          placeholder="Search for a product"
          required
          onChange={handleInputChange}
        >
        </Form.Control>

        <Button variant="dark" type="submit" className="mb-2">
          Search
        </Button>
      </Form>
    </div>
  );
}