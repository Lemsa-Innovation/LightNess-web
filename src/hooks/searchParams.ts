"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cookies from "js-cookie";

export const useSearchParamsName = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      const queryString = params.toString();
      return queryString ? `?${queryString}` : "";
    },
    [searchParams]
  );
  const setParam = (name: string, value: string) => {
    push(pathname + "?" + createQueryString(name, value));
  };

  const setMultipleParams = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([name, value]) => {
      urlParams.set(name, value);
    });
    const queryString = urlParams.toString();
    const newUrl = pathname + "?" + queryString;
    push(newUrl);
  };
  const deleteParam = (name: string) => {
    push(pathname + deleteQueryString(name));
  };
  const getParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      return params.get(name);
    },
    [searchParams]
  );

  const setCookies = ({ name, value }: { name: string; value: string }) => {
    return cookies.set(name, value, {
      // domain: "vendors.wasseleats.com",
    }) as string;
  };
  const getCookies = (name: string) => {
    return cookies.get(name) as string;
  };

  return {
    setParam,
    setMultipleParams,
    deleteParam,
    getParam,
    setCookies,
    getCookies,
  };
};
