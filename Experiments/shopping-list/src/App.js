import React, { useState } from 'react';
import ShoppingListItemCard from './components/ShoppingListItemCard';
import { toCurrencyBRL } from './helpers/CurrencyConverter.js';
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
    <div className="app">
    <header className="app-header">
      <button onClick={() => loadList("abaixo-10-reais")}>
        ABAIXO DE R$10
      </button>
      <button onClick={() => loadList("acima-10-reais")}>
        ACIMA DE R$10
      </button>
    </header>
    <main>

      <h1 id="title">Meu carrinho</h1>
      <hr/>

      <section id="items-list">
        {shoppingListItems.map((item, i) => {
          return <ShoppingListItemCard key={i} item={item} />
        })}
      </section>
      
      <hr/>

      <div id="totals-info">
        <p>Total</p><p id="total">{toCurrencyBRL(shoppingListTotal)}</p>
      </div>

      {shoppingListTotal/100 > 10 &&
        <div className="green-alert">
          <p>Parabéns, sua compra tem frete grátis !</p>
        </div>
      }

      <hr/>

      <button id="finalize-button">Finalizar compra</button>
    </main>
  </div>
  );
}

export default App;
