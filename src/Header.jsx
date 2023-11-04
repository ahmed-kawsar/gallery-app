const Header = ({ selectedProductCount, handleDelete }) => {
  return (
    <header className='header'>
      <div className='itemCount'>
        <input type='checkbox' checked={selectedProductCount > 0} />
        <h3>
          {selectedProductCount} File{selectedProductCount > 1 ? 's ' : ' '}
          Selected
        </h3>
      </div>
      <button onClick={handleDelete}>
        Delete file{selectedProductCount > 1 ? 's ' : ' '}
      </button>
    </header>
  )
}
export default Header
