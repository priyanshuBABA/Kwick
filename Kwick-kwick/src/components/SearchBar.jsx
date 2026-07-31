import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = "Search for food, groceries...", value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative group/search animate-fadeIn">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
        <Search className="h-6 w-6 text-gray-500 group-focus-within/search:text-[#FFD60A] transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-16 pr-8 py-5 border-[3px] border-white/10 rounded-[2.5rem] leading-none bg-black/30 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-8 focus:ring-[#FFD60A]/5 focus:border-[#FFD60A]/30 text-lg font-bold transition-all shadow-2xl"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute inset-0 rounded-[2.5rem] bg-white opacity-0 group-hover/search:opacity-[0.03] pointer-events-none transition-opacity duration-300" />
    </div>
  );
};
export default SearchBar;
