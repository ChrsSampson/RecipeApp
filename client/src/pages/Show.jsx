// Show a specific recipe in detail
import React from 'react';
import sendRequest from '../../../lib/sendRequest.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ListItem from '../components/listItem';
import LikeButton from '../components/likeButton';

const Show = (props) => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [liked, setLiked] = useState(false);
  let ingredients = '';

  const parseIngredients = (collection) => {
    return collection.map((item, key) => {
      if (item.measurement && item.ingredient) {
        return <ListItem key={key} value1={item.measurement} value2={item.ingredient} />
      }
    })
  }

  const determineLikeStatus = (id) => {
    const data = {userId: props.user.userId, recipeId: id}
    sendRequest('/like/find', 'POST', data)
      .then(result => {
        if (result.data[0] !== undefined) {
          setLiked(true)
        }
      })
  }

  // togle liked status
  const handleLike = () => {
    const data = { 'userId': props.user.userId, 'recipeId': id }
    if(liked){
      // unlike the recipe
      sendRequest('/like/unlike', 'POST', data)
        .then(res => {
          setLiked(false);
        })
    } else {
      // like the recipe
      sendRequest('/like', 'POST', data)
        .then(res => {
          setLiked(true);
        })
    }
  }

  // load the page
  useEffect(() => {
    const data = {"id": id}
    sendRequest(`/recipe/search/${id}`, 'POST', data)
      .then(res => {
        setItem(res.data[0])
      })
    determineLikeStatus(id);
  }, [])

  return (
    <div>
      {item !== null ?
        <article className="Show">
          <div className="header">
            <h1>{item.title}</h1>
            <LikeButton liked={liked} onClick={handleLike} />
          </div>
          <ul>
            <li>Category: {item.category}</li>
            <li>Origin: {item.area}</li>
          </ul>
          <div className="content">
            <img src={item.image} />
            <div className="ingredients">
              <h3>Ingredients</h3>
              <ul>
                {parseIngredients(JSON.parse(item.ingredients))}
              </ul>
            </div>
          </div>
          <div>
            <p>{item.instructions}</p>
            <sub><a href={item.source}>Source</a></sub>
          </div>
        </article>
        :
        // change this to a loading overlay
        <h3>Loading...</h3>
      }
    </div>
  )
}

export default Show;