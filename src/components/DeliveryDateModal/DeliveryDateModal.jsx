const DeliveryDateModal = ({ isOpen, onClose, setDeliveryDate, handleAddToCart }) => {
  if (!isOpen) return null;

  const dates = [
    { day: "Wed", date: "Mar 11", full: "2026-03-11" },
    { day: "Thu", date: "Mar 12", full: "2026-03-12" },
    { day: "Fri", date: "Mar 13", full: "2026-03-13" },
    { day: "Sat", date: "Mar 14", full: "2026-03-14" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[750px] rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">Select Delivery Date</h2>
          <X className="cursor-pointer" onClick={onClose} />
          <div>
            {dates.map((item, i) => (
                <div key={i} className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300" />
                <p className="text-sm text-gray-500">
                    {item.day}, {item.date}
                </p>
                </div>
            ))} 
            {dates.map((item, i) => {
                const currentDate = new Date(item.date); // make sure item.date is a date string or timestamp
                const nextDay = new Date(currentDate);
                nextDay.setDate(currentDate.getDate() + 1); // adds one day safely

                // Format it nicely
                const formattedDate = nextDay.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

                return (
                    <div key={i} className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                );
                })}
            </div>
        </div>

        <div className="p-6">

          <p className="mb-4 font-medium">
            When would you like it delivered?
          </p>
          <div className="mb-6 flex items-center gap-4">
            <div>

            </div>
            <div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <p
            {dates.map((item, i) => (

              <div
                key={i}
                onClick={() => setDeliveryDate(item.full)}
                className="cursor-pointer rounded-lg border p-4 text-center hover:border-purple-500"
              >
                <p className="text-xs text-gray-500">{item.day}</p>
                <p className="text-sm font-semibold">{item.date}</p>
              </div>

            ))}

          </div>

        </div>

        <div className="flex gap-4 border-t p-5">

          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            onClick={handleAddToCart}
          >
            Next
          </Button>

        </div>

      </div>
    </div>
  );
};