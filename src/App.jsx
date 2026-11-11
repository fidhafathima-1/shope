
import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Glow Face Serum',
    category: 'SKINCARE',
    price: 599,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600'
  },
  {
    id: 2,
    name: 'Hydra Face Cream',
    category: 'MOISTURIZER',
    price: 449,
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600'
  },
  {
    id: 3,
    name: 'Gentle Face Wash',
    category: 'CLEANSER',
    price: 299,
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600'
  },
  {
    id: 4,
    name: 'Luxury Body Lotion',
    category: 'BODY CARE',
    price: 399,
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600'
  }
]

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [search, setSearch] = useState('')
const [category, setCategory] = useState('All')

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(item => item.id === product.id)

      if (existing) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }
const toggleWishlist = (product) => {
  setWishlist(current =>
    current.some(item => item.id === product.id)
      ? current.filter(item => item.id !== product.id)
      : [...current, product]
  )
}
  const updateQuantity = (id, amount) => {
    setCart(currentCart =>
      currentCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const filteredProducts = products.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
  const matchesCategory = category === 'All' || product.category === category

  return matchesSearch && matchesCategory
})
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">ShopEase<span>.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
  <button className="wishlist-counter">
    ♡ Wishlist ({wishlist.length})
  </button>

  <button className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
    🛍 Cart ({totalItems})
  </button>
</div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">YOUR SKIN, YOUR STORY</p>
          <h1>Glow naturally.<br />Feel beautiful.</h1>
          <p className="hero-description">
            Discover skincare essentials made to bring out
            your natural beauty.
          </p>
          <a href="#shop" className="shop-btn">Explore Collection ↗</a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000"
            alt="Premium skincare products"
          />
        </div>
      </section>

      <section className="products" id="shop">
        <div className="section-heading">
          <p>CURATED FOR YOUR SKIN</p>
          <h2>Our Bestsellers</h2>
          <span>Discover your everyday skincare essentials.</span>
        </div>

      
<div className="shop-controls">
  <input
    type="text"
    placeholder="Search skincare products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <div className="category-filters">
    {['All', 'SKINCARE', 'MOISTURIZER', 'CLEANSER', 'BODY CARE'].map(item => (
      <button
        key={item}
        className={category === (item === 'All' ? 'All' : item) ? 'active' : ''}
        onClick={() => setCategory(item)}
      >
        {item}
      </button>
    ))}
  </div>
</div>

<div className="product-grid">
  {filteredProducts.length > 0 ? (
    filteredProducts.map(product => (
      <div className="product-card" key={product.id}>
        <button
  className={`wishlist-btn ${
    wishlist.some(item => item.id === product.id) ? 'liked' : ''
  }`}
  onClick={() => toggleWishlist(product)}
>
  {wishlist.some(item => item.id === product.id) ? '♥' : '♡'}
</button>
        <img src={product.image} alt={product.name} />
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="rating">★★★★★ <span>({product.rating})</span></p>
        <h4>₹{product.price}</h4>
        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    ))
  ) : (
    <p className="no-products">No products found. Try another search.</p>
  )}
</div>

      </section>

      <section className="welcome" id="about">
        <p>THE ART OF SELF CARE</p>
        <h2>Beauty begins with taking care of yourself.</h2>
      </section>

      <footer id="contact">
        <h2>ShopEase.</h2>
        <p>Everyday care. Extraordinary glow.</p>
      </footer>

      {cartOpen && (
        <div className="cart-overlay">
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Shopping Bag</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty. Start shopping!</p>
            ) : (
              <>
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>

                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="cart-total">
                  <h3>Total: ₹{totalPrice}</h3>
                  <button onClick={() => alert('Checkout feature coming soon!')}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
