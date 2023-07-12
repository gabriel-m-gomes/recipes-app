import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <div>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            alt="Bebidas"
            src="../images/drinkIcon.svg"
          />
        </Link>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src="../images/mealIcon.svg"
            alt="Comidas"
          />
        </Link>
      </div>
    </div>
  );
}
