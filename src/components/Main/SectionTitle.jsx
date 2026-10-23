import styles from './style.module.css'

export default function SectionTitle({ label, children }) {
  return <div className={`${styles.title} reveal`}><span>{label}</span><h2>{children}</h2></div>
}
