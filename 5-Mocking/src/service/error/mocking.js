export const generateMockProducts = () => {
    const mockProducts = [];
    for (let i = 0; i < 100; i++) {
      mockProducts.push({
        _id: i + 1,
        name: `Product ${i + 1}`,
        description: `Description for Product ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1
    });
    }
    return mockProducts;
  };
  