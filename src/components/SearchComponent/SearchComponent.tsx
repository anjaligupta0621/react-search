import React, { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
}

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [options, setOptions] = useState<Book[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput.length > 1) {
      const fetchData = async () => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=0&maxResults=20`
        );
        const data = await response.json();
        console.log(data.items);
        const books = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
        }));
        console.log(data.items);
        setOptions(books);
        setShowOptions(true);
      };
      fetchData();
    } else {
      setShowOptions(false);
    }
  }, [searchInput]);

  const handleOptionClick = (title: string) => {
    setSearchInput(title);
    setOptions([]);
    setShowOptions(false);
  };


  const handleFocus = () => {
    if (searchInput.length > 1) {
      setShowOptions(true);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onFocus={handleFocus}
        placeholder="Book"
      />
      {showOptions && options.length > 0 && (
        <div className="dropdown">
          {options.map((book, index) => (
            <div
              key={book.id}
              onClick={() => handleOptionClick(book.title)}
            >
              {book.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
