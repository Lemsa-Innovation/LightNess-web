"use client";

import { useEffect, useState } from "react";
import { DocumentReference, onSnapshot, Query } from "@firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

export const useCollectionSnapshots = <T>(dataRef: Query) => {
  const [data, setData] = useState<T[]>([]);
  const [snapshots, isLoading, error] = useCollection(dataRef);
  useEffect(() => {
    if (snapshots && !isLoading && !error) {
      setData(
        snapshots.docs.map(
          (doc) =>
            ({
              ref: doc.ref,
              ...doc.data(),
            }) as T
        )
      );
    }
  }, [snapshots, isLoading, error]);
  return {
    data,
    isLoading,
    error,
  };
};

export const useDocSnapshot = <T>(dataRef: DocumentReference | undefined) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (dataRef)
      onSnapshot(dataRef, {
        error(error) {
          setError(error);
          setIsLoading(false);
        },
        next: (snapshot) => {
          setData({
            ref: snapshot.ref,
            ...snapshot.data(),
          } as T);
          setIsLoading(false);
        },
      });
  }, [dataRef]);
  return {
    data,
    isLoading,
    error,
  };
};
