'use client';
import { MouseEventHandler } from "react";

export const Btn = ({ text, css, onClick }: { text: string; css?: string; onClick?: MouseEventHandler | undefined }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#2A2A2ACC] w-fit py-2 px-2 rounded-md cursor-pointer u-btn1 ${css}`}
    >
      {text}
    </div>
  );
};
