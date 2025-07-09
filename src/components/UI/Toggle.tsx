interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle = ({ isOn, onToggle }: ToggleProps) => {
  return (
    <div
      className={`relative w-[51px] h-[31px] rounded-full cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-[#FFF782]" : "bg-[#7C7C7C]"
      }`}
      onClick={onToggle}
    >
      <div
        className={`
            absolute top-[2px] left-[2px]
            w-[27px] h-[27px] bg-[#FAFAF8] rounded-full
            shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)]
            transition-transform duration-300
            transform ${isOn ? "translate-x-[20px]" : "translate-x-0"}
          `}
      />
    </div>
  );
};

export default Toggle;
