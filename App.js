import React, { useState } from 'react';
import './App.css'; // Import CSS file


function App() {
  const [searchInput, setSearchInput] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(false);

  const handleSearch = async () => {
    // Replace the fetch call with a call to your API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const data = await response.json();
    setMeals(data.meals || []);
  };

  const handleMealClick = async (mealId) => {
    // Replace the fetch call with a call to your API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    setSelectedMeal(data.meals[0]);
  };

  const closeMealModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="App">
      <div>
    <div class = "meal-wrapper">
      <div class ="meal-search">
      <h2 class = "title">Find Meals With Your Ingredients</h2>
      <blockquote>People who love to eat are always the best people.<br></br>
      <cite>- Julia Child</cite>
      </blockquote>
    
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      </div>
      </div>

      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-item">
            <div className="meal-img">
              <img src={meal.strMealThumb} alt="food" />
            </div>
            <div className="meal-name">
              <h3>{meal.strMeal}</h3>
              <button onClick={() => handleMealClick(meal.idMeal)}>Get Recipe</button>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="meal-details-content">
          <h2 className="recipe-title">{selectedMeal.strMeal}</h2>
          <p className="recipe-category">{selectedMeal.strCategory}</p>
          <div className="recipe-instruct">
            <h3>Instructions:</h3>
            <p>{selectedMeal.strInstructions}</p>
          </div>
          <div className="recipe-meal-img">
            <img src={selectedMeal.strMealThumb} alt="" />
          </div>
          <div className="recipe-link">
            <a href={selectedMeal.strYoutube} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </div>
          <button onClick={closeMealModal} className="recipe-close-btn">
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
