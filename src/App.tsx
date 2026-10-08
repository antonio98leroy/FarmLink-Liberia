import { useMemo, useState } from 'react'
import './App.css'

type Product = {
  id: number
  name: string
  category: string
  origin: string
  unit: string
  price: number
  rating: number
  stock: number
  seller: string
  delivery: string
  emoji: string
}

const categories = ['All', 'Vegetables', 'Crops', 'Fruit', 'Protein', 'Bakery']

const products: Product[] = [
  {
    id: 1,
    name: 'Fresh Cassava Roots',
    category: 'Crops',
    origin: 'Bomi County',
    unit: 'per 25kg bag',
    price: 2400,
    rating: 4.9,
    stock: 18,
    seller: 'Green Valley Farms',
    delivery: 'Same day',
    emoji: '🥔',
  },
  {
    id: 2,
    name: 'Red Palm Oil',
    category: 'Crops',
    origin: 'Nimba County',
    unit: 'per 5L bottle',
    price: 1850,
    rating: 4.8,
    stock: 31,
    seller: 'Riverbend Collective',
    delivery: '2-day delivery',
    emoji: '🫒',
  },
  {
    id: 3,
    name: 'African Pepper Mix',
    category: 'Vegetables',
    origin: 'Margibi County',
    unit: 'per basket',
    price: 1250,
    rating: 4.7,
    stock: 29,
    seller: 'Martha Agri Hub',
    delivery: 'Next day',
    emoji: '🌶️',
  },
  {
    id: 4,
    name: 'Sweet Plantain',
    category: 'Fruit',
    origin: 'Grand Bassa',
    unit: 'per bunch',
    price: 980,
    rating: 4.9,
    stock: 52,
    seller: 'Dawodu Farm Group',
    delivery: 'Same day',
    emoji: '🍌',
  },
  {
    id: 5,
    name: 'Fresh Tilapia',
    category: 'Protein',
    origin: 'Montserrado',
    unit: 'per kg',
    price: 1500,
    rating: 4.8,
    stock: 23,
    seller: 'Coastal Fresh',
    delivery: '2-day delivery',
    emoji: '🐟',
  },
  {
    id: 6,
    name: 'Cassava Flour',
    category: 'Bakery',
    origin: 'Lofa County',
    unit: 'per 10kg sack',
    price: 2100,
    rating: 4.6,
    stock: 14,
    seller: 'Lofa Millers',
    delivery: '2-day delivery',
    emoji: '🌾',
  },
]

const marketStats = [
  { value: '1,400+', label: 'Farmers onboarded' },
  { value: '260+', label: 'Retail buyers matched' },
  { value: '98%', label: 'On-time fulfillment' },
  { value: 'LRD 28M', label: 'Monthly trade flow' },
]

const buyerProfiles = [
  {
    title: 'Households',
    description: 'Buy fresh produce for family meals with secure payment and doorstep delivery.',
    accent: '🛒',
  },
  {
    title: 'Restaurants & Hotels',
    description: 'Source consistent supply of vegetables, herbs, fish and staples for daily cooking.',
    accent: '🍽️',
  },
  {
    title: 'Malls & Retailers',
    description: 'Order bulk quantities faster, track inventory and meet wholesale demand.',
    accent: '🏬',
  },
]

const producerSpotlights = [
  { name: 'Hawa Farmer Group', location: 'Bong County', speciality: 'Rice & vegetables', status: 'Verified' },
  { name: 'Liberia Greens Co.', location: 'Montserrado', speciality: 'Leafy greens', status: 'Premium' },
  { name: 'Farm Fresh Liberia', location: 'Grand Cape Mount', speciality: 'Cocoa & spices', status: 'Bulk ready' },
]

const featuredCategories = [
  { name: 'Rice & staples', icon: '🌾' },
  { name: 'Fresh vegetables', icon: '🥬' },
  { name: 'Seafood', icon: '🐟' },
  { name: 'Palm oil', icon: '🫒' },
]

const marketHighlights = [
  { title: 'Same-day delivery', value: 'Monrovia city hubs', icon: '🚚' },
  { title: 'Low-risk sourcing', value: 'Verified farmer profiles', icon: '✅' },
  { title: 'Bulk ordering', value: 'Ideal for hotels & shops', icon: '📦' },
]

const testimonials = [
  {
    name: 'Mary Doe',
    role: 'Restaurant owner',
    quote: 'FarmLink helped us replace unreliable suppliers with a steady source of vegetables and protein.',
  },
  {
    name: 'James Kpan',
    role: 'Retail buyer',
    quote: 'The ordering flow is simple, transparent, and the delivery schedule is consistent every week.',
  },
  {
    name: 'Aunty Korkor',
    role: 'Household buyer',
    quote: 'I can order fresh food directly from local farmers without worrying about quality or price surprises.',
  },
]

const steps = [
  'Browse trusted farms and local products.',
  'Select volume, place your order directly.',
  'Receive tracking updates and pickup or delivery confirmation.',
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  const cartItems = products
    .filter((product) => cart[product.id])
    .map((product) => ({ ...product, quantity: cart[product.id] }))

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product: Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }))
  }

  const updateCartQuantity = (productId: number, change: number) => {
    setCart((current) => {
      const nextAmount = (current[productId] ?? 0) + change
      if (nextAmount <= 0) {
        const { [productId]: _, ...rest } = current
        return rest
      }
      return { ...current, [productId]: nextAmount }
    })
  }

  return (
    <div className="farm-page">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div>
            <p className="brand-name">FarmLink Liberia</p>
            <span className="brand-tag">Direct farm to market</span>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#market">Marketplace</a>
          <a href="#buyers">Buyers</a>
          <a href="#suppliers">Suppliers</a>
          <a href="#about">About</a>
        </nav>

        <button type="button" className="nav-cta">
          Join as supplier
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Farm-to-table marketplace</span>
            <h1>Bringing Liberian farms directly to homes, restaurants and malls.</h1>
            <p>
              FarmLink Liberia connects farmers and local producers with households,
              cafes, restaurants, and retailers for seamless direct online buying.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-btn">
                Shop fresh produce
              </button>
              <button type="button" className="secondary-btn">
                Become a supplier
              </button>
            </div>

            <div className="trust-row">
              <span>Verified farmers</span>
              <span>Fast order updates</span>
              <span>Secure payments</span>
            </div>

            <div className="category-ribbon" aria-label="Featured categories">
              {featuredCategories.map((category) => (
                <div key={category.name} className="category-pill">
                  <span aria-hidden="true">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-card">
              <span className="mini-label">Harvest forecast</span>
              <strong>76% harvest readiness</strong>
              <small>Across 12 counties</small>
            </div>

            <div className="market-summary">
              <div>
                <p>Today’s volume</p>
                <h3>4,860 kg</h3>
              </div>
              <div className="pulse-dot" aria-hidden="true" />
            </div>

            <div className="list-card">
              <div className="list-row">
                <span>Rice & staples</span>
                <strong>+18%</strong>
              </div>
              <div className="list-row">
                <span>Vegetables</span>
                <strong>+12%</strong>
              </div>
              <div className="list-row">
                <span>Fish & protein</span>
                <strong>+9%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band" aria-label="Market statistics">
          {marketStats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="highlight-strip">
          {marketHighlights.map((item) => (
            <div key={item.title} className="highlight-box">
              <span className="highlight-icon" aria-hidden="true">{item.icon}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="market-section" id="market">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Marketplace</span>
              <h2>Fresh produce from trusted Liberian producers</h2>
            </div>
            <div className="search-box">
              <span>Search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search fresh products"
                aria-label="Search products"
              />
            </div>
          </div>

          <div className="filter-row" aria-label="Product categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === selectedCategory ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="catalog-layout">
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-visual" aria-hidden="true">
                    <span>{product.emoji}</span>
                  </div>

                  <div className="product-header">
                    <span className="pill">{product.category}</span>
                    <span className="rating">★ {product.rating}</span>
                  </div>

                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span>{product.origin}</span>
                    <span>{product.unit}</span>
                  </div>

                  <div className="product-footer">
                    <div>
                      <small>From</small>
                      <strong>LRD {product.price.toLocaleString()}</strong>
                    </div>
                    <span>{product.stock} in stock</span>
                  </div>

                  <div className="seller-row">
                    <span>{product.seller}</span>
                    <span>{product.delivery}</span>
                  </div>

                  <button type="button" className="add-btn" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </article>
              ))}
            </div>

            <aside className="cart-panel" aria-live="polite">
              <div className="cart-header">
                <h3>Order summary</h3>
                <span>{totalItems} items</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty.</p>
                  <small>Add fresh items to place a direct order.</small>
                </div>
              ) : (
                <ul className="cart-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.origin}</small>
                      </div>

                      <div className="quantity-controls">
                        <button type="button" onClick={() => updateCartQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateCartQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="totals">
                <div>
                  <span>Subtotal</span>
                  <strong>LRD {totalValue.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Delivery</span>
                  <strong>LRD 650</strong>
                </div>
                <div className="grand-total">
                  <span>Total</span>
                  <strong>LRD {(totalValue + 650).toLocaleString()}</strong>
                </div>
              </div>

              <button type="button" className="checkout-btn">
                Place direct order
              </button>
            </aside>
          </div>
        </section>

        <section className="buyer-section" id="buyers">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Who it serves</span>
              <h2>Built for every type of buyer in Liberia</h2>
            </div>
          </div>

          <div className="buyer-cards">
            {buyerProfiles.map((buyer) => (
              <article key={buyer.title} className="buyer-card">
                <div className="buyer-icon" aria-hidden="true">
                  {buyer.accent}
                </div>
                <h3>{buyer.title}</h3>
                <p>{buyer.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-it-works" id="suppliers">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">How it works</span>
              <h2>Simple, transparent and built for local trade</h2>
            </div>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step} className="step-item">
                <span className="step-number">0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="producer-section" id="about">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Producer network</span>
              <h2>Connected with farmers across Liberia</h2>
            </div>
          </div>

          <div className="producer-grid">
            {producerSpotlights.map((producer) => (
              <article key={producer.name} className="producer-card">
                <div className="producer-avatar" aria-hidden="true">
                  🌱
                </div>
                <div>
                  <h3>{producer.name}</h3>
                  <p>{producer.location}</p>
                </div>
                <div className="producer-footer">
                  <span>{producer.speciality}</span>
                  <strong>{producer.status}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial-section">
          <div className="section-heading narrow">
            <div>
              <span className="eyebrow">Buyer stories</span>
              <h2>Trusted by homes, kitchens and stores</h2>
            </div>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="stars" aria-label="Five star review">
                  ★★★★★
                </div>
                <p>“{item.quote}”</p>
                <div className="testimonial-author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="cta-banner">
        <div>
          <span className="eyebrow dark">Ready to source smarter?</span>
          <h2>Make buying direct from Liberian farms easier.</h2>
        </div>
        <button type="button" className="primary-btn">
          Start ordering
        </button>
      </footer>
    </div>
  )
}

export default App
