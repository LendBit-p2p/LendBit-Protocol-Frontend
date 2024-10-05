"use client";
import { useEffect, useState, useRef } from "react";
import { OrderCard } from "./OrderCard";
import { cardGradient } from "@/constants/utils/cardGradient";

export const FilledOrder = ({ orderSample }: any) => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = containerHeight / 2.68;
    }
  }, [orderSample]);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const containerBottom = containerRef.current.getBoundingClientRect().bottom;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardTop = cardRect.top;
          const cardBottom = cardRect.bottom;

          if (cardTop >= containerTop && cardBottom <= containerBottom) {
            setSelectedOrder(index);
          }
        }
      });
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-normal mb-4">Filled Orders</h3>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="px-6 h-[410px] overflow-y-auto scrollbar-hide scroll-smooth"
      >
        {orderSample.map((order: any, index: number) => {
          const randomGradient = cardGradient[Math.floor(Math.random() * cardGradient.length)] || "/gradients1.svg";
          return (
            <div
              key={order.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`py-4 transition-all duration-500 ${
                selectedOrder === index ? "z-10" : "filledInActive z-0"
              }`}
            >
              <div className="w-[192px] h-[296px] m-auto">
                <OrderCard
                  id={order.id}
                  type={order.type}
                  amount={order.amount}
                  token={order.token}
                  date={order.date}
                  icon1={order.icon1}
                  icon2={order.icon2}
                  isSelected={selectedOrder === index}
                  cardGradient={randomGradient}
                  style={
                    selectedOrder === index
                      ? { boxShadow: "0 0 15px 10px rgba(25, 75, 255, 0.4)" }
                      : { filter: "blur(3px)" }
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
