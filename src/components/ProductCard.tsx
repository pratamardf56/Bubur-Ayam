import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  onAddToCart: (product: any) => void;
}

export default function ProductCard({ id, name, price, description, image, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* We use standard img for simplicity here, but Next/Image is also good */}
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            Rp {price.toLocaleString('id-ID')}
          </span>
          <button 
            className={styles.addButton}
            onClick={() => onAddToCart({ id, name, price })}
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
