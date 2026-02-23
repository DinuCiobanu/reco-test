import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import AppInput from "../../components/AppInput";
import AppTable from "../../components/AppTable";
import { ToastContainer } from "react-toastify";
import { pushErrorNotification } from "../../utils/notifications";
const PAGE_SIZES = [25, 50];
const INITIAL_PAGE_NUMBER = 0;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Connection",
    dataIndex: "connection",
    key: "connection",
  },
];

export default function AppDiscovery() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);
  const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZES[0]);
  const [totalRows, setTotalRows] = useState(1);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({ name: "", category: "" });

  const [debNameFilter] = useDebounce(filters.name, 300);
  const [debCategoryFilter] = useDebounce(filters.category, 300);
  const [debPage] = useDebounce(currentPage, 300);

  useEffect(() => {
    let body = {
      pageNumber: debPage,
      pageSize: currentPageSize,
    };
    if (debNameFilter) body.appName = debNameFilter;
    if (debCategoryFilter) body.category = debCategoryFilter;

    fetch("https://recotest.pythonanywhere.com/api/v1/app-service/get-apps", {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((resp) => {
        if (resp.error) {
          pushErrorNotification(resp.error);
          return;
        }
        setTotalRows(resp.totalCount);
        setRows(
          resp.appRows.map((item, idx) => ({
            key: idx,
            name: item.appName,
            connection: item.appSources.join(", "),
            category: item.category,
          })),
        );
      })
      .catch((e) => {
        pushErrorNotification(e.message);
      });
  }, [currentPage, debPage, debNameFilter, debCategoryFilter]);
  return (
    <div className="flex gap-2.5 h-full">
      <div className={"bg-serfice-200 h-full grow p-2.5"}>
        <AppTable
          currentPage={currentPage}
          onChangePageNumber={setCurrentPage}
          currentPageSize={currentPageSize}
          onChangePageSize={setCurrentPageSize}
          pageSizes={PAGE_SIZES}
          rows={rows}
          columns={columns}
          totalRowsCount={totalRows}
        />
      </div>
      <div
        className={"bg-serfice-200 h-full w-82.5 p-2.5 flex-col flex gap-2.5"}
      >
        <p className="px-4 py-3.5 bg-table-head text-xs rounded-t-md">
          Filters
        </p>
        <AppInput
          placeholder="Name Filter"
          value={filters.name}
          onChange={(value) => {
            setFilters((v) => ({ ...v, name: value }));
            setCurrentPage(INITIAL_PAGE_NUMBER);
          }}
        />
        <AppInput
          placeholder="Category Filter"
          value={filters.category}
          onChange={(value) => {
            setFilters((v) => ({ ...v, category: value }));
            setCurrentPage(INITIAL_PAGE_NUMBER);
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
