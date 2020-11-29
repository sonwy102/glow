// Page to display individual search result's details
// TODO: show the search result's info (brand, name, photo, ingredients, etc.)
// // TODO: get search result (name) from searchResults
// // TODO: query db for details and more info of the product/brand/ingredient

const ProductDetails = ({location}) => {
  
  const searchParams = new URLSearchParams(location.search);
  const [searchDetails, setSearchDetails] = React.useState({'id': 'loading...', 'resultId': 'loading...'});
  
  const fetchResultDetails = async () => {
    fetch(`/search-result-details.json/${searchParams.get("category")}/${searchParams.get("resultId")}`)
    .then(response => response.json())
    .then(data => {
      setSearchDetails(data);
    })
  }

  React.useEffect(() => {
    fetchResultDetails();
  }, []);

  return (
    <div className="search-result-details-page">
      <ul className="details-info">
        <li>{searchDetails.id}</li>
        <li>{searchDetails.name}</li>
        <Image
          cloudName="sonwy102"
          publicId={searchDetails.photo}
          width="200"
          crop="scale"
          type="fetch"
        ></Image>
        <li>{searchDetails.brand_id}</li>
      </ul>
    </div>
  );
};
