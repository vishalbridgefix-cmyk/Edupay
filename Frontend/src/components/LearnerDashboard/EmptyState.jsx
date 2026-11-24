
import { BookOpen } from "lucide-react";

function EmptyState({ message }) {
  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white p-5 text-center">
      <BookOpen size={26} className="mb-2 text-gray-300" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default EmptyState;
