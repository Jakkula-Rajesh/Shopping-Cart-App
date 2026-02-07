import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, LogOut, Package, History } from 'lucide-react';

export default function ItemList({ onLogout }) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching items:', err);
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/carts/user/cart', {
        headers: { Authorization: token },
      });
      setCartItems(response.data.items || []);
      setShowCart(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'No items in cart or error fetching cart';
      alert(msg);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/user/orders', {
        headers: { Authorization: token },
      });
      setOrders(response.data || []);
      setShowOrders(true);
    } catch (err) {
      alert('Error fetching orders');
    }
  };

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/carts',
        { itemId },
        { headers: { Authorization: token } }
      );
      setSuccessMessage(`Item added to cart!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error adding item to cart';
      alert(msg);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const cartResponse = await axios.get('/api/carts/user/cart', {
        headers: { Authorization: token },
      });
      
      const cartId = cartResponse.data._id;
      
      const orderResponse = await axios.post(
        '/api/orders',
        { cartId },
        { headers: { Authorization: token } }
      );
      
      setSuccessMessage('Order placed successfully!');
      setCartItems([]);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error placing order';
      alert(msg);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/users/logout',
        {},
        { headers: { Authorization: token } }
      );
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      onLogout();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error logging out';
      alert(msg);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-2xl text-gray-600">Loading items...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {localStorage.getItem('username')}</span>
              
              <button
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <Package className="w-5 h-5" />
                <span>Checkout</span>
              </button>
              
              <button
                onClick={fetchCartItems}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </button>
              
              <button
                onClick={fetchOrders}
                className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <History className="w-5 h-5" />
                <span>Order History</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 max-w-7xl mx-auto mt-6">
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Cart is empty</p>
            ) : (
              <ul className="space-y-2">
                {cartItems.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    Item ID: {item.itemId._id || 'N/A'} - Qty: {item.quantity}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowCart(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {showOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <ul className="space-y-2">
                {orders.map((order, index) => (
                  <li key={index} className="text-gray-700">
                    Order ID: {order._id} - Total: ${order.totalPrice}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowOrders(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Items</h2>
        
        {items.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No items available</p>
            <p className="text-sm mt-2">Check back later or add items to the store</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover bg-gray-200"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${item.price}</span>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
