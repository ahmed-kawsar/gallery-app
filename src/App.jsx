'use client'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'image 1',
      img: '/image-1.webp',
      selected: false,
    },
    {
      id: 2,
      name: 'image 2',
      img: '/image-2.webp',
      selected: false,
    },
    {
      id: 3,
      name: 'image 3',
      img: '/image-3.webp',
      selected: false,
    },
    {
      id: 4,
      name: 'image 4',
      img: '/image-4.webp',
      selected: false,
    },
    {
      id: 5,
      name: 'image 5',
      img: '/image-5.webp',
      selected: false,
    },
    {
      id: 6,
      name: 'image 6',
      img: '/image-6.webp',
      selected: false,
    },
    {
      id: 7,
      name: 'image 7',
      img: '/image-7.webp',
      selected: false,
    },
    {
      id: 8,
      name: 'image 8',
      img: '/image-8.webp',
      selected: false,
    },
    {
      id: 9,
      name: 'image 9',
      img: '/image-9.webp',
      selected: false,
    },
    {
      id: 10,
      name: 'image 10',
      img: '/image-10.jpeg',
      selected: false,
    },
    {
      id: 11,
      name: 'image 11',
      img: '/image-11.jpeg',
      selected: false,
    },
  ])

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
      <header className='header'>
        <div className='itemCount'>
          <input type='checkbox' checked={selectedProductCount > 0} />
          <h3>
            {selectedProductCount} File{selectedProductCount >= 1 ? 's ' : ' '}
            Selected
          </h3>
        </div>
        <button onClick={handleDelete}>delete</button>
      </header>
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
