import { CreateOrder } from "./CreateOrder";
import { FilledOrder } from "./FilledOrder";
import { OpenOrder } from "./OpenOrder";

const OrdersDetails = ({orderSample}:any) => {
  return (
    <div className="bg-black py-6 w-full px-6 u-class-shadow-2">
      {/* Responsive Layout - Stack on small screens */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 ">
        {/* Filled Orders Section */}
        <div className="w-full md:w-[30%]">
          <FilledOrder orderSample ={orderSample} />
        </div>

        {/* Open Orders Section */}
        <div className="w-full md:w-[50%] py-8">
          <OpenOrder orderSample ={orderSample} />
        </div>

        {/* Create Order Section - Hidden on small screens */}
        <div className="hidden md:flex w-[20%]">
          <CreateOrder />
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
