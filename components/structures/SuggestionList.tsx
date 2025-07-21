interface SuggestionListProps {
  suggestions: string[];
  onSelectSuggestion?: (suggestion: string) => void;
}

export default function SuggestionList({
  suggestions,
  onSelectSuggestion,
}: SuggestionListProps) {
  if (suggestions.length === 0) return null;

  return (
    <div>
      <p className="font-medium">Suggestions:</p>
      <ul className="list-disc list-inside">
        {suggestions.map((store) => (
          <li
            key={store}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1"
            onClick={() => onSelectSuggestion?.(store)}
          >
            {store}
          </li>
        ))}
      </ul>
    </div>
  );
}
