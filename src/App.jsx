'use client'
import { useEffect, useRef, useState } from 'react'
import { data } from './data'
import Header from './Header'

export default function App() {
  const [products, setProducts] = useState(data)

  const [selectedProductCount, setSelectedProductCount] = useState(0)

  const dragProduct = useRef(0)
  const draggedOverProduct = useRef(0)

  function handleSort() {
    const productClone = [...products]
    const temp = productClone[dragProduct.current]
    productClone[dragProduct.current] = productClone[draggedOverProduct.current]
    productClone[draggedOverProduct.current] = temp
    setProducts(productClone)
  }

  const handleCheck = (id) => {
    const listItems = products.map((product) =>
      product.id === id ? { ...product, selected: !product.selected } : product
    )
    setProducts(listItems)
  }

  const handleDelete = () => {
    const listItem = products.filter((product) => !product.selected)
    setProducts(listItem)
  }

  useEffect(() => {
    const listItem = products.filter((product) => product.selected)
    setSelectedProductCount(listItem.length)
  }, [products])

  return (
    <main className='app'>
      <Header
        selectedProductCount={selectedProductCount}
        handleDelete={handleDelete}
      />
      <hr />
      <div className='products'>
        {products.map((product, index) => (
          <div
            className='productCard'
            key={index}
            draggable
            onDragStart={() => (dragProduct.current = index)}
            onDragEnter={() => (draggedOverProduct.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type='checkbox'
              checked={product.selected}
              onChange={() => handleCheck(product.id)}
              className='checkbox'
            />
            <img
              src={product.img}
              alt={product.name}
              onClick={() => handleCheck(product.id)}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
