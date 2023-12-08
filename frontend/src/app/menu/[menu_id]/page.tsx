"use client"

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MenuDetails = () => {
  const router = useRouter();
  const { menu_id } = router.query;

  useEffect(() => {
    if (menu_id) {
      // Fetch menu details using the menu_id from the route parameters
      // You can make an API call here to get the details for the specific menu_id
      console.log('Fetching details for menu ID:', menu_id);
    }
  }, [menu_id]);

  if (!menu_id) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div>
      <h1>Menu Details for ID: {menu_id}</h1>
      {/* Render the details for the specific menu_id */}
    </div>
  );
};

export default MenuDetails;
