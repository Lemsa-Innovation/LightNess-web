import { ColumnUID } from "@/language/structure/commons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import {
  InputSearch,
  DateChip,
  ChevronIcon,
  StatusChip,
} from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { useTable } from "@/hooks";
import { searchIn } from "@/utils";
import { useWashers, Washer } from "@/firebase/firestore";
import clsx from "clsx";

const INITIAL_VISIBLE_COLUMNS: ColumnUID[] = [
  "phoneNumber",
  "status",
  "registeredDate",
  "actions",
];
const ALL_VISIBLE_COLUMNS: ColumnUID[] = [...INITIAL_VISIBLE_COLUMNS];
function WashersTable() {
  const { languageData } = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const allStatus = languageData?.commons.status;

  const {
    filterValue,
    handleChangeFilterValue,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeVisibleColumns,
    page,
    rowsPerPage,
    visibleColumns,
  } = useTable({
    usedFor: "washers",
    INITIAL_VISIBLE_COLUMNS,
    ALL_VISIBLE_COLUMNS,
  });

  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const { data: washers, error, isLoading } = useWashers();

  // const roleOptions = useMemo(() => {
  //   const roleSet = new Set(users?.map(({ role }) => role));
  //   return Array.from(roleSet);
  // }, [users]);

  const statusOptions = useMemo(() => {
    const statusSet = new Set(washers?.map(({ status }) => status));
    return Array.from(statusSet);
  }, [washers]);

  const filteredData = useMemo(() => {
    if (!washers) return [];
    const hits = washers.filter(({ email, fullname }) => {
      if (filterValue) {
        searchIn({
          filterValue,
          values: [
            email,
            fullname,
            // phoneNumber ? formatPhoneToLocal(phoneNumber) : undefined,
          ],
        });
      }
      return washers;
    });

    const statusFilteredHits =
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
        ? hits.filter(({ status }) =>
            Array.from(statusFilter).includes(status ?? "unverified")
          )
        : hits;
    // const roleFilteredHits =
    //   roleFilter !== "all" &&
    //   Array.from(roleFilter).length !== roleOptions.length
    //     ? statusFilteredHits.filter(({ role }) =>
    //         Array.from(roleFilter).includes(role)
    //       )
    //     : statusFilteredHits;

    return statusFilteredHits;
  }, [washers, filterValue, roleFilter, statusFilter]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSelection = (keys: Selection) => {
    const selectedKey = Array.from(keys).at(0)?.toString();
    if (selectedKey) {
      // push(`${SIDEBAR_ROUTES.users.path}/${selectedKey}`);
    }
  };
  const onSearchChange = useCallback((value: string) => {
    if (value) {
      handleChangeFilterValue(value);
      handleChangePage(1);
    } else {
      handleChangeFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    handleChangeFilterValue("");
    handleChangePage(1);
  }, []);
  const onRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleChangeRowsPerPage(event.target.value);
      handleChangePage(1);
    },
    []
  );

  const getColumns = () => {
    const tableColumns: {
      uid: ColumnUID;
      sortable?: boolean;
      align?: "center" | "start" | "end";
    }[] = [
      { uid: "name", sortable: true, align: "start" },
      { uid: "phoneNumber" },
      { uid: "status", sortable: true },
      { uid: "registeredDate", sortable: true },
      { uid: "actions" },
    ];
    return tableColumns;
  };
  const hits = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

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
            <Dropdown>
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
            </Dropdown>
            {/* <CreateUserModal /> */}
          </div>
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
  }, [statusOptions, rowsPerPage, roleFilter, filteredData, statusFilter]);

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
          onChange={handleChangePage}
        />
      </div>
    );
  }, [pages, page]);

  const renderCell = useCallback((washer: Washer, columnKey: Key) => {
    const {
      verifications,
      createdAt,
      address,
      gender,
      region,
      image,
      fullname,
      phoneNumber,
    } = washer;
    switch (columnKey as ColumnUID) {
      case "name":
        return (
          <User
            avatarProps={{
              src: image || "assets/images/no-image-icon.jpg",
              isBordered: true,
              className: clsx(
                gender === "men" && "border-blue-500",
                gender === "women" && "border-rose-500"
              ),
            }}
            name={fullname}
          />
        );
      case "phoneNumber":
        return <p>{phoneNumber}</p>;
      case "status":
        return (
          <StatusChip
            statusKey={
              verifications?.certification.isValidated ? "active" : "unverified"
            }
          />
        );
      case "registeredDate":
        return <DateChip timestamp={createdAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            {/* <UserActionsDropdown user={user} /> */}
          </div>
        );
    }
  }, []);

  return (
    <Table
      isHeaderSticky
      aria-label="stores"
      selectionMode="single"
      topContent={topContent}
      bottomContent={bottomContent}
      onSelectionChange={handleSelection}
    >
      <TableHeader columns={getColumns()}>
        {({ uid, align, sortable }) => (
          <TableColumn key={uid} align={align} allowsSorting={sortable}>
            {columns?.[uid]}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={hits}>
        {(user) => (
          <TableRow key={user.ref.id}>
            {(columnKey) => (
              <TableCell>{renderCell(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { WashersTable };
