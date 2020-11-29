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
      `/productsearch?category=${props.category}&term=${props.searchTerms}`
    );
    
    //TODO: reset searchState after user submits form
    // setSearchState({
    //   'search-category': '',
    //   'product-search': null
    // });
    // console.log(searchState)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="product-search-form">
        <div className="form-group">
          <label htmlFor="search-category" className="sr-only">
            Search Category
          </label>
          {/* ways to make this dropdown menu better? */}
          <select
            id="search-category"
            name="search-category"
            onChange={handleInputChange}
            required
          >
            <option value="DEFAULT" disabled selected>
              I'm looking for...
            </option>
            <option value="Product">Product</option>
            <option value="Brand">Brand</option>
            <option value="Ingredient">Ingredient</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="search-field" className="sr-only">
            Product Search
          </label>
          <input
            name="product-search"
            className="form-control input-lg"
            placeholder="Product name, brand, ingredients..."
            required
            autoFocus
            onChange={handleInputChange}
          ></input>
        </div>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}