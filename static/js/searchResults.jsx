const SearchResults = () => {
  // // TODO: show a list of results returned from productSearch
  // // TODO 0: render when redirected from productSearch
  // // TODO 1: get search terms from productSearch.jsx and query db for search terms
  // // TODO 2: format what the list will look like (just include name for now)
  // // TODO 3: return results in a list
  // // TODO 4: link each item to product details page
  
  const history = useHistory();
  const [searchResults, setSearchResults] = React.useState([]);
  const urlParamsStr = history.location.search;
  const searchParams = new URLSearchParams(urlParamsStr)

  const fetchSearchResults = async () => {
    fetch(
      `/product-search.json/${searchParams.get("category")}/${searchParams.get("term")}`
    )
      .then((response) => response.json())
      .then((data) => {
        const newSearchResults = [];
        for (const searchResult of data) {
          newSearchResults.push(searchResult);
        }
        setSearchResults(newSearchResults);
      });
  }

  React.useEffect(() => {
    fetchSearchResults(); 
  }, []);

  const renderProductDetails = (evt) => {
    evt.preventDefault();
    history.push(
      `/details?category=${searchResults[0].category}&pid=${searchResults[0].id}`
    );
  };

  return (
    <div className="search-results-page">
      <div className="header">
        <h3>Search Results</h3>
        <div>Total: {searchResults.length} result(s)</div>
        {searchResults.map((result) => (
          <li>
            <Link to='/details' onClick={renderProductDetails}>{result.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}