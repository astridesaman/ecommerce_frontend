"use client";

import Container from "../components/ui/container";
import Billboard from "../components/Billboard";
import ProductList from "../components/Products-list";
import { useState, useEffect } from "react";

const HomePage = () => {
    const [products] = useState([]);

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
                        imageUrl: 'https://source.unsplash.com/1600x900/?fashion' 
                    }} 
                />
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
