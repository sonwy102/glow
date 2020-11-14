// Page to display individual search result's details
// TODO: show the search result's info (brand, name, photo, ingredients, etc.)
// // TODO: get search result (name) from searchResults
// // TODO: query db for details and more info of the product/brand/ingredient

const ProductDetails = () => {
  const history = useHistory();
  const urlParamsStr = history.location.search;
  const searchParams = new URLSearchParams(urlParamsStr);

  const [searchDetails, setSearchDetails] = React.useState([]);

  const searchResultDetails = () => {
    const formData = {
      category: searchParams.get("category"),
      pid: searchParams.get("pid"),
    };

    $.get("/search-result-details.json", formData, (res) => {
      setSearchDetails(res);
    });
  };

  React.useEffect(() => {
    searchResultDetails();
  }, []);

  console.log(searchDetails)

  //TODO: fix useEffect not loading before rendering html issue

  return (
    <div className="search-result-details-page">
      <ul className="details-info">
        {/* <li>{searchDetails[0].name}</li>
        <li>{searchDetails[0].photo}</li> */}
        <li>test</li>
      </ul>
    </div>
  );
};
