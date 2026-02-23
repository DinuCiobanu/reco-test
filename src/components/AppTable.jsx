import { Table } from "antd";

export default function AppTable({
  currentPage = 1,
  onChangePageNumber = (nb) => undefined,
  onChangePageSize = (nb) => undefined,
  pageSizes = [],
  currentPageSize = 25,
  rows = [],
  columns = [],
  totalRowsCount = 1,
}) {
  return (
    <Table
      dataSource={rows}
      columns={columns}
      pagination={{
        pageSizeOptions: pageSizes,
        current: currentPage,
        pageSize: currentPageSize,
        total: totalRowsCount,
        onChange: (pageNumber, pageSize) => {
          onChangePageNumber(pageNumber);
          onChangePageSize(pageSize);
        },
      }}
      scroll={{ y: `calc(100vh - 170px)`, x: "0" }}
      rootClassName="w-full"
      classNames={{body:'w-full'}}
    />
  );
}
