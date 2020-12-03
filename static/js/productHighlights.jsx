const ProductHighlights = (props) => {


  return (
    <div className="product-highlight">
      {props.productHighlight.product_count} products in my routine
      {props.ingHighlight.ing_count} ingredients in my routine
      {Object.keys(props.productHighlight.product_data).map((productName) => (
          <li>
            {productName}: {props.productHighlight.product_data[productName]}
          </li>
      ))}

    </div>
  );

}