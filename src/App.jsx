import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar, Header, Products } from './components'

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Header />
        <Products />
      </>
    </Router>
  )
}

export default App

// Limitations
// Search Functionality: Currently, search operates by category, triggering an API call on every change event. This can be optimized by implementing debouncing in the API calls to reduce unnecessary requests and improve performance.

// Scrolling and Category Filter: When a category is initially selected, the products are correctly fetched based on the category. However, during infinite scrolling, all products are fetched instead of fetching them by the selected category. This issue arises from a limited understanding of how limit and skip parameters work with the dummy JSON API. I plan to improve my knowledge in this area to ensure more accurate product fetching.