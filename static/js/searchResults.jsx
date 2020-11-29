const SearchResults = (props) => {
  // // TODO: show a list of results returned from productSearch
  // // TODO 0: render when redirected from productSearch
  // // TODO 1: get search terms from productSearch.jsx and query db for search terms
  // // TODO 2: format what the list will look like (just include name for now)
  // // TODO 3: return results in a list
  // // TODO 4: link each item to product details page
  
  const history = useHistory();
  const [searchResults, setSearchResults] = React.useState({'category': 'loading...', 'searchData': 'loading...'});

  const fetchSearchResults = async () => {
    fetch(`/product-search.json/${props.category}/${props.searchTerms}`)
    .then((response) => response.json())
    .then((data) => {
      setSearchResults(data);
    });
  }

  React.useEffect(() => {
    fetchSearchResults(); 
  }, []);

  const redirectToProductDetails = (resultKey) => {
    console.log(resultKey);
    history.push(
      `/details?category=${searchResults.category}&resultId=${searchResults.searchData[resultKey].id}`
    );
  };

  return (
      <div className="search-results-page">
        <div className="header">
          <h3>Search Results</h3>
          <div>Total: {searchResults.length} result(s)</div>
          {Object.keys(searchResults.searchData).map((resultKey) => (
            <li>
              <Button
                variant="outline-secondary"
                onClick={() => redirectToProductDetails(resultKey)}
              >
                {searchResults.searchData[resultKey].name}
              </Button>
              
              <Image
                cloudName="sonwy102"
                publicId={searchResults.searchData[resultKey].photo}
                width="200"
                crop="scale"
                type="fetch"
              ></Image>
            </li>
          ))}
        </div>
      </div>
  );
}