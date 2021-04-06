import React from 'react';
import './style.css';

function ShoppingListItemCard({ item }) {
    return (
        <article className="item-card">
            <div className="item-image">
                <img src={item.imageUrl} alt=""/>
            </div>
            <section className="item-card-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">{item.price}</p>
                <p className="item-selling-price">{item.sellingPrice}</p>
            </section>
        </article>
    );
}

export default ShoppingListItemCard;
