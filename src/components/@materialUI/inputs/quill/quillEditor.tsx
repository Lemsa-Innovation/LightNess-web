import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./editor"), {
  ssr: false,
});

export { QuillEditor };
