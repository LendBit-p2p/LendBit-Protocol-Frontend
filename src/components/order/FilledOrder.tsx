"use client";
import { useEffect, useState, useRef } from "react";
import { OrderCard } from "./OrderCard";

export const FilledOrder = ({orderSample}:any) => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      containerRef.current.scrollTop = containerHeight / 2.68;
    }
  }, [orderSample]);

  // Handle scroll
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

  // Handle the start of mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartY(e.pageY - containerRef.current.offsetTop);
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  // Handle mouse movement during drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 2;
    containerRef.current.scrollTop = scrollTop - walk;
  };

  // Stop dragging
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full filled-orders">
      <h3 className="text-lg font-normal mb-4">Filled Orders</h3>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="px-6 h-[410px] overflow-y-auto scrollbar-hide scroll-smooth cursor-grab"
      >
        {orderSample.map((order : any, index : number) => (
          <div
            key={order.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            className={`py-4 transition-all duration-500 ${selectedOrder === index ? "z-10" : "filledInActive z-0"}`}
          >
            <div className="w-32 h-44 sm:w-44 sm:h-72 m-auto"> {/* Adjusted to make responsive */}
              <OrderCard
                id={order.id}
                type={order.type}
                amount={order.amount}
                token={order.token}
                date={order.date}
                icon1={order.icon1}
                icon2={order.icon2}
                isSelected={selectedOrder === index}
                style={
                  selectedOrder === index
                    ? { boxShadow: "0 0 15px 10px rgba(25, 75, 255, 0.4)" }
                    : { filter: "blur(3px)" }
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
