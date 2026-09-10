import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function buscarCartas() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=12",
        );

        const listaFormatada = response.data.results.map((pokemon, index) => {
          const id = index + 1;
          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            price: Number((Math.random() * 50 + 10).toFixed(2)),
          };
        });

        setProdutos(listaFormatada);
      } catch (err) {
        setError(
          "Não foi possível carregar as cartas. Tente novamente mais tarde.",
        );
      } finally {
        setLoading(false);
      }
    }

    buscarCartas();
  }, []);

  if (loading) return <p>Carregando cartas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <img src={produto.image} alt={produto.name} width="96" height="96" />
          <p style={{ textTransform: "capitalize" }}>{produto.name}</p>
          <p>R$ {produto.price.toFixed(2)}</p>
          <button onClick={() => dispatch(addItem(produto))}>Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
