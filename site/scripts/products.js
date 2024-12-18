export async function getProducts() {
    const productsResponse = await fetch("data/products.json");
    const products = await productsResponse.json();
  
    return products;
}