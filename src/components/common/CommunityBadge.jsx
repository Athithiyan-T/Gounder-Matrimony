import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const CommunityBadge = ({ communityName, categoryCode, categoryFull, size = "normal" }) => {
  const isBC = categoryCode === 'BC' || (categoryFull && categoryFull.includes('Backward Class') && !categoryFull.includes('Most'));

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
      <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: size === 'sm' ? '0.85rem' : '0.95rem' }}>
        {communityName}
      </span>
      <span className={isBC ? "badge-bc" : "badge-mbc"}>
        <ShieldCheck size={12} />
        {categoryCode || (isBC ? "BC" : "MBC")}
      </span>
    </div>
  );
};
