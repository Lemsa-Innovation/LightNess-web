import {ActivationChip, DateChip} from "@/components/@materialUI/chips";
import {InputSearch} from "@/components/@materialUI/inputs/texts";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {useSuggestions} from "@/firebase/firestore/collections/suggestions/hooks";
import {Suggestion} from "@/firebase/firestore/collections/suggestions/models";
import {ColumnUID} from "@/language/structure/commons";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {ChangeEvent, Key, useCallback, useMemo, useState} from "react";
import {ActionsDropdown} from "../modals";
import {searchIn} from "@/utils/string";

function TableFuneralServices() {
  const {languageData} = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;

  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {data} = useSuggestions({suggestionType: "funeralPump"});

  const filteredData = useMemo(() => {
    const hits = data.filter(
      ({name, phoneNumber, additionalInfo}) =>
        // (subDescription && searchIn({ filterValue, value: subDescription })) ||
        searchIn({
          filterValue,
          values: [
            name, phoneNumber, additionalInfo
          ],
        })
    );

    return hits
  }, [data, filterValue]);
  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const hits = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData?.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const onRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(event.target.value));
      setPage(1);
    },
    []
  );

  const getColumns = () => {
    const tableColumns: {
      uid: ColumnUID;
      sortable?: boolean;
      align?: "center" | "start" | "end";
    }[] = [
        {uid: "name"},
        {uid: "phoneNumber"},
        {uid: "status", sortable: true},
        {uid: "createdAt", sortable: true},
        {uid: "actions"},
      ];
    return tableColumns;
  };

  const renderCell = useCallback((suggestion: Suggestion, columnKey: Key) => {
    const {name, phoneNumber, additionalInfo, createdAt} =
      suggestion;
    switch (columnKey as ColumnUID) {
      case "phoneNumber": {
        return <p>{phoneNumber}</p>;
      }
      case "name":
        return (
          <div>
            <p>{name}</p>
            <p>{additionalInfo}</p>
          </div>
        );
      case "status":
        return <ActivationChip isActive />;
      case "createdAt":
        return <DateChip timestamp={createdAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <ActionsDropdown suggestion={suggestion} />
          </div>
        );
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <InputSearch
            onSearchChange={onSearchChange}
            onClear={() => onClear()}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronIcon down filled />} variant="flat">
                  {columns?.role}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="roles"
                closeOnSelect={false}
                selectedKeys={roleFilter}
                selectionMode="multiple"
                onSelectionChange={setRoleFilter}
              >
                {roleOptions.map((role) => (
                  <DropdownItem key={role} className="capitalize">
                    {roles?.[role].label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronIcon down filled />} variant="flat">
                  {columns?.status}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {allStatus?.[status]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {tableLabels?.elementCount.replace(
              "{length}",
              data.length?.toString()
            )}
          </span>
          <label className="flex items-center text-default-400 text-small">
            {tableLabels?.rowsPerPage}
            <select
              value={rowsPerPage.toString()}
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [rowsPerPage, data]);

  const bottomContent = useMemo(() => {
    return (
      <div className="w-full flex justify-end">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [pages, page]);

  return (
    <Table
      isHeaderSticky
      aria-label="debta"
      selectionMode="single"
      topContent={topContent}
      bottomContent={bottomContent}
    // onSelectionChange={handleSelection}
    >
      <TableHeader columns={getColumns()}>
        {({uid, align, sortable}) => (
          <TableColumn key={uid} align={align} allowsSorting={sortable}>
            {columns?.[uid]}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={hits}>
        {(suggestion) => (
          <TableRow key={suggestion.ref.id}>
            {(columnKey) => (
              <TableCell>{renderCell(suggestion, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableFuneralServices;
