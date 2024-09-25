"use client"
import { useEffect, useState, useRef } from "react";
import { orderSample } from "@/constants/utils/orderSample";
import { OrderCard } from "./OrderCard";

export const FilledOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null); 
  const containerRef = useRef<HTMLDivElement>(null);
console.log(selectedOrder);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = containerHeight / (orderSample.length/2); 
    }
  }, [orderSample]);

  function scroll(index:any) {
      setSelectedOrder(index)
      console.log(" hhhhh",selectedOrder);

  }
  return (
    <div className="w-full">
      <h3 className="text-lg font-normal mb-4">Filled Orders</h3>

      <div
        ref={containerRef}
        className="px-6 h-[400px] overflow-y-auto scrollbar-hide scroll-smooth" 
      >
        {orderSample.map((order, index) => (
          <div
            key={order.id}
            className={`py-4 transition-all duration-500 ${
              selectedOrder == index ? "z-50" : "filledInActive z-0"
            }`}
            onScrollCapture={() => scroll(index)} 
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
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
