import React, { Component } from "react";
import {useParams} from "react-router-dom";

function ProductAtId() {
  let {id} = useParams();
  return   <h1>Product Details - {id}</h1>;
}
class ProductDetails extends Component {
  
  handleSave = () => {
    // Navigate to /products
  };
  
  render() {
    
    return (
      <div>
         <ProductAtId  />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default ProductDetails;
