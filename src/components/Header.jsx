import { useSelector } from "react-redux";

function Header() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((soma, item) => soma + item.price, 0);

  return (
    <header style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
      <h1>🃏 Cofre Nerd</h1>
      <p>
        Itens no carrinho: <strong>{items.length}</strong> | Total:{" "}
        <strong>R$ {total.toFixed(2)}</strong>
      </p>
    </header>
  );
}

export default Header;
