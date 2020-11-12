const SearchResults = () => {
  //TODO: show a list of results returned from productSearch
  //TODO 0: render when redirected from productSearch
  //TODO 1: get result from productSearch.jsx
  //TODO 2: format what the list will look like (just include name for now)
  //TODO 3: return results in a list
  //TODO 4: link each item to product details page
  const history = useHistory();
//   const urlParams = useParams();
  const urlParamsStr = history.location.search;
  const searchParams = new URLSearchParams(urlParamsStr)

  



  
  
  const searchProduct = () => {

    const formData = {
      search_category: searchParams.get("category"),
      product_search: searchParams.get("term")
    };
    console.log(formData);

    $.get("/product-search.json", formData, (res) => {
      console.log(res);
    });
  };



  return (
      <div>hi</div>
  )
}