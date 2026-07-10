'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ProductCard from '../components/ProductCard';

// Dummy data for products
const products = [
  {
    id: '1',
    name: 'Bubur Ayam Spesial',
    price: 18000,
    description: 'Bubur ayam dengan suwiran ayam, kerupuk, kacang kedelai, telur puyuh, sate usus dan kuah kuning gurih.',
    image: 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/08d2cd13-1458-4b87-906a-8d594938a3e8_Go-Biz_20211112_062806.jpeg',
    category: 'utama'
  },
  {
    id: '2',
    name: 'Bubur Ayam Biasa',
    price: 13000,
    description: 'Bubur ayam dengan suwiran ayam, kerupuk, kacang kedelai dan kuah kuning gurih.',
    image: 'https://asset.kompas.com/crops/RbAhQOP3X6lDev27NVPBlTcI5Ys=/0x189:3190x2316/1200x800/data/photo/2025/12/11/693a85f1ace7f.jpg',
    category: 'utama'
  },
  {
    id: '3',
    name: 'Sate Usus',
    price: 3000,
    description: 'Sate usus ayam bumbu kuning meresap sempurna.',
    image: '/images/sate_usus.jpg',
    category: 'pelengkap'
  },
  {
    id: '4',
    name: 'Sate Telur Puyuh',
    price: 3000,
    description: 'Sate telur puyuh bacem yang manis dan gurih.',
    image: '/images/sate_puyuh.jpg',
    category: 'pelengkap'
  },
  {
    id: '5',
    name: 'Rempeyek',
    price: 5000,
    description: 'Rempeyek kacang renyah dan gurih, pelengkap sempurna untuk semangkuk bubur ayam.',
    image: '/images/rempeyek.jpg',
    category: 'pelengkap'
  },
  {
    id: '6',
    name: 'Teh Hangat / Manis',
    price: 3000,
    description: 'Teh manis hangat yang pas untuk menemani makan bubur.',
    image: '/images/teh_hangat.jpg',
    category: 'minuman'
  },
  {
    id: '7',
    name: 'Es Teh Manis',
    price: 4000,
    description: 'Es teh manis segar yang sangat cocok diminum saat cuaca panas.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
    category: 'minuman'
  }
];

export default function Home() {
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);

  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
        // jika quantity === 1, tidak ditambah ke acc (terhapus)
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as { id: string; name: string; price: number; quantity: number }[]));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [showReceipt, setShowReceipt] = useState(false);

  // Default Shopee Food link logic (dummy link for now)
  const handleShopeeFoodOrder = () => {
    if (cart.length === 0) return;
    setShowReceipt(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>✨ Bubur Ayam Kang Abay ✨</h1>
          <p className={styles.tagline}>Sajian Bubur Premium dengan Cita Rasa Autentik & Modern</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>Menu Utama</h2>
          <div className={styles.productGrid}>
            {products.filter(p => p.category === 'utama').map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Menu Pelengkap</h2>
          <div className={styles.productGrid}>
            {products.filter(p => p.category === 'pelengkap').map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Minuman</h2>
          <div className={styles.productGrid}>
            {products.filter(p => p.category === 'minuman').map(product => (
              <ProductCard 
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.cart}>
            <h2 className={styles.cartTitle}>Pesanan Anda</h2>
            
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Keranjang masih kosong.</p>
                <p>Yuk pilih menu favoritmu!</p>
              </div>
            ) : (
              <div className={styles.cartItems}>
                {cart.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartItemInfo}>
                      <span className={styles.cartItemName}>{item.name}</span>
                      <span className={styles.cartItemQuantity}>x{item.quantity}</span>
                    </div>
                    <div className={styles.cartItemPriceRow}>
                      <span className={styles.cartItemPrice}>
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span className={styles.totalPrice}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            )}
            
            <button 
              className={styles.shopeeButton}
              onClick={handleShopeeFoodOrder}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" 
                alt="Shopee" 
                className={styles.shopeeIcon}
              />
              Pesan & Cetak Struk
            </button>
            <div className={styles.addressBox}>
              <a
                href="https://www.google.com/maps/search/Stasiun+Kranji+Bekasi"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.addressLink}
              >
                📍  Stasiun Kranji Bekasi — Klik untuk lihat di Google Maps
              </a>
            </div>
          </div>
        </aside>
      </main>

      {/* Modal Struk */}
      {showReceipt && (
        <div className={styles.modalOverlay}>
          <div className={styles.receiptModal}>
            <div className={styles.receiptHeader}>
              <h3>🍲 Bubur Kang Abay</h3>
              <a
                href="https://www.google.com/maps/search/Stasiun+Kranji+Bekasi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1a73e8', fontSize: '0.85rem', textDecoration: 'underline' }}
              >
                📍 Stasiun Kranji
              </a>
              <p style={{ marginTop: '0.5rem' }}>--------------------------------</p>
            </div>
            <div className={styles.receiptBody}>
              {cart.map(item => (
                <div key={item.id} className={styles.receiptItem}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className={styles.receiptTotal}>
                <span>TOTAL</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className={styles.receiptFooter}>
              <p>Terima kasih atas pesanan Anda!</p>
              <p>--------------------------------</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.printBtn} onClick={handlePrint}>🖨️ Cetak</button>
              <button className={styles.closeBtn} onClick={() => setShowReceipt(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
