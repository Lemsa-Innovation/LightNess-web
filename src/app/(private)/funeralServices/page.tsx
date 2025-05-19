"use client";

import { MinimalUser } from "@/components/@materialApp/users/cards";
import { InputSearch } from "@/components/@materialUI";
import { DateChip } from "@/components/@materialUI/chips";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { FuneralCompany } from "@/firebase/firestore";
import {
  getCollectionRef,
  useCollectionSnapshots,
} from "@/firebase/firestore/modules";
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
import { collectionIds } from "@shared/modules";
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

  const funeralCompaniesRef = useMemo(
    () => getCollectionRef(collectionIds.funeralCompanies),
    []
  );
  const { data, isLoading } =
    useCollectionSnapshots<FuneralCompany>(funeralCompaniesRef);

  const filteredData = useMemo(() => {
    if (!data) return [];
    const hits = data.filter(
      ({ email, address, companyName, phoneNumber, region }) => {
        if (filterValue) {
          return searchIn({
            filterValue,
            values: [email, address, companyName, phoneNumber, region],
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
  }, [rowsPerPage, filteredData]);

  const renderCell = useCallback(
    (funeral: FuneralCompany, columnKey: Key) => {
      const { userId, phoneNumber, createdAt } = funeral;
      switch (columnKey as ColumnUID) {
        case "user": {
          return <MinimalUser fetch={true} uid={userId} />;
        }

        case "phoneNumber":
          return <p>{phoneNumber}</p>;

        case "registeredDate":
          return <DateChip timestamp={createdAt} />;
      }
    },
    [data]
  );

  return (
    <div className="flex w-full h-full">
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
            <TableRow key={funeralCompany.ref.id}>
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
