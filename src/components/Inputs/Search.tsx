import type { ISearchProps } from "../../types/components/InputsProps";

const Search = ({ handleSearch, show }: ISearchProps) => {
  console.log(show);
  return (
    <input
      type="search"
      className={`form-control-lg border p-0 ps-1 input-group w-auto rounded-2 ${
        !show && "d-none"
      }`}
      placeholder="Search"
      onChange={handleSearch}
    />
  );
};

export default Search;
