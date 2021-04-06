import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [shoppingListItems, setShoppingListItems] = useState([])
  const [shoppingListTotal, setShoppingListTotal] = useState([])


  //Requires the api/json filename.
  //After fetching the request, it sets the shoppingListItems and the shoppingListTotal variables.
  //The shoppingListItems includes the product metadata(eg. imageUrl) as it's merged.
  const loadList = (path) => {
    const url = "https://raw.githubusercontent.com/xEvilCorp/FrontendExperiments/master/Experiments/shopping-list/host/"+ path +".json";

    axios.get(url).then(response => {
        let data = response.data;
        setShoppingListTotal(data.value);
        let itemsInfo = data.items;
        let itemsMetadata = data.itemMetadata.items;
        let items = itemsMetadata.map(x => Object.assign(x, itemsInfo.find(y => y.id === x.id)));
        setShoppingListItems(items);
    });
  }


  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
