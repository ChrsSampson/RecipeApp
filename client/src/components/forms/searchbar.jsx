// search bar that can send query strings to various endpoints
import React from 'react'
import {useState} from 'react'

const Searchbar = (props) => {

  const [query, setQuery] = useState('')
  const [property, setProperty] = useState('ingredient')

  const handleSubmit = (event) => {
    props.handleSearch(event, query, property);
  }

  return (
    <form>
      <select onChange={(e) => {setProperty(e.target.value)}}>
        <option value="ingredient">Main Ingredient</option>
        <option value="title">Name</option>
        <option value="tag">Tag</option>
      </select>
      <input
        required
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => { setQuery(e.target.value) }}
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </form>
  )
}

export default Searchbar