"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { orderSample } from "@/constants/utils/orderSample";
import { OrderCard } from "./OrderCard";

export const OpenOrder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = 176;

      const centerIndex = Math.round((scrollLeft + containerWidth / 2) / cardWidth) - 1;
      setCurrentIndex(centerIndex);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollPosition - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full py-4 open-orders">
      <h3 className="text-lg font-normal mb-4 ml-4">Open Orders</h3>

      {/* Left Arrow */}
      <button
        onClick={() => containerRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
        className="absolute left-[-5%] top-[55%] transform -translate-y-1/2 z-20 p-2 rounded-full hidden sm:block"
      >
        <Image src="/Arrow-left.svg" alt="Scroll Left" width={40} height={40} />
      </button>

      <div
        ref={containerRef}
        className="h-80 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div className="flex gap-6">
          {orderSample.map((order, index) => (
            <div
              key={order.id}
              className={`py-4 transition-all duration-500 z-10 flex-none ${index === currentIndex ? "scale-110" : "scale-100"}`}
            >
              <div className="w-32 h-52 sm:w-44 sm:h-72 m-auto ml-4">
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

      {/* Right Arrow */}
      <button
        onClick={() => containerRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
        className="absolute right-[-7%] top-[55%] transform -translate-y-1/2 z-20 p-2 rounded-full hidden sm:block"
      >
        <Image src="/Arrow-right.svg" alt="Scroll Right" width={40} height={40} />
      </button>
    </div>
  );
};
