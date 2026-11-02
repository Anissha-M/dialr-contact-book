import React from 'react';

// Summary statistic cards displaying live contact counts
function SummaryCards({ counts }) {
  const cards = [
    {
      label: 'Total Contacts',
      value: counts.total || 0,
      icon: '👥',
      className: '',
    },
    {
      label: 'Favorites',
      value: counts.favorites || 0,
      icon: '⭐',
      className: 'active-fav',
    },
    {
      label: 'Work Contacts',
      value: counts.work || 0,
      icon: '💼',
      className: 'active-work',
    },
    {
      label: 'Other Contacts',
      value: counts.other || 0,
      icon: '📌',
      className: '',
    },
  ];

  return (
    <div className="summary-cards-grid">
      {cards.map((card, index) => (
        <div key={index} className={`summary-card ${card.className}`}>
          <div className="summary-icon-wrapper">{card.icon}</div>
          <div className="summary-content">
            <span className="summary-label">{card.label}</span>
            <span className="summary-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
