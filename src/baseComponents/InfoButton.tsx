interface InfoButtonProps {
  value: string;
  isOrganization?: boolean;
  Flag: boolean;
  isLoading?: boolean; // ⏳ حالت در حال لود شدن
  onClick: (accountNumber: string, isOrganization: boolean) => void;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
  value,
  isOrganization = false,
  Flag,
  isLoading = false,
  onClick
}) => {
  const disabled = value.length === 0 || isLoading;

  return (
    <span
      className={`text-[12px] my-2 ${
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "hover:cursor-pointer text-blue-600"
      }`}
      onClick={() => {
        if (!disabled) onClick(value, isOrganization);
      }}
    >
      {isLoading
        ? "⏳ در حال دریافت اطلاعات..."
        : Flag
        ? "✔️ نمایش اطلاعات"
        : "❌ نمایش اطلاعات"}
    </span>
  );
};
