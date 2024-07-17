
type ContentAreaProps = {
    itemList: Product[];
    addToBasket: (product: Product) => void; 
}

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
    rating: number;
    image_link: string;
}

export const ProductList = (props: ContentAreaProps) => {
    const { itemList, addToBasket } = props;

    return (
        <div id="productList">
            {itemList.map((item) => {
                const buttonLabel = item.quantity > 0 ? "Add to basket" : "Out of stock";
                const isDisabled = item.quantity === 0;
                const buttonClass = item.quantity > 0 ? "button" : "button button-out-of-stock";

                return (
                    <div key={item.id} className="product"> 
                        <div className="product-top-bar">
                            <h2>{item.name}</h2>
                            <p>£{item.price.toFixed(2)} ({item.rating}/5)</p>
                        </div>
                        <img src={"./src/Assets/Product_Images/" + item.image_link} alt={item.name}></img>
                        <button 
                            className={buttonClass}
                            disabled={isDisabled} 
                            onClick={() => addToBasket(item)} 
                            value={item.id}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}