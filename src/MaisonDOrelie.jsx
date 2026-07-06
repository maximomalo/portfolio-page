import React, { useState, useMemo } from "react";


const ink = "#1C1B19";
const ivory = "#F6F3EC";
const paper = "#FBF9F4";
const gold = "#9C7A3C";
const goldLight = "#C9A66B";
const taupe = "#8F8578";
const line = "#E4DFD3";
const sale = "#F5D666";
const saleText = "#5C4A12";

const displayFont = "'Cormorant Garamond', 'Georgia', 'Times New Roman', serif";
const bodyFont = "'Jost', 'Helvetica Neue', Arial, sans-serif";


function CategoryIcon({ type, color = taupe, size = 64 }) {
  const common = { width: size, height: size, viewBox: "0 0 64 64", fill: "none", stroke: color, strokeWidth: 1.2 };
  if (type === "Watches") {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="14" />
        <circle cx="32" cy="32" r="1.4" fill={color} />
        <line x1="32" y1="24" x2="32" y2="32" />
        <line x1="32" y1="32" x2="37" y2="35" />
        <path d="M27 18 L27 10 L37 10 L37 18" />
        <path d="M27 46 L27 54 L37 54 L37 46" />
      </svg>
    );
  }
  if (type === "Shirts") {
    return (
      <svg {...common}>
        <path d="M22 14 L14 20 L18 28 L22 25 L22 50 L42 50 L42 25 L46 28 L50 20 L42 14 L36 18 L28 18 Z" />
      </svg>
    );
  }
  if (type === "Pants") {
    return (
      <svg {...common}>
        <path d="M20 12 H44 L46 52 L36 52 L32 26 L28 52 L18 52 Z" />
        <line x1="21" y1="20" x2="43" y2="20" />
      </svg>
    );
  }
  if (type === "Dresses") {
    return (
      <svg {...common}>
        <path d="M26 12 H38 L40 20 L48 52 H16 L24 20 Z" />
        <line x1="27" y1="14" x2="27" y2="20" />
        <line x1="37" y1="14" x2="37" y2="20" />
      </svg>
    );
  }
  return null;
}


const PRODUCTS = [
  { id: "w1", name: "Aurel Chronograph", category: "Watches", gender: "unisex", price: 890, discount: 0, swatch: "#DDD6C6", image: `${import.meta.env.BASE_URL}products/Aurel_Chronograph.png`, desc: "A slim brushed-steel case with a hand-stitched leather strap, built for everyday refinement." },
  { id: "w2", name: "Solene Mesh", category: "Watches", gender: "women", price: 640, discount: 30, swatch: "#E7DFCB", image: `${import.meta.env.BASE_URL}products/Solene_Mesh.png`, desc: "A featherweight mesh bracelet watch with a mother-of-pearl face." },
  { id: "w3", name: "Bastian Field", category: "Watches", gender: "men", price: 720, discount: 0, swatch: "#D8CFBB", image: `${import.meta.env.BASE_URL}products/Bastian_Field.png`, desc: "A rugged-refined field watch with a matte sapphire crystal." },
  { id: "w4", name: "Odessa Bangle", category: "Watches", gender: "women", price: 560, discount: 0, swatch: "#EFE7D6", image: `${import.meta.env.BASE_URL}products/Odessa_Bangle.png`, desc: "A slender bangle watch finished in warm gold-tone plating." },
  { id: "s1", name: "Linen Ipswich Shirt", category: "Shirts", gender: "men", price: 210, discount: 35, swatch: "#F1ECDF", image: `${import.meta.env.BASE_URL}products/Linen_Ipswich_Shirt.png`, desc: "European linen, cut for a relaxed but tailored silhouette." },
  { id: "s2", name: "Silk Camille Blouse", category: "Shirts", gender: "women", price: 245, discount: 0, swatch: "#EFE3DB", image: `${import.meta.env.BASE_URL}products/Silk_Camille_Blouse.png`, desc: "Mulberry silk with a soft cowl neckline, made to drape rather than cling." },
  { id: "s3", name: "Oxford Weekend Shirt", category: "Shirts", gender: "men", price: 180, discount: 0, swatch: "#E9E2D2", image: `${import.meta.env.BASE_URL}products/Oxford_Weekend_Shirt.png`, desc: "A brushed cotton oxford with mother-of-pearl buttons." },
  { id: "s4", name: "Poplin Wrap Shirt", category: "Shirts", gender: "women", price: 195, discount: 40, swatch: "#F3EEE2", image: `${import.meta.env.BASE_URL}products/Poplin_Wrap_Shirt.png`, desc: "Crisp cotton poplin with a self-tie waist." },
  { id: "p1", name: "Milano Wool Trouser", category: "Pants", gender: "men", price: 260, discount: 0, swatch: "#DCD3C2", image: `${import.meta.env.BASE_URL}products/Milano_Wool_Trouser.png`, desc: "Italian wool, finished with a clean, uncuffed hem." },
  { id: "p2", name: "Tailored Ankle Trouser", category: "Pants", gender: "women", price: 230, discount: 25, swatch: "#E5DCC9", image: `${import.meta.env.BASE_URL}products/Tailored_Ankle_Trouser.png`, desc: "A high-rise trouser tailored to sit cleanly at the ankle." },
  { id: "p3", name: "Cambridge Chino", category: "Pants", gender: "men", price: 175, discount: 0, swatch: "#EAE2D0", image: `${import.meta.env.BASE_URL}products/Cambridge_Chino.png`, desc: "A soft brushed cotton chino with a quiet, tapered leg." },
  { id: "d1", name: "Vesper Midi Dress", category: "Dresses", gender: "women", price: 340, discount: 30, swatch: "#EDE1D9", image: `${import.meta.env.BASE_URL}products/Vesper_Midi_Dress.png`, desc: "Crepe fabric that moves easily, finished with a fine box pleat." },
  { id: "d2", name: "Amara Slip Dress", category: "Dresses", gender: "women", price: 290, discount: 0, swatch: "#F0E6DC", image: `${import.meta.env.BASE_URL}products/Amara_Slip_Dress.png`, desc: "Bias-cut silk-blend slip dress in a quiet, considered palette." },
  { id: "d3", name: "Lucerne Wrap Dress", category: "Dresses", gender: "women", price: 265, discount: 0, swatch: "#E8DFD0", image: `${import.meta.env.BASE_URL}products/Lucerne_Wrap_Dress.png`, desc: "A wrap dress in brushed wool crepe, built for transitional weather." },
];



const CATEGORY_ORDER = ["Watches", "Shirts", "Pants", "Dresses"];

function currency(n) {
  return `$${n.toLocaleString("en-CA")}`;
}
function discountedPrice(p) {
  return Math.round(p.price * (1 - p.discount / 100));
}


function ProductMedia({ product, iconSize = 72, style, children }) {
  const [failed, setFailed] = useState(false);
  const showImage = product.image && !failed;
  return (
    <div
      style={{
        background: product.swatch,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
    >
      {showImage ? (
        <img
          src={product.image}
          alt={product.name}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <CategoryIcon type={product.category} color={taupe} size={iconSize} />
      )}
      {children}
    </div>
  );
}


function DiscountBadge({ percent }) {
  return (
    <span
      style={{
        background: sale,
        color: saleText,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 7px",
        borderRadius: 3,
        letterSpacing: 0.3,
      }}
    >
      {percent}% OFF
    </span>
  );
}

function PrimaryButton({ children, onClick, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? taupe : ink,
        color: ivory,
        border: "none",
        padding: "13px 28px",
        fontFamily: bodyFont,
        fontSize: 13,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "opacity .15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        color: ink,
        border: `1px solid ${ink}`,
        padding: "13px 28px",
        fontFamily: bodyFont,
        fontSize: 13,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Gate({ onEnter }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canEnter = gender && emailValid;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: ivory,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: bodyFont,
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontFamily: displayFont, fontSize: 15, letterSpacing: 6, color: gold, marginBottom: 10 }}>
          MAISON
        </div>
        <div style={{ fontFamily: displayFont, fontSize: 52, color: ink, letterSpacing: 1, lineHeight: 1 }}>
          d'Orélie
        </div>
        <div style={{ marginTop: 16, fontSize: 14, color: taupe, letterSpacing: 0.4, maxWidth: 360 }}>
          Considered clothing and timepieces, for whoever is wearing them.
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        {["Women", "Men"].map((g) => {
          const val = g.toLowerCase();
          const active = gender === val;
          return (
            <button
              key={g}
              onClick={() => setGender(val)}
              style={{
                width: 150,
                padding: "22px 0",
                background: active ? ink : "transparent",
                color: active ? ivory : ink,
                border: `1px solid ${ink}`,
                fontFamily: displayFont,
                fontSize: 20,
                letterSpacing: 1,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {g}
            </button>
          );
        })}
      </div>

      <div style={{ width: 320, maxWidth: "100%" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="name@email.com"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            fontFamily: bodyFont,
            fontSize: 14,
            border: `1px solid ${touched && !emailValid ? "#B23B3B" : line}`,
            background: paper,
            outline: "none",
            marginBottom: 8,
          }}
        />
        {touched && !emailValid && (
          <div style={{ fontSize: 12, color: "#B23B3B", marginBottom: 10 }}>
            Enter a valid email so we can send your order confirmations.
          </div>
        )}
        <PrimaryButton
          disabled={!canEnter}
          onClick={() => canEnter && onEnter(gender, email)}
          style={{ width: "100%", marginTop: 6 }}
        >
          Enter the Maison
        </PrimaryButton>
      </div>
    </div>
  );
}

function Nav({ gender, setGender, page, setPage, cartCount }) {
  return (
    <div style={{ borderBottom: `1px solid ${line}`, background: paper }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: bodyFont,
        }}
      >
        <div
          onClick={() => setPage("home")}
          style={{ fontFamily: displayFont, fontSize: 24, letterSpacing: 1, cursor: "pointer", color: ink }}
        >
          Maison d'Orélie
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {["women", "men"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              style={{
                background: "none",
                border: "none",
                borderBottom: gender === g ? `1px solid ${ink}` : "1px solid transparent",
                fontFamily: bodyFont,
                fontSize: 13,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: gender === g ? ink : taupe,
                cursor: "pointer",
                paddingBottom: 3,
              }}
            >
              {g}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 22, alignItems: "center", fontSize: 13, letterSpacing: 0.6 }}>
          <span onClick={() => setPage("faq")} style={{ cursor: "pointer", color: page === "faq" ? ink : taupe }}>
            FAQ
          </span>
          <span onClick={() => setPage("survey")} style={{ cursor: "pointer", color: page === "survey" ? ink : taupe }}>
            Feedback
          </span>
          <span onClick={() => setPage("cart")} style={{ cursor: "pointer", color: ink }}>
            Bag ({cartCount})
          </span>
        </div>
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <div style={{ background: ink, color: ivory, textAlign: "center", padding: "9px 12px", fontFamily: bodyFont, fontSize: 13, letterSpacing: 0.6 }}>
      A considered edit, marked down — up to <span style={{ color: sale, fontWeight: 600 }}>40% off</span> select styles, this week only.
    </div>
  );
}

function ProductCard({ product, onOpen }) {
  return (
    <div onClick={() => onOpen(product)} style={{ cursor: "pointer" }}>
      <ProductMedia product={product} iconSize={72} style={{ aspectRatio: "3 / 4" }}>
        {product.discount > 0 && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <DiscountBadge percent={product.discount} />
          </div>
        )}
      </ProductMedia>
      <div style={{ marginTop: 10, fontFamily: bodyFont }}>
        <div style={{ fontSize: 14, color: ink }}>{product.name}</div>
        <div style={{ fontSize: 12, color: taupe, marginBottom: 4 }}>{product.category}</div>
        <div style={{ fontSize: 14 }}>
          {product.discount > 0 ? (
            <>
              <span style={{ color: taupe, textDecoration: "line-through", marginRight: 8 }}>
                {currency(product.price)}
              </span>
              <span style={{ color: ink, fontWeight: 500 }}>{currency(discountedPrice(product))}</span>
            </>
          ) : (
            <span style={{ color: ink }}>{currency(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Home({ gender, products, onOpen }) {
  const [categories, setCategories] = useState(new Set());
  const [maxPrice, setMaxPrice] = useState(900);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    let list = products.filter((p) => p.gender === gender || p.gender === "unisex");
    if (categories.size > 0) list = list.filter((p) => categories.has(p.category));
    list = list.filter((p) => discountedPrice(p) <= maxPrice);
    if (onSaleOnly) list = list.filter((p) => p.discount > 0);
    if (sort === "price-asc") list = [...list].sort((a, b) => discountedPrice(a) - discountedPrice(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => discountedPrice(b) - discountedPrice(a));
    return list;
  }, [products, gender, categories, maxPrice, onSaleOnly, sort]);

  const availableCategories = CATEGORY_ORDER.filter((c) =>
    products.some((p) => p.category === c && (p.gender === gender || p.gender === "unisex"))
  );

  function toggleCategory(cat) {
    const next = new Set(categories);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    setCategories(next);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div style={{ fontFamily: displayFont, fontSize: 34, color: ink, marginBottom: 6 }}>
        {gender === "women" ? "Women's edit" : "Men's edit"}
      </div>
      <div style={{ fontSize: 14, color: taupe, marginBottom: 32, maxWidth: 520 }}>
        Every piece is selected for how it wears over years, not seasons. Filter by what matters to you below.
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* Facets */}
        <div style={{ width: 190, flexShrink: 0 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: ink, marginBottom: 12 }}>
            Category
          </div>
          {availableCategories.map((cat) => (
            <label key={cat} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, color: ink, cursor: "pointer" }}>
              <input type="checkbox" checked={categories.has(cat)} onChange={() => toggleCategory(cat)} />
              {cat}
            </label>
          ))}

          <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: ink, margin: "24px 0 12px" }}>
            Price, up to {currency(maxPrice)}
          </div>
          <input
            type="range"
            min="100"
            max="900"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 22, fontSize: 13, color: ink, cursor: "pointer" }}>
            <input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSaleOnly(e.target.checked)} />
            On sale only
          </label>

          <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", color: ink, margin: "24px 0 8px" }}>
            Sort
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "100%", padding: "8px", fontFamily: bodyFont, fontSize: 13, border: `1px solid ${line}`, background: paper }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {/* Grid */}
        <div style={{ flex: 1 }}>
          {visible.length === 0 ? (
            <div style={{ fontSize: 14, color: taupe, padding: "40px 0" }}>
              Nothing matches those filters yet — try widening your price range or clearing a category.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "28px 22px" }}>
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductDetail({ product, onAdd, onBack }) {
  const [added, setAdded] = useState(false);
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div onClick={onBack} style={{ fontSize: 13, color: taupe, cursor: "pointer", marginBottom: 24 }}>
        ← Back to the edit
      </div>
      <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
        <ProductMedia product={product} iconSize={110} style={{ width: 380, aspectRatio: "3/4" }}>
          {product.discount > 0 && (
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <DiscountBadge percent={product.discount} />
            </div>
          )}
        </ProductMedia>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontSize: 12, color: taupe, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            {product.category}
          </div>
          <div style={{ fontFamily: displayFont, fontSize: 32, color: ink, marginBottom: 12 }}>{product.name}</div>
          <div style={{ fontSize: 18, marginBottom: 18 }}>
            {product.discount > 0 ? (
              <>
                <span style={{ color: taupe, textDecoration: "line-through", marginRight: 10 }}>{currency(product.price)}</span>
                <span style={{ color: ink, fontWeight: 500 }}>{currency(discountedPrice(product))}</span>
              </>
            ) : (
              <span style={{ color: ink }}>{currency(product.price)}</span>
            )}
          </div>
          <div style={{ fontSize: 14, color: ink, lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
            {product.desc}
          </div>
          <PrimaryButton
            onClick={() => {
              onAdd(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
          >
            {added ? "Added to bag" : "Add to bag"}
          </PrimaryButton>
          <div style={{ marginTop: 22, fontSize: 12, color: taupe, borderTop: `1px solid ${line}`, paddingTop: 14 }}>
            Free exchanges. Returns accepted within 30 days of delivery.
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, products, setCart, onCheckout, onContinue }) {
  const items = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id) }));
  const total = items.reduce((sum, i) => sum + discountedPrice(i.product) * i.qty, 0);

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCart(cart.filter((c) => c.id !== id));
    } else {
      setCart(cart.map((c) => (c.id === id ? { ...c, qty } : c)));
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div style={{ fontFamily: displayFont, fontSize: 32, color: ink, marginBottom: 24 }}>Your bag</div>
      {items.length === 0 ? (
        <div>
          <div style={{ fontSize: 14, color: taupe, marginBottom: 20 }}>Your bag is empty for now.</div>
          <GhostButton onClick={onContinue}>Continue browsing</GhostButton>
        </div>
      ) : (
        <>
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", gap: 18, alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${line}` }}>
              <ProductMedia product={i.product} iconSize={36} style={{ width: 72, height: 90, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: ink }}>{i.product.name}</div>
                <div style={{ fontSize: 12, color: taupe }}>{currency(discountedPrice(i.product))} each</div>
              </div>
              <input
                type="number"
                min="0"
                value={i.qty}
                onChange={(e) => updateQty(i.id, Number(e.target.value))}
                style={{ width: 48, padding: "6px", textAlign: "center", border: `1px solid ${line}`, fontFamily: bodyFont }}
              />
              <div style={{ width: 70, textAlign: "right", fontSize: 14, color: ink }}>
                {currency(discountedPrice(i.product) * i.qty)}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "22px 0", fontSize: 16, color: ink }}>
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <GhostButton onClick={onContinue}>Continue browsing</GhostButton>
            <PrimaryButton onClick={onCheckout}>Checkout</PrimaryButton>
          </div>
        </>
      )}
    </div>
  );
}

function Checkout({ cart, products, onDone }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", province: "", postal: "", country: "Canada" });
  const [payment, setPayment] = useState({ card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState({});

  const items = cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id) }));
  const total = items.reduce((sum, i) => sum + discountedPrice(i.product) * i.qty, 0);

  const steps = ["Shipping", "Payment", "Review"];

  function validateShipping() {
    const e = {};
    if (!shipping.name.trim()) e.name = "Enter the name for this order.";
    if (!shipping.address.trim()) e.address = "Enter a delivery address.";
    if (!shipping.city.trim()) e.city = "Enter a city.";
    if (!shipping.postal.trim()) e.postal = "Enter a postal code.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validatePayment() {
    const e = {};
    if (!/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/.test(payment.card)) e.card = "Enter a 16-digit card number.";
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) e.expiry = "Use MM/YY format.";
    if (!/^\d{3}$/.test(payment.cvc)) e.cvc = "Enter a 3-digit security code.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {steps.map((label, idx) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: idx + 1 === step ? ink : taupe, marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ height: 2, background: idx + 1 <= step ? ink : line }} />
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={{ fontFamily: displayFont, fontSize: 26, color: ink, marginBottom: 20 }}>Where should this go?</div>
          {[
            ["name", "Full name"],
            ["address", "Street address"],
            ["city", "City"],
            ["province", "Province"],
            ["postal", "Postal code"],
          ].map(([key, label]) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <input
                placeholder={label}
                value={shipping[key]}
                onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", fontFamily: bodyFont, fontSize: 14, border: `1px solid ${errors[key] ? "#B23B3B" : line}` }}
              />
              {errors[key] && <div style={{ fontSize: 12, color: "#B23B3B", marginTop: 4 }}>{errors[key]}</div>}
            </div>
          ))}
          <PrimaryButton onClick={() => validateShipping() && setStep(2)}>Continue to payment</PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontFamily: displayFont, fontSize: 26, color: ink, marginBottom: 20 }}>Payment details</div>
          <div style={{ marginBottom: 14 }}>
            <input
              placeholder="1234 5678 9012 3456"
              value={payment.card}
              onChange={(e) => setPayment({ ...payment, card: e.target.value })}
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", fontFamily: bodyFont, fontSize: 14, border: `1px solid ${errors.card ? "#B23B3B" : line}` }}
            />
            {errors.card && <div style={{ fontSize: 12, color: "#B23B3B", marginTop: 4 }}>{errors.card}</div>}
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <input
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", fontFamily: bodyFont, fontSize: 14, border: `1px solid ${errors.expiry ? "#B23B3B" : line}` }}
              />
              {errors.expiry && <div style={{ fontSize: 12, color: "#B23B3B", marginTop: 4 }}>{errors.expiry}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <input
                placeholder="CVC"
                value={payment.cvc}
                onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", fontFamily: bodyFont, fontSize: 14, border: `1px solid ${errors.cvc ? "#B23B3B" : line}` }}
              />
              {errors.cvc && <div style={{ fontSize: 12, color: "#B23B3B", marginTop: 4 }}>{errors.cvc}</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <GhostButton onClick={() => setStep(1)}>Back</GhostButton>
            <PrimaryButton onClick={() => validatePayment() && setStep(3)}>Review order</PrimaryButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontFamily: displayFont, fontSize: 26, color: ink, marginBottom: 20 }}>Review and confirm</div>
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "8px 0", borderBottom: `1px solid ${line}` }}>
              <span>{i.product.name} × {i.qty}</span>
              <span>{currency(discountedPrice(i.product) * i.qty)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontSize: 16, fontWeight: 500 }}>
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <div style={{ fontSize: 13, color: taupe, marginBottom: 20 }}>
            Shipping to {shipping.address}, {shipping.city} {shipping.postal}, {shipping.country}.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <GhostButton onClick={() => setStep(2)}>Back</GhostButton>
            <PrimaryButton onClick={onDone}>Place order</PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Confirmation({ orderNumber, onContinue }) {
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center", fontFamily: bodyFont }}>
      <div style={{ fontFamily: displayFont, fontSize: 32, color: ink, marginBottom: 14 }}>Thank you.</div>
      <div style={{ fontSize: 14, color: ink, lineHeight: 1.7, marginBottom: 6 }}>
        Order <strong>{orderNumber}</strong> is confirmed. A receipt is on its way to your inbox.
      </div>
      <div style={{ fontSize: 13, color: taupe, marginBottom: 30 }}>
        Delivery within Canada typically takes 1–2 weeks. International orders can take up to 30 days.
      </div>
      <PrimaryButton onClick={onContinue}>Continue browsing</PrimaryButton>
    </div>
  );
}

const FAQS = [
  { q: "What is your return policy?", a: "We accept returns within 30 days of delivery, provided the item is unworn and in its original condition. Refunds are issued to your original payment method." },
  { q: "How long does shipping take?", a: "Orders within Canada arrive within 1–2 weeks. Orders shipping outside Canada can take up to 30 days, depending on customs processing in your country." },
  { q: "Do you offer exchanges?", a: "Yes. Exchanges are free within Canada for a different size or colour of the same style, within 30 days of delivery." },
  { q: "How should I care for my pieces?", a: "Each product page lists specific care instructions. As a general rule, our natural fibres — linen, silk, and wool — prefer a gentle hand wash or dry clean over a machine cycle." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards. All transactions are encrypted and processed securely at checkout." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div style={{ fontFamily: displayFont, fontSize: 32, color: ink, marginBottom: 8 }}>Questions, answered</div>
      <div style={{ fontSize: 14, color: taupe, marginBottom: 28 }}>Everything you need to know before, and after, your order.</div>
      {FAQS.map((f, idx) => (
        <div key={idx} style={{ borderBottom: `1px solid ${line}` }}>
          <div
            onClick={() => setOpen(open === idx ? null : idx)}
            style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", cursor: "pointer", fontSize: 15, color: ink }}
          >
            <span>{f.q}</span>
            <span style={{ color: taupe }}>{open === idx ? "–" : "+"}</span>
          </div>
          {open === idx && (
            <div style={{ paddingBottom: 18, fontSize: 14, color: taupe, lineHeight: 1.7, maxWidth: 560 }}>
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Survey() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "80px 24px", textAlign: "center", fontFamily: bodyFont }}>
        <div style={{ fontFamily: displayFont, fontSize: 28, color: ink, marginBottom: 12 }}>We're grateful for your time.</div>
        <div style={{ fontSize: 14, color: taupe }}>Your thoughts help us shape the next collection.</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "36px 24px 80px", fontFamily: bodyFont }}>
      <div style={{ fontFamily: displayFont, fontSize: 30, color: ink, marginBottom: 8 }}>How was your visit?</div>
      <div style={{ fontSize: 14, color: taupe, marginBottom: 26 }}>
        We'd love to hear about your experience today — it only takes a moment, and it genuinely shapes what we do next.
      </div>

      <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: ink, marginBottom: 10 }}>
        Rate your experience
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setRating(n)}
            style={{ fontSize: 28, cursor: "pointer", color: n <= rating ? gold : line }}
          >
            ★
          </span>
        ))}
      </div>

      <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: ink, marginBottom: 10 }}>
        Tell us more
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What stood out, and what could we do better?"
        rows={5}
        style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", fontFamily: bodyFont, fontSize: 14, border: `1px solid ${line}`, marginBottom: 20, resize: "vertical" }}
      />
      <PrimaryButton disabled={rating === 0} onClick={() => setSent(true)}>
        Share my feedback
      </PrimaryButton>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${line}`, padding: "28px 24px", textAlign: "center", fontFamily: bodyFont, fontSize: 12, color: taupe }}>
      Maison d'Orélie — considered clothing and timepieces. Shipping across Canada and beyond.
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [gender, setGender] = useState("women");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);

  function handleEnter(g, e) {
    setGender(g);
    setEmail(e);
    setEntered(true);
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing) {
        return prev.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  }

  function placeOrder() {
    setOrderNumber("MV-" + Math.floor(100000 + Math.random() * 900000));
    setCart([]);
    setPage("confirmation");
  }

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  if (!entered) return <Gate onEnter={handleEnter} />;

  return (
    <div style={{ background: paper, minHeight: "100vh" }}>
      <PromoBanner />
      <Nav gender={gender} setGender={(g) => { setGender(g); setPage("home"); }} page={page} setPage={setPage} cartCount={cartCount} />

      {page === "home" && (
        <Home gender={gender} products={PRODUCTS} onOpen={(p) => { setSelectedProduct(p); setPage("product"); }} />
      )}
      {page === "product" && selectedProduct && (
        <ProductDetail product={selectedProduct} onAdd={addToCart} onBack={() => setPage("home")} />
      )}
      {page === "cart" && (
        <Cart cart={cart} products={PRODUCTS} setCart={setCart} onCheckout={() => setPage("checkout")} onContinue={() => setPage("home")} />
      )}
      {page === "checkout" && (
        <Checkout cart={cart} products={PRODUCTS} onDone={placeOrder} />
      )}
      {page === "confirmation" && (
        <Confirmation orderNumber={orderNumber} onContinue={() => setPage("home")} />
      )}
      {page === "faq" && <FAQ />}
      {page === "survey" && <Survey />}

      <Footer />
    </div>
  );
}
"D"