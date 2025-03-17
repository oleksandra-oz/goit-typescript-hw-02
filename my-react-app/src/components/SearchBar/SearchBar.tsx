import React, { useState } from "react";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === "") return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.searchBar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search images..."
        />
        <button className={s.button} type="submit">
          🔍
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
