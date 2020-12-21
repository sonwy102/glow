const ProductHighlights = (props) => {

  if (props.productHighlight) {
    return (
      <div className="product-highlight">
        <div className="subheader-lg center-text-align">
          {props.productHighlight.product_count} products in my routine
        </div>
        <div className="subheader center-text-align">
          {props.ingHighlight.ing_count} ingredients in my routine
        </div>

        <div className="product-photo-column">
          {Object.keys(props.productHighlight.product_data).map(
            (productName) => (
              <div className="product-img">
                <Image
                  cloudName="sonwy102"
                  publicId={props.productHighlight.product_data[productName]}
                  type="fetch"
                >
                  <Transformation height="150" width="150" crop="scale" />
                </Image>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}