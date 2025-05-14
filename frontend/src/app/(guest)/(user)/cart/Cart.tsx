export default function Cart() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {/* Cart Items */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 className="text-lg font-semibold">Watch A</h2>
                            <p className="text-sm text-gray-500">Price: $100</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-16 border rounded-md text-center"
                            />
                            <button className="text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h2 className="text-lg font-semibold">Watch B</h2>
                            <p className="text-sm text-gray-500">Price: $200</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                min="1"
                                defaultValue="2"
                                className="w-16 border rounded-md text-center"
                            />
                            <button className="text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>
                </div>

                {/* Total Price */}
                <div className="mt-6 text-right">
                    <h2 className="text-xl font-bold">Total: $500</h2>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}