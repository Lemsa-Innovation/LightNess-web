"use client";
import { useState } from "react";
import { useSearchParamsName } from "./searchParams";
import { ColumnUID } from "@/language/structure";

export function useTable({
  usedFor,
  ALL_VISIBLE_COLUMNS,
  INITIAL_VISIBLE_COLUMNS,
}: {
  usedFor: string;
  INITIAL_VISIBLE_COLUMNS?: ColumnUID[];
  ALL_VISIBLE_COLUMNS?: ColumnUID[];
}) {
  const cookiesNames = {
    rowsPerPage: `${usedFor}.rowsPerPage`,
    visibleColumns: `${usedFor}.visibleColumns`,
  };
  const { setParam, getParam, getCookies, setCookies } = useSearchParamsName();

  const page = Number(getParam("page") ?? 1) ?? 1;
  const filterValue = getParam("search");

  const handleChangePage = (value: number) => {
    setParam("page", value.toString());
  };

  const handleChangeFilterValue = (value: string) => {
    setParam("search", value);
  };
  const onClear = () => {
    handleChangeFilterValue("");
  };

  const [rowsPerPage, setRowsPerPage] = useState(
    Number(getCookies(cookiesNames.rowsPerPage) ?? 10)
  );

  const handleChangeRowsPerPage = (value: string) => {
    const newValue = setCookies({
      name: cookiesNames.rowsPerPage,
      value: value,
    })
    const newRowValue = newValue
      ?.split(";")
      .find((cookie) => cookie.startsWith(cookiesNames.rowsPerPage))
      ?.split("=")
      .at(1);
    newRowValue && setRowsPerPage(Number(newRowValue));
  };

  const visibleColumnsCookie = getCookies(cookiesNames.visibleColumns)
    ?.split("-")
    .filter((cookie) => (ALL_VISIBLE_COLUMNS as string[]).includes(cookie));
  const [visibleColumns, setVisibleColumns] = useState<string[] | undefined>(
    visibleColumnsCookie ?? INITIAL_VISIBLE_COLUMNS
  );
  const handleChangeVisibleColumns = (values: string[]) => {
    const newValue = setCookies({
      name: cookiesNames.visibleColumns,
      value: values.join("-"),
    });
    const newRowValue = newValue
      ?.split(";")
      .find((cookie) => cookie.startsWith(cookiesNames.visibleColumns))
      ?.split("=")
      .at(1);
    const newColumns = newRowValue
      ?.split("-")
      .filter((cookie) => (ALL_VISIBLE_COLUMNS as string[]).includes(cookie));
    newColumns && setVisibleColumns(newColumns);
  };

  return {
    page,
    filterValue,
    rowsPerPage,
    visibleColumns,
    onClear,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeFilterValue,
    handleChangeVisibleColumns,
  };
}
