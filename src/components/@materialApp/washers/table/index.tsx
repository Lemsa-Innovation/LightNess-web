import { ColumnUID } from "@/language/structure/commons";
import {
  Button,
  Chip,
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
import { useSupabaseWashers, SupabaseWasher } from "@/hooks/useSupabaseWashers";
import clsx from "clsx";
import { ValidateWasherModal } from "../modals";
import { CheckCircle2 } from "lucide-react";

const INITIAL_VISIBLE_COLUMNS: ColumnUID[] = [
  "name",
  "phoneNumber",
  "identityStatus",
  "certificationStatus",
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
    page,
    rowsPerPage,
  } = useTable({
    usedFor: "washers",
    INITIAL_VISIBLE_COLUMNS,
    ALL_VISIBLE_COLUMNS,
  });

  const [roleFilter, setRoleFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [selectedWasher, setSelectedWasher] = useState<SupabaseWasher | null>(
    null
  );
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

  const { washers, summaryStats, error, isLoading, refetch } =
    useSupabaseWashers();

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
    const hits = washers.filter(({ user, fullname, phone_number }) => {
      if (filterValue) {
        return searchIn({
          filterValue,
          values: [user?.email || "", fullname, phone_number || ""],
        });
      }
      return true;
    });

    const statusFilteredHits =
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
        ? hits.filter(({ status }) =>
            Array.from(statusFilter).includes(status ?? "inactive")
          )
        : hits;

    return statusFilteredHits;
  }, [washers, filterValue, statusFilter, statusOptions.length]);

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
      { uid: "identityStatus", sortable: true },
      { uid: "certificationStatus", sortable: true },
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
                    {allStatus?.[status as keyof typeof allStatus]}
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
  }, [
    statusOptions,
    rowsPerPage,
    roleFilter,
    filteredData,
    statusFilter,
    tableLabels,
    onSearchChange,
    onClear,
    onRowsPerPageChange,
    columns,
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

  const renderCell = useCallback((washer: SupabaseWasher, columnKey: Key) => {
    const {
      created_at,
      gender,
      image,
      fullname,
      phone_number,
      is_validated_certification,
      is_validated_identity,
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
        return <p>{phone_number}</p>;
      case "identityStatus":
        return (
          <Chip
            size="sm"
            color={is_validated_identity ? "success" : "warning"}
            variant="flat"
          >
            {is_validated_identity ? (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Validé
              </div>
            ) : (
              "Non validé"
            )}
          </Chip>
        );
      case "certificationStatus":
        return (
          <Chip
            size="sm"
            color={is_validated_certification ? "success" : "warning"}
            variant="flat"
          >
            {is_validated_certification ? (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Validé
              </div>
            ) : (
              "Non validé"
            )}
          </Chip>
        );
      case "registeredDate":
        return <DateChip timestamp={created_at} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={() => {
                setSelectedWasher(washer);
                setIsValidationModalOpen(true);
              }}
            >
              Gérer
            </Button>
          </div>
        );
    }
  }, []);

  const handleRefreshWashers = async () => {
    // Refetch washers data without full page reload
    await refetch();
  };

  if (error) {
    return <div>Error loading washers: {error.message}</div>;
  }

  return (
    <>
      {/* Summary Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {summaryStats.totalWashers}
          </div>
          <div className="text-sm text-blue-800">Total Washers</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {summaryStats.validated}
          </div>
          <div className="text-sm text-green-800">
            Validated (Identity + Certification)
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">
            {summaryStats.pending}
          </div>
          <div className="text-sm text-red-800">Pending Validation</div>
        </div>
      </div>

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
        <TableBody items={hits} isLoading={isLoading}>
          {(washer) => (
            <TableRow key={washer.uid}>
              {(columnKey) => (
                <TableCell>{renderCell(washer, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedWasher && (
        <ValidateWasherModal
          isOpen={isValidationModalOpen}
          onClose={() => {
            setIsValidationModalOpen(false);
            setSelectedWasher(null);
          }}
          washer={selectedWasher}
          onRefresh={handleRefreshWashers}
        />
      )}
    </>
  );
}

export { WashersTable };
