"use client";

import { MinimalFuneralCompany } from "@/components/@materialApp/funeralCompanies/cards";
import { ValidateFuneralCompanyModal } from "@/components/@materialApp/funeralCompanies/modals";
import { InputSearch } from "@/components/@materialUI";
import { DateChip } from "@/components/@materialUI/chips";
import { Button, Chip } from "@heroui/react";
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
import { Key, useCallback, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const INITIAL_VISIBLE_COLUMNS: Array<ColumnUID> = [
  "user",
  "name",
  "phoneNumber",
  "identityStatus",
  "registeredDate",
  "actions",
];
const ALL_VISIBLE_COLUMNS: Array<ColumnUID> = [
  "user",
  "name",
  "phoneNumber",
  "identityStatus",
  "registeredDate",
  "actions",
];
function Page() {
  const { languageData } = useLanguage();
  const columns = languageData?.commons.table.columns;
  const tableLabels = languageData?.commons.labels.table;
  const funeralCompanies = languageData?.inputs.funeralCompanies;

  const [selectedFuneralCompany, setSelectedFuneralCompany] =
    useState<SupabaseFuneralCompany | null>(null);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

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
    summaryStats,
    isLoading,
    error,
    refetch,
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
        return true;
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
      { uid: "identityStatus", sortable: true },
      { uid: "registeredDate", sortable: true },
      { uid: "actions" },
    ];
    return tableColumns;
  };

  const handleRefreshFuneralCompanies = async () => {
    // Refetch funeral companies data without full page reload
    await refetch();
  };

  const onSearchChange = useCallback(
    (value: string) => {
      if (value) {
        handleChangeFilterValue(value);
      } else {
        handleChangeFilterValue("");
      }
    },
    [handleChangeFilterValue]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <InputSearch onSearchChange={onSearchChange} onClear={onClear} />
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
    onSearchChange,
    onClear,
    handleChangeRowsPerPage,
  ]);

  const renderCell = useCallback(
    (funeral: SupabaseFuneralCompany, columnKey: Key) => {
      const { phone_number, created_at, is_validated_identity } = funeral;
      switch (columnKey as ColumnUID) {
        case "user": {
          return <MinimalFuneralCompany funeralCompany={funeral} />;
        }

        case "name":
          return <p>{funeral.company_name}</p>;

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
                  setSelectedFuneralCompany(funeral);
                  setIsValidationModalOpen(true);
                }}
              >
                Gérer
              </Button>
            </div>
          );
      }
    },
    [data]
  );

  if (error) {
    return <div>Error loading funeral companies: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full h-full">
        <p className="text-2xl font-bold">{funeralCompanies?.labels.title}</p>

        {/* Summary Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {summaryStats.totalCompanies}
            </div>
            <div className="text-sm text-blue-800">Total Companies</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {summaryStats.validated}
            </div>
            <div className="text-sm text-green-800">Validated (Identity)</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {summaryStats.pending}
            </div>
            <div className="text-sm text-red-800">Pending Validation</div>
          </div>
        </div>

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

      {selectedFuneralCompany && (
        <ValidateFuneralCompanyModal
          isOpen={isValidationModalOpen}
          onClose={() => {
            setIsValidationModalOpen(false);
            setSelectedFuneralCompany(null);
          }}
          funeralCompany={selectedFuneralCompany}
          onRefresh={handleRefreshFuneralCompanies}
        />
      )}
    </>
  );
}

export default Page;
