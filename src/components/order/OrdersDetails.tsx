import { CreateOrder } from "./CreateOrder";
import { FilledOrder } from "./FilledOrder";
import { OpenOrder } from "./OpenOrder";

const OrdersDetails = ({orderSample}:any) => {
  return (
    <div className="bg-black py-6 w-full px-6 max-h-[560px]">
      <div className="flex justify-between w-full gap-4 h-full">
        <div className="w-[25%] h-full max-h-full">
          <FilledOrder orderSample={orderSample}/>
        </div>
        <div className="w-[55%] py-8 h-full max-h-full">
          <OpenOrder orderSample={orderSample} />
        </div>
        <div className="w-[20%] flex">
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;

