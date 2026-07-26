import React, { memo, useEffect } from 'react';
import { X, Trash2, Minus, Plus, Compass } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQty: number) => void;
  updateItemNotes: (productId: string, notes: string) => void;
  handlePopulateFormWithCart: () => void;
  totalCartValue: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = memo(({
  cartOpen,
  setCartOpen,
  cart,
  setCart,
  removeFromCart,
  updateQuantity,
  updateItemNotes,
  handlePopulateFormWithCart,
  totalCartValue
}) => {
  useEffect(() => {
    if (cartOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setCartOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in" 
      onClick={() => setCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div 
        className="w-full sm:max-w-md md:max-w-lg bg-[#F5F2ED] h-full shadow-2xl border-l border-[#00214E]/20 flex flex-col justify-between p-4 sm:p-5 md:p-8 animate-slide-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div>
          <div className="flex justify-between items-start border-b border-[#00214E]/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#2E6DAE]">Logistics Desk</span>
              <h3 id="cart-drawer-title" className="text-lg sm:text-xl md:text-2xl font-serif italic font-medium text-[#00214E]">Requisition Basket</h3>
            </div>
            <button 
              onClick={() => setCartOpen(false)}
              className="p-2 border border-[#00214E]/15 hover:bg-[#00214E] hover:text-[#F5F2ED] transition-colors rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#2E6DAE]"
              aria-label="Close Basket"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Basket Content */}
          {cart.length > 0 ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600 mb-4 font-mono">You have compiled the following technical supplies. Customize quantities or specify custom specs below.</p>
              
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-white border border-[#00214E]/10 p-4 relative rounded-xl shadow-sm">
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="absolute top-3 right-3 p-1.5 hover:bg-blue-50 text-gray-400 hover:text-[#2E6DAE] rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center focus:outline-none"
                      title="Remove item"
                      aria-label={`Remove ${item.product.name} from basket`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex gap-3">
                      <img 
                        src={item.product.imageUrl} 
                        className="w-12 h-12 md:w-14 md:h-14 object-cover border border-gray-100 flex-shrink-0 rounded-lg" 
                        alt={item.product.name} 
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-[9px] font-mono text-[#2E6DAE] font-bold">IMPA {item.product.impaCode}</span>
                        <h4 className="text-xs sm:text-sm font-bold truncate text-[#00214E]">{item.product.name}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.product.category}</p>
                      </div>
                    </div>

                    {/* Adjust qty and price */}
                    <div className="mt-3 pt-3 border-t border-dashed border-[#00214E]/10 flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-[#00214E]/15 bg-[#F5F2ED] rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2.5 hover:bg-[#00214E]/5 text-xs font-bold min-w-[36px] min-h-[36px] flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2.5 hover:bg-[#00214E]/5 text-xs font-bold min-w-[36px] min-h-[36px] flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] text-gray-400 uppercase block">Est. Price</span>
                        <span className="text-xs font-bold text-[#00214E]">${item.product.priceEstimate * item.quantity}</span>
                      </div>
                    </div>

                    {/* Custom Specs */}
                    <div className="mt-2.5">
                      <input 
                        type="text"
                        placeholder="Add dimension / material grade notes..."
                        value={item.customNotes || ''}
                        onChange={(e) => updateItemNotes(item.product.id, e.target.value)}
                        className="w-full bg-[#F5F2ED]/50 border border-[#00214E]/10 p-2 text-[10px] font-mono focus:outline-none focus:border-[#2E6DAE] min-h-[36px] rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-[#00214E]/10 pt-4 mt-6">
                <div className="flex justify-between items-center text-xs font-mono font-bold mb-2">
                  <span className="opacity-60">TOTAL DIRECT ITEMS</span>
                  <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between items-center text-sm font-mono font-extrabold border-b border-[#00214E]/10 pb-4 mb-4">
                  <span className="text-[#2E6DAE]">ESTIMATED VALUE</span>
                  <span className="text-base text-[#00214E]">${totalCartValue}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-4 border border-dashed border-[#00214E]/10 bg-white p-6 rounded-xl">
              <Compass className="w-10 h-10 text-gray-300" />
              <h4 className="text-base font-serif italic text-gray-800">Your basket is currently empty</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">Add high-fidelity marine hardware and technical items from the supply catalogue to assemble an operational RFQ.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#00214E] text-white hover:bg-[#2E6DAE] text-xs uppercase tracking-wider font-bold min-h-[44px] rounded-lg"
              >
                Browse Directory
              </button>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        {cart.length > 0 && (
          <div className="mt-auto border-t border-[#00214E]/10 pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                handlePopulateFormWithCart();
                setCartOpen(false);
              }}
              className="w-full bg-[#2E6DAE] text-white py-3.5 text-xs uppercase tracking-widest font-bold text-center transition-all hover:bg-[#2E6DAE]/90 min-h-[48px] rounded-lg"
            >
              Populate RFQ Inquiry Form
            </button>
            <button
              onClick={() => setCart([])}
              className="w-full bg-white border border-[#00214E]/10 text-gray-500 py-3 text-xs uppercase tracking-widest font-semibold text-center transition-all hover:text-[#2E6DAE] hover:border-[#2E6DAE] min-h-[44px] rounded-lg"
            >
              Clear Requisition Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
});

CartDrawer.displayName = 'CartDrawer';
