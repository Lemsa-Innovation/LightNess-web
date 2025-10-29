"use client";

import { ColumnUID } from "@/language/structure/commons";
import {
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
import { InputSearch } from "@/components/@materialUI";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { StatusChip } from "@/components/@materialUI";
import { useTable } from "@/hooks";
import { searchIn } from "@/utils";
import { useSupabaseDeathDeclarations } from "@/hooks/useSupabaseDeathDeclarations";
import { DetailModal } from "@/components/@materialApp/deathDeclarations";
import { useDisclosure } from "@heroui/react";

const INITIAL_VISIBLE_COLUMNS: ColumnUID[] = [
  "matchedUser",
  "email",
  "status",
  "declaredByCount",
  "actions",
];
const ALL_VISIBLE_COLUMNS: ColumnUID[] = [...INITIAL_VISIBLE_COLUMNS];

type DeathDeclarationRow = {
  matchedUid: string;
  matchedUser?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    avatar_image?: string;
    photo_url?: string;
  };
  status: string;
  declaredCount: number;
  declarations: any[];
};

function DeathDeclarationsTable() {
  const { languageData } = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const deathDeclarations = languageData?.inputs.deathDeclarations;

  const {
    filterValue,
    handleChangeFilterValue,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    sortDescriptor,
    handleSort,
    setMultipleParams,
  } = useTable({
    usedFor: "deathDeclarations",
    INITIAL_VISIBLE_COLUMNS,
    ALL_VISIBLE_COLUMNS,
  });

  const detailModalProps = useDisclosure();
  const [selectedMatchedUid, setSelectedMatchedUid] = useState<string | null>(
    null
  );

  const {
    deathDeclarations: data,
    isLoading,
    error,
    refetch,
  } = useSupabaseDeathDeclarations();

  const deathsDeclarations = useMemo(() => {
    if (!data) return {};

    return data.reduce(
      (acc, declaration) => {
        const {
          uid,
          matched_uid,
          declared_by,
          created_at,
          status,
          attachments,
          description,
        } = declaration;
        if (acc[matched_uid]) {
          acc[matched_uid].declaredBy.push({
            uid,
            declared_by,
            created_at,
            status,
            attachments,
            description,
          });
        } else {
          acc[matched_uid] = {
            declaredBy: [
              {
                uid,
                declared_by,
                created_at,
                status,
                attachments,
                description,
              },
            ],
          };
        }
        return acc;
      },
      {} as Record<
        string,
        {
          declaredBy: {
            uid: string;
            declared_by: string;
            created_at: string;
            status: string;
            attachments?: string[];
            description?: string;
          }[];
        }
      >
    );
  }, [data]);

  const tableData: DeathDeclarationRow[] = useMemo(() => {
    return Object.entries(deathsDeclarations).map(
      ([matchedUid, { declaredBy }]) => {
        const matchedUser = data?.find(
          (d) => d.matched_uid === matchedUid
        )?.matched_user;
        const status = declaredBy.length > 0 ? declaredBy[0].status : "pending";
        const declaredCount = declaredBy.length;
        return {
          matchedUid,
          matchedUser,
          status,
          declaredCount,
          declarations: declaredBy,
        };
      }
    );
  }, [deathsDeclarations, data]);

  const filteredData = useMemo(() => {
    if (!tableData) return [];

    const hits = tableData.filter(({ matchedUser }) => {
      if (filterValue) {
        const searchableValues = [
          matchedUser?.email || "",
          matchedUser?.first_name || "",
          matchedUser?.last_name || "",
          matchedUser?.id || "",
        ];

        return searchIn({
          filterValue,
          values: searchableValues,
        });
      }
      return true;
    });

    return hits;
  }, [tableData, filterValue]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSelection = (keys: Selection) => {
    const selectedKey = Array.from(keys).at(0)?.toString();
    if (selectedKey) {
      // Handle selection if needed
    }
  };

  const onSearchChange = useCallback(
    (value: string) => {
      if (value) {
        setMultipleParams({ search: value, page: "1" });
      } else {
        setMultipleParams({ search: "", page: "1" });
      }
    },
    [setMultipleParams]
  );

  const onClear = useCallback(() => {
    setMultipleParams({ search: "", page: "1" });
  }, [setMultipleParams]);

  const onRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleChangeRowsPerPage(event.target.value);
      handleChangePage(1);
    },
    [handleChangeRowsPerPage, handleChangePage]
  );

  const getColumns = () => {
    const tableColumns: {
      uid: ColumnUID;
      sortable?: boolean;
      align?: "center" | "start" | "end";
    }[] = [
      { uid: "matchedUser", sortable: false },
      { uid: "email", sortable: false },
      { uid: "status", sortable: false },
      { uid: "declaredByCount", sortable: false },
      { uid: "actions", sortable: false },
    ];
    return tableColumns;
  };

  const hits = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const handleCardClick = (matchedUid: string) => {
    setSelectedMatchedUid(matchedUid);
    detailModalProps.onOpen();
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <InputSearch
            onSearchChange={onSearchChange}
            onClear={() => onClear()}
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
    rowsPerPage,
    filteredData,
    tableLabels,
    onSearchChange,
    onClear,
    onRowsPerPageChange,
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
  }, [pages, page, handleChangePage]);

  const renderCell = useCallback(
    (row: DeathDeclarationRow, columnKey: Key) => {
      switch (columnKey as ColumnUID) {
        case "matchedUser": {
          const displayName = `${row.matchedUser?.first_name ?? ""}${
            row.matchedUser?.last_name ? ` ${row.matchedUser?.last_name}` : ""
          }`.trim();
          return displayName ? (
            <p className="capitalize">{displayName}</p>
          ) : null;
        }
        case "email":
          return <p>{row.matchedUser?.email || ""}</p>;
        case "status":
          return (
            <StatusChip
              statusKey={
                row.status === "approved"
                  ? "active"
                  : row.status === "rejected"
                  ? "inactive"
                  : "pending"
              }
            />
          );
        case "declaredByCount":
          return <p>{row.declaredCount}</p>;
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <button
                className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={() => handleCardClick(row.matchedUid)}
              >
                {languageData?.commons.buttons.view || "Voir"}
              </button>
            </div>
          );
      }
    },
    [languageData, handleCardClick]
  );

  if (isLoading) {
    return <div>Loading death declarations...</div>;
  }

  if (error) {
    return <div>Error loading death declarations: {error.message}</div>;
  }

  return (
    <>
      {selectedMatchedUid && (
        <DetailModal
          matchedUid={selectedMatchedUid}
          matchedUser={
            data?.find((d) => d.matched_uid === selectedMatchedUid)
              ?.matched_user
          }
          declarations={
            deathsDeclarations[selectedMatchedUid]?.declaredBy.map(
              (declaration) => {
                const user = data?.find(
                  (d) => d.uid === declaration.uid
                )?.declared_by_user;
                return {
                  ...data?.find((d) => d.uid === declaration.uid)!,
                  user,
                };
              }
            ) || []
          }
          disclosureProps={detailModalProps}
          onSuccess={refetch}
        />
      )}

      <Table
        isHeaderSticky
        aria-label="death declarations"
        selectionMode="single"
        sortDescriptor={
          sortDescriptor.column
            ? {
                column: sortDescriptor.column,
                direction: sortDescriptor.direction,
              }
            : undefined
        }
        onSortChange={handleSort}
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
          {(row) => (
            <TableRow key={row.matchedUid}>
              {(columnKey) => (
                <TableCell>{renderCell(row, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

function Page() {
  const { languageData } = useLanguage();
  const deathDeclarations = languageData?.inputs.deathDeclarations;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">{deathDeclarations?.labels.title}</p>
      <DeathDeclarationsTable />
    </div>
  );
}

export default Page;
