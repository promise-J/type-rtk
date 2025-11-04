import React, { useState } from 'react'
import { useGetItemsQuery, useAddItemMutation } from '../../redux/api/slices/itemSlice'

export const ItemsList: React.FC = () => {
  const { data: items, isLoading, isError, error } = useGetItemsQuery()
  const [addItem, { isLoading: adding }] = useAddItemMutation()
  const [name, setName] = useState('')

  const handleAdd = async () => {
    if (!name.trim()) return
    try {
      await addItem({ name }).unwrap()
      setName('')
    } catch (err) {
      console.error('Add failed', err)
    }
  }

  if (isLoading) return <p>Loading items...</p>
  if (isError) return <p>Something went wrong: {JSON.stringify(error)}</p>

  console.log({isLoading, isError, error, items})

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New item name"
          style={{ padding: 8, width: 300, marginRight: 8 }}
        />
        <button onClick={handleAdd} disabled={adding}>
          {adding ? 'Adding...' : 'Add Item'}
        </button>
      </div>

      <ul>
        {items?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
