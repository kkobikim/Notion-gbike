const Card = ({ children, headerSlot, className }) => {
  return <div className={className}>
    <>{headerSlot}</>
    <section className="dark:text-gray-300 rounded-xl px-2 py-4 lg:duration-100">
        {children}
    </section>
  </div>
}
export default Card
