import React from 'react';
import './MenuButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const MenuButton = ({ goto, icono, text }) => {
  const location = useLocation();
  const isActive = location.pathname === goto;

  return (
    <Link to={goto} className={`contenedor ${isActive ? 'active' : ''}`}>
      <FontAwesomeIcon
        icon={icono}
        className={`icon ${isActive ? 'active' : ''}`}
      />
      {text && (
        <div className={`texto-menu ${isActive ? 'active' : ''}`}>{text}</div>
      )}
    </Link>
  );
};

export default MenuButton;
