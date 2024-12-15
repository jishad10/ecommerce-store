import { getOrders } from "@/lib/actions/action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const Orders = async () => {
  const { userId } = await auth();
  const orders = await getOrders(userId as string);

  // Debug log with safety checks
  console.log(orders?.[0]?.products);

  return (
    <div className="px-10 py-5 max-sm:px-3 bg-gray-50 min-h-screen">
      <p className="text-3xl font-bold text-blue-900 text-center mb-16">
        Your Orders
      </p>
      {(!orders || orders.length === 0) && (
        <p className="text-lg font-semibold text-red-600 text-center mb-16">
          You have no orders yet.
        </p>
      )}

      <div className="space-y-10">
        {orders?.map((order: OrderType) => (
          <div
            key={order._id} // Add a unique key
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold text-blue-900">
                Order ID: {order._id}
              </p>
              <p className="text-lg font-semibold text-green-600">
                Total Amount: ${order.totalAmount}
              </p>
            </div>

            <div className="space-y-6">
              {order.products?.map((orderItem: OrderItemType) => (
                <div
                  key={orderItem.product._id}
                  className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  {/* Product Image */}
                  <Image
                    src={orderItem.product.media?.[0] || "/placeholder.jpg"} // Add a fallback image
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col space-y-2">
                    <p className="text-base font-medium text-gray-700">
                      Title:{" "}
                      <span className="font-bold text-gray-900">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-base font-medium text-gray-700">
                        Color:{" "}
                        <span className="font-bold text-gray-900">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-base font-medium text-gray-700">
                        Size:{" "}
                        <span className="font-bold text-gray-900">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-base font-medium text-gray-700">
                      Unit price:{" "}
                      <span className="font-bold text-gray-900">
                        ${orderItem.product.price}
                      </span>
                    </p>
                    <p className="text-base font-medium text-gray-700">
                      Quantity:{" "}
                      <span className="font-bold text-gray-900">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
