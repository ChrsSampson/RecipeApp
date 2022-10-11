
// parse out the ridiculous format this api send the ingredients in
function parseIngredients (data) {
  const meal = data
  const keys = Object.keys(meal)

  let output = []
  for(let i = 1; i < 21; i++){
    const obj = { "ingredient": meal[`strIngredient${i}`], "measurement": meal[`strMeasure${i}`]}
    output.push(obj)
  }
  // console.log(output)
  return output;
}


module.exports = parseIngredients