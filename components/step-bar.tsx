interface StepBarProps {
  steps: number;
  currentStep: number;
}

export default function StepBar({ steps, currentStep }: StepBarProps) {
  return (
    <div className="flex w-full justify-between">
      {Array.from({ length: steps }, (_, idx) => idx + 1).map((step) => (
        <div
          key={step}
          className={`mx-1 h-2 flex-1 rounded-full ${
            step <= currentStep ? "bg-blue-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
