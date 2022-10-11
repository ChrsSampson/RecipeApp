// where a user can view all the recipes that they have liked and intereact with them
import React from 'react';
import { useEffect, useState } from 'react';
import sendRequest from '../../../lib/sendRequest.js';

import Display from '../components/display';

const Favorites = (props) => {

  const [favorites, setFavorites] = useState([]);
  const [list, setList] = useState('')

  // send a query to the server to find out what each ID means
  // this function is gross
  const resolveList = (collection) => {
    let arr = []
    collection.forEach((item, key) => {
      sendRequest(`/recipe/${item.recipeId}`, 'GET')
        .then(res => {
          arr.push(res.data[0])
        })
    })
    setFavorites(arr);
  }

  const getFavorites = () => {
    const data = { "userId": props.user.userId };
    sendRequest('/like/findAll', 'POST', data)
      .then(res => {
        return res.data
      })
      .then(data => {
        resolveList(data)
      })
  }

  const createElements = () => {
    const r = favorites.map((item, key) => {
      return <Display key={key} id={item.apiId} title={item.title} img={item.image} />
    })
    setList(r)
  }

  useEffect(() => {
    getFavorites();
  }, [])

  useEffect(() => {
    createElements()
  })

  return (
    <section>
      <h1>Liked Recipes</h1>
      <div>
        {list.length > 0 ?
          list
          :
          "nothing here yet"
        }
      </div>
    </section>
  )
}

export default Favorites