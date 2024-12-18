export async function getProducts() {
  try {
    const productsResponse = await fetch("data/products.json");
    const products = await productsResponse.json();

    return products;
  } catch (error) {
    console.error("Error loading products.", error);
  }
}
