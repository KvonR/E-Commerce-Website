import { useState, useEffect } from 'react'
import { ProductList } from './Components/ProductList'
import itemList from './Assets/random_products_175.json';
import './e-commerce-stylesheet.css'

type Product = {
  id: number
	name: string
  price: number
  category: string
  quantity: number
  rating: number
  image_link: string
}

type BasketItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchedProducts, setSearchedProducts] = useState<Product[]>(itemList);
  const [sortKey, setSortKey] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [basket, setBasket] = useState<BasketItem[]>([]);

  useEffect(() => {
    updateSearchedProducts();
    updateResultsIndicator();
  }, [searchTerm, searchedProducts, sortKey, inStockOnly]);



  // ===== Basket management =====
  function showBasket(){
    let areaObject = document.getElementById('shopping-area');
    if(areaObject !== null){
      areaObject.style.display='block';
    }
  }

  function hideBasket(){
    let areaObject = document.getElementById('shopping-area');
    if(areaObject !== null){
      areaObject.style.display='none';
    }
  }

  // ===== Search =====
  function updateSearchedProducts() {
    let filteredProducts = itemList.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.quantity > 0);
    }

    switch (sortKey) {
      case 'ZtoA':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case '£LtoH':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case '£HtoL':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case '*LtoH':
        filteredProducts.sort((a, b) => a.rating - b.rating);
        break;
      case '*HtoL':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setSearchedProducts(filteredProducts);
  }

  function addToBasket(product: Product) {
    console.log("Trying to add to basket:", product); 
    setBasket(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        console.log("Item exists, updating quantity"); 
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        console.log("Adding new item to basket"); 
        return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }
    });
}

  function removeFromBasket(productId: number) {
    setBasket(prev => prev.reduce((newBasket, item) => {
      if (item.id === productId) {
        const newQuantity = item.quantity - 1;
        if (newQuantity > 0) {
          newBasket.push({ ...item, quantity: newQuantity });
        }
      } else {
        newBasket.push(item);
      }
      return newBasket;
    }, [] as BasketItem[]));
  }

  function calculateTotal() {
    return basket.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  function updateResultsIndicator() {
    const resultsCount = searchedProducts.length;
    const resultsIndicator = document.getElementById('results-indicator');
    if (resultsIndicator) {
      if (searchTerm === '') {
        resultsIndicator.textContent = `${resultsCount} Product${resultsCount !== 1 ? 's' : ''}`;
      } else if (resultsCount === 0) {
        resultsIndicator.textContent = 'No search results found';
      } else {
        resultsIndicator.textContent = `${resultsCount} Result${resultsCount !== 1 ? 's' : ''}`;
      }
    }
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortKey(event.target.value);
  }

  function handleInStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInStockOnly(event.target.checked);
  }
  return (
    <div id="container">
        <header className="header">
        <h1>Kev's E-Commerce Shop</h1>
        </header>
        <div id="search-bar">
            <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
            <div id="control-area">
                <select onChange={e => setSortKey(e.target.value)}>
                    <option value="AtoZ">By name (A - Z)</option>
                    <option value="ZtoA">By name (Z - A)</option>
                    <option value="£LtoH">By price (low - high)</option>
                    <option value="£HtoL">By price (high - low)</option>
                    <option value="*LtoH">By rating (low - high)</option>
                    <option value="*HtoL">By rating (high - low)</option>
                </select>
                <input id="inStock" type="checkbox" onChange={e => setInStockOnly(e.target.checked)} />
                <label htmlFor="inStock">In stock</label>
            </div>
            <button className="button" onClick={showBasket}>Show Basket</button>
            <button className="button" onClick={hideBasket}>Hide Basket</button>
        </div>
        <p id="results-indicator"></p>
        <ProductList itemList={searchedProducts} addToBasket={addToBasket} />
        <div id="shopping-area" style={{ display: 'none' }}>
            {basket.length === 0 ? (
                <p>Your basket is empty</p>
            ) : (
                basket.map(item => (
                    <div key={item.id} className="shopping-row">
                        <div className="shopping-information">
                            <p>{`${item.name} (£${item.price.toFixed(2)}) - ${item.quantity}`}</p>
                        </div>
                        <button onClick={() => removeFromBasket(item.id)}>Remove</button>
                    </div>
                ))
            )}
            <p>Total: £{calculateTotal()}</p>
        </div>
    </div>
);
}

export default App;
