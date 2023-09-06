import { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      async function fetchProducts() {
        try {
          const response = await fetch('http://localhost:3000/get-all-products');

          if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
          }

          const data = await response.json();
          
          setProducts(data);
          console.log(data);
          
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchProducts();
    }, []);
  
    return (
      <div>
        <ul>
          {products.map(product => (
          
            
            <li key={product.id}>{product.name}</li>
            
          ))}
        </ul>
      </div>
    );
}

export default ProductList