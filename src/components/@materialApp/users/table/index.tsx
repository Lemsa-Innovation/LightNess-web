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
} from "@heroui/react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import {
  InputSearch,
  DateChip,
  ChevronIcon,
  StatusChip,
} from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { MinimalUser, UserActionsDropdown } from "../cards";
import { UserRoleChip } from "../chips";
import { useTable } from "@/hooks";
import { searchIn } from "@/utils";
import { User } from "@/firebase/firestore";
import { useCollectionSnapshots } from "@/firebase/firestore/modules";
import { getUsersRef } from "@/firebase/firestore/collections/users/helpers";
import { CreateUserModal } from "../modals";

function UsersTable() {
  const { languageData } = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const allStatus = languageData?.commons.status;
  const roles = languageData?.profile.roles;

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
    usedFor: "users",
    INITIAL_VISIBLE_COLUMNS: [
      "user",
      "role",
      "phoneNumber",
      "status",
      "registeredDate",
      "actions",
    ],
    ALL_VISIBLE_COLUMNS: [
      "user",
      "role",
      "phoneNumber",
      "status",
      "registeredDate",
      "actions",
    ],
  });

  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");

  const {
    data: users,
    error,
    isLoading,
  } = useCollectionSnapshots<User>(getUsersRef());

  const roleOptions = useMemo(() => {
    const roleSet = new Set(users?.map(({ role }) => role));
    return Array.from(roleSet);
  }, [users]);

  const statusOptions = useMemo(() => {
    const statusSet = new Set(
      users
        ?.map(({ accountStatus }) => accountStatus)
        .filter((status) => !!status)
    );
    return Array.from(statusSet);
  }, [users]);

  const filteredData = useMemo(() => {
    if (!users) return [];
    const hits = users.filter(({ email, uid, lastName, firstName }) => {
      if (filterValue) {
        searchIn({
          filterValue,
          values: [
            uid,
            email,
            lastName,
            firstName,
            // phoneNumber ? formatPhoneToLocal(phoneNumber) : undefined,
          ],
        });
      }
      return users;
    });

    const statusFilteredHits =
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
        ? hits.filter(({ accountStatus }) =>
            Array.from(statusFilter).includes(accountStatus ?? "unverified")
          )
        : hits;
    const roleFilteredHits =
      roleFilter !== "all" &&
      Array.from(roleFilter).length !== roleOptions.length
        ? statusFilteredHits.filter(({ role }) =>
            Array.from(roleFilter).includes(role)
          )
        : statusFilteredHits;

    return roleFilteredHits;
  }, [users, filterValue, roleFilter, statusFilter]);

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
      { uid: "user", sortable: true },
      { uid: "role", sortable: true },
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
            <CreateUserModal />
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
  }, [
    statusOptions,
    rowsPerPage,
    roleOptions,
    roleFilter,
    filteredData,
    statusFilter,
  ]);

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

  const renderCell = useCallback((user: User, columnKey: Key) => {
    const { verificationSteps, createdAt } = user;
    switch (columnKey as ColumnUID) {
      case "user": {
        return <MinimalUser fetch={false} user={user} />;
      }
      case "role":
        return <UserRoleChip user={user} />;
      case "phoneNumber":
        return <p>{user.phoneNumber}</p>;
      case "status":
        return (
          <StatusChip
            statusKey={
              verificationSteps?.email?.verified ? "active" : "unverified"
            }
          />
        );
      case "registeredDate":
        return <DateChip timestamp={createdAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <UserActionsDropdown user={user} />
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

export { UsersTable };
