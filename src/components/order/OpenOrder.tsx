"use client";
import { useEffect, useRef, useState } from "react";
import { orderSample } from "@/constants/utils/orderSample";
import { OrderCard } from "./OrderCard";

export const OpenOrder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the currently focused card index

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = 176; // Width of your card, adjust as necessary
      const index = Math.round(scrollLeft / cardWidth); // Calculate index based on scroll position
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    // Center the first card on load
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0; // Start at the beginning
    }

    // Attach the scroll event listener
    const currentContainer = containerRef.current;
    currentContainer?.addEventListener("scroll", handleScroll);

    return () => {
      currentContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full py-4">
      <h3 className="text-lg font-normal mb-4 ml-4">Open Orders</h3>

      <div
        ref={containerRef}
        className="h-80 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="flex gap-6">
          {orderSample.map((order, index) => (
            <div
              key={order.id}
              className={`py-4 transition-all duration-500 z-10 flex-none ${
                index === currentIndex
                  ? "scale-110" // Scale up the current card
                  : "scale-100" // Maintain the normal scale for others
              }`}
            >
              <div className="w-44 h-72 m-auto ml-4">
                <OrderCard
                  id={order.id}
                  type={order.type}
                  amount={order.amount}
                  token={order.token}
                  date={order.date}
                  icon1={"/edit.svg"}
                  icon2={"/delete.svg"}
                  isSelected={currentIndex === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
