import React from 'react'
import { NonIntegerItem } from '../../types'

interface ResolverProps {
  items: NonIntegerItem[]
  onResolve: (id: string) => void
}

const Resolver: React.FC<ResolverProps> = ({ items, onResolve }) => {
  // ... existing code ...

  return (
    <div>
      <h2>Non-Integer Values Found:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.value}
            <button onClick={() => onResolve(item.id)}>Resolve</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Resolver