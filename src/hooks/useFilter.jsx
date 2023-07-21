import { useState } from "react";
import { useFetch } from "./useFetch";

const url =
  "https://raw.githubusercontent.com/Josuerx12/josuerx12/main/Base%20para%20o%20cat%C3%A1logo.json";

// This can a constant or you can add a dropdown (and useState) in the UI allowing the user to choose dynamically the page size.
const PAGE_SIZE = 20;

export const useFilter = () => {
  const { data, loading, error } = useFetch(url);
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const startOffset = (page - 1) * PAGE_SIZE;
  // This will be useful for generating pagination buttons that will go from 1 to totalPages.
  const totalPages = data.length / PAGE_SIZE;

  const filteredProducts =
    loading === false &&
    error === "" &&
    data
      .filter(
        (produto) =>
          !code ||
          produto.Codigo_Produto.toLowerCase().includes(code.toLowerCase())
      )
      .filter(
        (produto) =>
          !desc || produto.Descricao.toLowerCase().includes(desc.toLowerCase())
      )
      .filter(
        (produto) =>
          !category ||
          produto.Categoria.toLowerCase().includes(category.toLowerCase())
      )
      .slice(startOffset, PAGE_SIZE)

  // As you can see, this hook is doing a lot of things already
  // You can extract this logic into a custom hook called usePagination(dataAarray) 
  return { filteredProducts, setCode, setDesc, setCategory, loading, error, page, setPage, totalPages, };
};
