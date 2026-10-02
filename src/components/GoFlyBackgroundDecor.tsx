import React from 'react';
import { BusinessBackgroundDecor } from './BusinessBackgroundDecor';

/**
 * Re-export BusinessBackgroundDecor for backward compatibility.
 */
export const GoFlyBackgroundDecor: React.FC = () => {
  return <BusinessBackgroundDecor />;
};

export { BusinessBackgroundDecor };
