export const addItemToCart = (items, itemToAdd) => {
  const existingItem = items.find(item => item.id === itemToAdd.id);

  if (existingItem) {
    const newItems = items.map(item => item.id === itemToAdd.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
    )

    return newItems;
  }

  const newItems =  [...items, { ...itemToAdd, quantity: 1 }]

  return newItems;
}