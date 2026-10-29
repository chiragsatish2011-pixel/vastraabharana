import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const currencies = {
  INR: { symbol: '₹', rate: 1.0, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('va_cart');
      if (saved && JSON.parse(saved).length > 0) return JSON.parse(saved);
      return [
        {
          id: 'saree-onion-pink',
          variantId: 'var-1',
          title: 'Onion Pink Elegant Designer Saree',
          category: 'HERITAGE SILK',
          price: 945,
          compareAtPrice: 1890,
          image: '/images/models/model_saree_maroon.jpg',
          quantity: 1,
          variantTitle: 'Pure Silk / With Fall & Edging'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('va_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [isCartOpen, setIsCartOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#cart' || window.location.search.includes('cart=open');
    }
    return false;
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#cart') {
        setIsCartOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('va_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('va_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToCart = (product, selectedVariant = null, quantity = 1) => {
    setCart(prev => {
      const variantId = selectedVariant ? selectedVariant.id : (product.variants?.[0]?.id || product.id);
      const existingIndex = prev.findIndex(item => item.id === product.id && item.variantId === variantId);
      
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, {
          id: product.id,
          variantId,
          title: product.title,
          price: selectedVariant ? selectedVariant.price : product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.image,
          size: selectedVariant?.title || 'Standard',
          badge: product.badge,
          quantity
        }];
      }
    });

    setIsCartOpen(true);
    triggerToast(`Added ${product.title.slice(0, 24)}... to bag!`);
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.variantId === variantId)));
  };

  const updateQuantity = (productId, variantId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.variantId === variantId) {
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        triggerToast(`Removed from saved items.`);
        return prev.filter(item => item.id !== product.id);
      } else {
        triggerToast(`Saved ${product.title.slice(0, 20)}... to wishlist!`);
        return [...prev, product];
      }
    });
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const cartTotalINR = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatPrice = (priceINR) => {
    const cur = currencies[currency] || currencies.INR;
    const converted = Math.round(priceINR * cur.rate);
    return `${cur.symbol}${converted.toLocaleString('en-IN')}`;
  };

  return (
    <StoreContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotalINR,
      wishlist,
      toggleWishlist,
      currency,
      setCurrency,
      formatPrice,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isSearchOpen,
      setIsSearchOpen,
      quickViewProduct,
      setQuickViewProduct,
      toastMessage
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
