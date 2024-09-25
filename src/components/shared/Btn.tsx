
export const Btn = ({ text, css }: { text: string; css?: string }) => {
  return (
    <div
      className={`bg-[#2A2A2ACC] w-fit py-1 px-2 rounded-lg cursor-pointer ${css}`}
    >
      {text}
    </div>
  );
};
