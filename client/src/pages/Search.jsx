// search for recpies and display results
import React from 'react'
import { useState, useEffect } from 'react'
import sendRequest from '../../../lib/sendRequest.js';
import axios from 'axios';

import Searchbar from '../components/forms/searchbar';
import Display from '../components/display'

const Search = (props) => {

  const [result, setResults] = useState('')

  let items = []

  const handleSearchRequest = (url) => {
    const data = {"url": String(url)}
    sendRequest('http://localhost:3000/recipe/search', 'POST', data, true)
    .then(res => {
        setResults(res.data)
    })
    .catch(err => console.log(err))
  }

  const handleSearch = (e, query, propterty) => {
    e.preventDefault();
    switch (propterty) {
      case "tag":
        // search by tag
        handleSearchRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`)
        break;
      case "title":
        // search by name
        handleSearchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        break;
      default:
        // search by main ingredient
        handleSearchRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
    }
  }

  // create result list
  const createResultList = (collection) => {
    if (collection) {
      return collection.map((element, index) => {
        return <Display
          key={index}
          title={element.strMeal}
          img={element.strMealThumb}
          id={element.idMeal}
        />
      })
    }
  }



  return (
    <section className="Search">
      <Searchbar handleSearch={handleSearch} />
      <section className="results">
        {/* This is where the search results should go */}
        {createResultList(result) || "Search For Something" }
      </section>
    </section>
  )
}

export default Search;


