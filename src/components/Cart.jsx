import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <aside style={{ padding: "16px", borderTop: "1px solid #ccc" }}>
      <h2>Seu carrinho</h2>
      {items.length === 0 ? (
        <p>Nenhuma carta adicionada ainda.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ textTransform: "capitalize" }}>
              {item.name} - R$ {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button onClick={() => dispatch(clearCart())}>Limpar carrinho</button>
      )}
    </aside>
  );
}

export default Cart;
