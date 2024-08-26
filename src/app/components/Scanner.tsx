import React from 'react'

interface ScannerProps {
  onScanComplete: (items: any[]) => void
}

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const handleScan = () => {
    // ... existing code ...
  }

  return (
    <div>
      <button onClick={handleScan}>Scan for Non-Integer Values</button>
    </div>
  )
}

export default Scanner