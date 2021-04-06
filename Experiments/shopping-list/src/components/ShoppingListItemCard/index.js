import React from 'react';
import './style.css';
import { toCurrencyBRL } from '../../helpers/CurrencyConverter.js';

function ShoppingListItemCard({ item }) {
    return (
        <article className="item-card">
            <div className="item-image">
                <img src={item.imageUrl} alt=""/>
            </div>
            <section className="item-card-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">{toCurrencyBRL(item.price)}</p>
                <p className="item-selling-price">{toCurrencyBRL(item.sellingPrice)}</p>
            </section>
        </article>
    );
}

export default ShoppingListItemCard;
