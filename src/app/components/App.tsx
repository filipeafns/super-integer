import React from 'react'
import '../styles/ui.css'
import { useEffect, useState } from 'react'
import { NonIntegerItem } from '../../types'
import Scanner from './Scanner'
import Resolver from './Resolver'

function App() {
  const [nonIntegerItems, setNonIntegerItems] = useState<NonIntegerItem[]>([])
  // ... existing code ...

  return (
    <div className="wrapper">
      <Scanner onScanComplete={handleScanComplete} />
      {nonIntegerItems.length > 0 && (
        <Resolver items={nonIntegerItems} onResolve={handleResolve} />
      )}
    </div>
  )
}

export default App