export default function SellerOrderStepper({ status = "pending" }) {
  const steps = [
    { id: "pending", label: "Pending" },
    { id: "inspecting", label: "Inspecting" },
    { id: "approved", label: "Approved" },
    { id: "sold", label: "Sold" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === status);

  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
            ${
              index <= currentIndex
                ? "bg-emerald-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
          </div>

          <span className="ml-2 text-sm">{step.label}</span>

          {index < steps.length - 1 && (
            <div
              className={`w-10 h-[2px] mx-2 ${
                index < currentIndex ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
