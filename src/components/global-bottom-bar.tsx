export default function GlobalBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[34px] bg-transparent z-50 pointer-events-none">
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[144px] h-[5px] bg-black rounded-full"></div>
    </div>
  );
}