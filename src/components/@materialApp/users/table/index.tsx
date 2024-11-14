import {InputSearch} from "@/components/@materialUI/inputs/texts";
import {useUsers, useUsersQuery} from "@/firebase/firestore/collections/users/hooks";
import {User} from "@/firebase/firestore/collections/users/models";
import {ColumnUID} from "@/language/structure/commons";
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
} from "@nextui-org/react";
import {ChangeEvent, Key, useCallback, useMemo, useState} from "react";
import {DateChip, StatusChip} from "@/components/@materialUI/chips";
import {useRouter} from "next/navigation";
import {useLanguage} from "@/contexts/language/LanguageContext";
import {ChevronIcon} from "@/components/@materialUI/icons";
import {searchIn} from "@/utils/string";
import {SIDEBAR_ROUTES} from "@/routes";
import {Menu} from "iconsax-react";
import {MinimalUser} from "../cards";
import {UserRoleChip} from "../chips";
import {ActionsDropdown} from "../modals";

function UsersTable() {
  const {languageData} = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const allStatus = languageData?.commons.status;
  const roles = languageData?.profile.roles;

  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const {data: users} = useUsers()
  const roleOptions = useMemo(() => {
    const roleSet = new Set(users?.map(({role}) => role));
    return Array.from(roleSet);
  }, [users]);
  const statusOptions = useMemo(() => {
    const statusSet = new Set(users?.map(({accountStatus}) => accountStatus));
    return Array.from(statusSet);
  }, [users]);

  const filteredData = useMemo(() => {
    if (!users) return [];
    const hits = users.filter(
      ({email, uid, lastName, firstName}) =>
        // (subDescription && searchIn({ filterValue, value: subDescription })) ||
        searchIn({
          filterValue,
          values: [
            uid,
            email,
            lastName,
            firstName,
            // phoneNumber ? formatPhoneToLocal(phoneNumber) : undefined,
          ],
        })
    );

    const statusFilteredHits =
      statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
        ? hits.filter(({accountStatus}) =>
          Array.from(statusFilter).includes(accountStatus)
        )
        : hits;
    const roleFilteredHits =
      roleFilter !== "all" &&
        Array.from(roleFilter).length !== roleOptions.length
        ? statusFilteredHits.filter(({role}) =>
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
        {uid: "user", sortable: true},
        {uid: "role", sortable: true},
        {uid: "phoneNumber"},
        {uid: "status", sortable: true},
        {uid: "registeredDate", sortable: true},
        {uid: "actions"},
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
          onChange={setPage}
        />
      </div>
    );
  }, [pages, page]);

  const renderCell = useCallback((user: User<"client">, columnKey: Key) => {
    const {accountStatus, createdAt} = user;
    switch (columnKey as ColumnUID) {
      case "user": {
        return <MinimalUser fetch={false} user={user} />;
      }
      case "role":
        return <UserRoleChip user={user} />;
      case "phoneNumber":
        return <p>{user.phoneNumber}</p>;
      case "status":
        return <StatusChip statusKey={accountStatus ?? "unverified"} />;
      case "registeredDate":
        return <DateChip timestamp={createdAt} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <ActionsDropdown user={user} />
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
        {({uid, align, sortable}) => (
          <TableColumn key={uid} align={align} allowsSorting={sortable}>
            {columns?.[uid]}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={hits}>
        {(user) => (
          <TableRow key={user.uid}>
            {(columnKey) => (
              <TableCell>{renderCell(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export {UsersTable};
