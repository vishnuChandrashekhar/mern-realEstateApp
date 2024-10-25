import React, { useState } from "react";

const Search: React.FC = () => {
  interface sidebarData {
    searchTerm: string;
    type: string;
    parking: boolean;
    furnished: boolean;
    offer: boolean;
    sort: string;
    order: string;
  }

  const [sidebarData, setSidebarData] = useState<sidebarData>({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  console.log(sidebarData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value, checked } = e.target as HTMLInputElement;

    const booleanFields = ["parking", "furnished", "offer"];

    if (id === "all" || id === "rent" || id === "sale") {
      setSidebarData({ ...sidebarData, type: id });
    }

    if (id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }

    if (booleanFields.includes(id) && e.target instanceof HTMLInputElement) {
      setSidebarData({ ...sidebarData, [id]: checked });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="all"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.offer === true}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Aminities:</label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.parking === true}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="h-5 w-5"
                onChange={handleChange}
                checked={sidebarData.furnished === true}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <select
              name="sort"
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="text-3xl font-semibold border-b-2 p-3 text-slate-700 mt-5">
        <h1>Listing Results: </h1>
      </div>
    </div>
  );
};

export default Search;
