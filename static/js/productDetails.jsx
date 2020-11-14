// Page to display individual search result's details
// TODO: show the search result's info (brand, name, photo, ingredients, etc.)
// TODO: get search result (name) from searchResults
// TODO: query db for details and more info of the product/brand/ingredient

const ProductDetails = () => {
    
    const history = useHistory();
    const urlParamsStr = history.location.search;
    const searchParams = new URLSearchParams(urlParamsStr);
    const [searchDetails, setSearchDetails] = React.useState(null)

    const searchResultDetails = () => {
      const formData = {
        category: searchParams.get("category"),
        pid: searchParams.get("pid")
      };

      console.log(formData);

      $.get("/search-result-details.json", formData, (res) => {
        setSearchDetails(res);
      });

      console.log(searchDetails);
    };

    searchResultDetails();

    return (
        <div>hi</div>
    )
}