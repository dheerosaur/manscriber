import React, { useState, useEffect } from 'react'
import ImageView from './ImageView'
import ReadonlyFields from './ReadonlyFields'
import { URL } from './constants'
import './App.scss'

const initialState = {
  template_name: '---',
  fields: [],
}

function App() {
  const [data, setData] = useState(initialState)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetch(URL)
      .then(r => r.json())
      .then(r => setData(r.input_payload))
  }, [])

  const mutateAt = value => {
    const fields = data.fields.map((field, i) => {
      if (i === activeIndex) return { ...field, value }
      return field
    })
    setData({ ...data, fields })
  }

  const moveBy = by => {
    const n = data.fields.length
    setActiveIndex((activeIndex + by + n) % n)
  }

  return (
    <div className="App">
      <ImageView
        image={data.image}
        fields={data.fields}
        activeIndex={activeIndex}
        onEnter={value => mutateAt(value)}
        moveBy={moveBy}
      />
      <ReadonlyFields
        heading={data.template_name}
        fields={data.fields}
        activeIndex={activeIndex}
        onClick={setActiveIndex}
      />
    </div>
  )
}

export default App
