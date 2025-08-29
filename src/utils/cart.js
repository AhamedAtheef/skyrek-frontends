/* [
  {
    productId:"C001",
    quantity: 3,
    price: 15.99,
    name: "MatteLipstick",
    altNames: ['VelvetLipColor', 'Long-LastingLipstick'],
    image: "https://example.com/images/matte-lipstick.jpg"
  },
  {
    productId: "C002",
    quantity: 2,
    price: 22.50,
    name: "HydratingFaceSerum",
    altNames: ['GlowSerum', 'SkinBooster'],
    image: "https://example.com/images/face-serum.jpg"
  },
  {
    productId: "C003",
    quantity: 1,
    price: 35.00,
    name: "MineralFoundation",
    altNames: ['NaturalFinishFoundation', 'PowderFoundation'],
    image: "https:example.com/images/foundation.jpg"
  },
  {
    productId: "C004",
    quantity: 4,
    price: 12.75,
    name: "WaterproofMascara",
    altNames: ['VolumeMascara', 'Smudge-ProofMascara'],
    image: "https://example.com/images/mascara.jpg"
  }
] */


// utils/cart.js

export function getCart() {
  let cartInstring = localStorage.getItem("cart");

  // ✅ also check for empty string
  if (!cartInstring || cartInstring === "null") {
    cartInstring = "[]";
    localStorage.setItem("cart", cartInstring);
  }

  return JSON.parse(cartInstring);
}

export function addCart(product, qty) {
  const cart = getCart();//get cart

  // Check if product already exists
  const existingProductIndex = cart.findIndex(item => item.productId === product.productId);
  
  //cart is empty
  if (existingProductIndex === -1) {

    // New product → add with quantity
    cart.push({ ...product, quantity: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // Update quantity
    const newQty = cart[existingProductIndex].quantity + qty;

    if (newQty <= 0) {
      // Remove product if qty <= 0
      const newCart = cart.filter((item, index) => index !== existingProductIndex);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    } else {

      // Set updated quantity
      cart[existingProductIndex].quantity = newQty;
      // Save updated cart
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }
}

