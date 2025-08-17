"use client";

import { MinimalFuneralCompany } from "@/components/@materialApp/funeralCompanies/cards";
import { InputSearch } from "@/components/@materialUI";
import { DateChip } from "@/components/@materialUI/chips";
import { useLanguage } from "@/contexts/language/LanguageContext";
import {
  useSupabaseFuneralCompanies,
  SupabaseFuneralCompany,
} from "@/hooks/useSupabaseFuneralCompanies";
import { useTable } from "@/hooks";
import { ColumnUID } from "@/language/structure";
import { searchIn } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, useCallback, useMemo } from "react";

const INITIAL_VISIBLE_COLUMNS: Array<ColumnUID> = [
  "user",
  "name",
  "phoneNumber",
  "registeredDate",
  "actions",
];
const ALL_VISIBLE_COLUMNS: Array<ColumnUID> = [
  "user",
  "name",
  "phoneNumber",
  "registeredDate",
  "actions",
];
function Page() {
  const { languageData } = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const funeralCompanies = languageData?.inputs.funeralCompanies;
  const {
    page,
    filterValue,
    rowsPerPage,
    onClear,
    handleChangeRowsPerPage,
    handleChangeFilterValue,
  } = useTable({
    usedFor: "funeral",
    ALL_VISIBLE_COLUMNS,
    INITIAL_VISIBLE_COLUMNS,
  });

  const {
    funeralCompanies: data,
    isLoading,
    error,
  } = useSupabaseFuneralCompanies();

  const filteredData = useMemo(() => {
    if (!data) return [];
    const hits = data.filter(
      ({ email, address, company_name, phone_number, region }) => {
        if (filterValue) {
          return searchIn({
            filterValue,
            values: [email, address, company_name, phone_number, region],
          });
        }
        return data;
      }
    );
    return hits;
  }, [data, filterValue]);

  const hits = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const getColumns = () => {
    const tableColumns: {
      uid: ColumnUID;
      sortable?: boolean;
      align?: "center" | "start" | "end";
    }[] = [
      { uid: "user", sortable: true },
      { uid: "name", sortable: true },
      { uid: "phoneNumber" },
      { uid: "registeredDate", sortable: true },
      { uid: "actions" },
    ];
    return tableColumns;
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <InputSearch
            onSearchChange={handleChangeFilterValue}
            onClear={onClear}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {tableLabels?.elementCount.replace(
              "{length}",
              filteredData.length.toString()
            )}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {tableLabels?.rowsPerPage}
            <select
              value={rowsPerPage.toString()}
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => handleChangeRowsPerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    rowsPerPage,
    filteredData,
    tableLabels,
    handleChangeFilterValue,
    onClear,
    handleChangeRowsPerPage,
  ]);

  const renderCell = useCallback(
    (funeral: SupabaseFuneralCompany, columnKey: Key) => {
      const { phone_number, created_at } = funeral;
      switch (columnKey as ColumnUID) {
        case "user": {
          return <MinimalFuneralCompany funeralCompany={funeral} />;
        }

        case "name":
          return <p>{funeral.company_name}</p>;

        case "phoneNumber":
          return <p>{phone_number}</p>;

        case "registeredDate":
          return <DateChip timestamp={created_at} />;
      }
    },
    [data]
  );

  if (error) {
    return <div>Error loading funeral companies: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <p className="text-2xl font-bold">{funeralCompanies?.labels.title}</p>
      <Table isHeaderSticky topContent={topContent}>
        <TableHeader columns={getColumns()}>
          {({ uid, align, sortable }) => (
            <TableColumn key={uid} align={align} allowsSorting={sortable}>
              {columns?.[uid]}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={hits} isLoading={isLoading}>
          {(funeralCompany) => (
            <TableRow key={funeralCompany.uid}>
              {(columnKey) => (
                <TableCell>{renderCell(funeralCompany, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
