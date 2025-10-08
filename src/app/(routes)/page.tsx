"use client";

import Container from "../components/ui/container";
import Billboard from "../components/Billboard";
import ProductList from "../components/Products-list";
import { useState, useEffect } from "react";
import { mockProducts } from "../lib/mockProducts";

const HomePage = () => {
    const [products] = useState([]);
    const mockproducts = mockProducts;


    useEffect(() => {
        const loadProducts = async () => {
            try {
                console.log("test")
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        loadProducts();
    }, []);

    return (
        <Container>
            <div className="pb-10 space-y-10">
                <Billboard 
                    data={{ 
                        id: '1ed54d58-f16f-420e-8750-9c9cccdeedb3', 
                        label: 'Welcome to our store', 
                        imageUrl: 'https://images.unsplash.com/photo-1609320552296-3e2bd42ee3ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
                    }} 
                />
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                    {/* <ImageList title="Produits en mock" items={mockproducts} /> */}
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
