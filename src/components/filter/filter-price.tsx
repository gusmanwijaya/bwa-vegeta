// components
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface IPrice {
  min?: number;
  max?: number;
}

interface FilterPriceProps {
  value?: IPrice;
  onChange: (price: IPrice) => void;
}

const FilterPrice: React.FC<FilterPriceProps> = ({ value, onChange }) => {
  const [price, setPrice] = useState<IPrice | undefined>(value);

  useEffect(() => {
    if (price) onChange(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  return (
    <>
      <div className="text-base">Harga Minimum</div>
      <div className="my-4 relative">
        <Input
          className="w-[100%]"
          type="text"
          placeholder=""
          prefix="text-Rp"
          value={price?.min}
          onChange={(value) =>
            setPrice({ ...price, min: +value?.target?.value })
          }
        />
      </div>
      <div className="text-base">Harga Maksimum</div>
      <div className="my-4 relative">
        <Input
          className="w-[100%]"
          type="text"
          placeholder=""
          prefix="text-Rp"
          value={price?.max}
          onChange={(value) =>
            setPrice({ ...price, max: +value?.target?.value })
          }
        />
      </div>
    </>
  );
};

export default FilterPrice;
