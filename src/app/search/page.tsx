// src/app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { mockProducts } from "../lib/mockProducts";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Filtrage simple (contient le mot dans le name ou category)
  const results = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return (
    <div className="p-6">
      {query ? (
        <h1 className="text-2xl font-bold mb-4">
          Résultats pour : <span className="text-green-600">{query}</span>
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-4">Rechercher un produit</h1>
      )}

      {/* Liste des résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{p.name}</h2>
              <p className="text-gray-600">{p.price} €</p>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé pour "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
