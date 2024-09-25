import { CreateOrder } from "./CreateOrder";
import { FilledOrder } from "./FilledOrder";
import { OpenOrder } from "./OpenOrder";

const OrdersDetails = () => {
  return (
    <div className="bg-black py-6 w-full px-6 max-h-[547px]">
      <div className="flex justify-between w-full gap-4 h-full">
        <div className="w-[30%] h-full max-h-full">
          <FilledOrder />
        </div>
        <div className="w-[50%]">
          <OpenOrder />
        </div>
        <div className="w-[20%]">
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;

