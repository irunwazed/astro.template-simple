import { Pagination } from "@/components/ui-react/pagination";
import { Button } from "@ui-react/button";
import { Table, Tbody, Td, Th, Thead, Theadr, Tr } from "@ui-react/table";
import { useState } from "react";
import result from "./fakedata"

export const TableComponent = () => {
  const perPage = 10;
  const [pageCurrent, setPageCurrent] = useState(1);

  const handlePage = (page: number) => {
    setPageCurrent(page);
  };

  return (
    <>
      <div className="overflow-x-scroll">
        <Table>
          <Thead>
            <Theadr>
              <Th className="w-[50px]">Kode</Th>
              <Th>Nama Instansi</Th>
              <Th>Versi</Th>
              <Th>Timestamp</Th>
              <Th>Status</Th>
              <Th>Aksi</Th>
            </Theadr>
          </Thead>
          <Tbody>
            {result.data.map((e) => {
              return (
                <Tr key={e.kode}>
                  <Td className="text-center font-bold">{e.kode}</Td>
                  <Td>{e.instansi_nama}</Td>
                  <Td className="text-center">{e.versi}</Td>
                  <Td>{e.timestamp}</Td>
                  <Td>{e.status}</Td>
                  <Td>
                    <Button className="bg-green-500 text-green-50 hover:opacity-85">
                      Lihat Formasi
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between text-slate-500 overflow-x-scroll">
        <div>
          Tampilkan {result.data.length} dari {result.totalData}
        </div>
        <Pagination
          totalPage={Math.ceil(result.data.length / perPage)}
          pageCurrent={pageCurrent}
          setPageCurrent={handlePage}
        />
      </div>
    </>
  );
};
