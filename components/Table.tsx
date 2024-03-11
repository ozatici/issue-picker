import { useGetGithubIssues } from "../hooks/useGetGithubIssues";
import React, { useEffect, useState } from "react";
import IntersectionObserverWrapper from "../util/IntersecctionObserverWrapper";
import { Issue } from "@/types/Issue";
import { createTableEntries } from "@/util/TableFormatUtil";
import LoadingMessage from "./LoadingMessage";

const Table = ({ org, repo }: { org: string, repo: string }) => {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  let { data, fetchNextPage, isLoading } = useGetGithubIssues(org, repo);

  const headers = ['Title', 'Opened by', 'Date'];

  useEffect(() => {
    setIssueList([]);
    setTableEntries(true);
  }, [org, repo]);

  useEffect(() => {
    if ((data?.pages[currentPage])?.message == 'Not found') {
      setIssueList([]);
    }
    setTableEntries();
  }, [data, fetchNextPage]);

  const setTableEntries = (isNewDataSet = false) => {
    if (Array.isArray(data?.pages[data?.pages.length - 1])) {
      if (isNewDataSet) setIssueList([]);

      const itemList: Issue[] = createTableEntries(data?.pages[data?.pages.length - 1]);

      data?.pages.length === 1 ? setIssueList(itemList) : setIssueList([...issueList, ...itemList]);
      setCurrentPage(currentPage + 1);
    }
  }

  const fetchEntries = fetchNextPage;

  return (
    <>
      {isLoading ? <LoadingMessage /> : <div>
        {issueList.length == 0 ? <h4 className="font-bold mb-6 mt-6 text-indigo-500 mx-6"> No issues! 🥳</h4> :
          <div className="shadow-lg rounded-lg overflow-x-auto mx-4">
            <table className="w-full">
              <tbody>
                <tr className="bg-gray-100">
                  {headers.map((header, index) => (
                    <th key={index} className="py-4 px-6 text-left text-gray-600 font-bold uppercase">{header}</th>
                  ))}
                </tr>
                {issueList.map((issue, index) => (
                  <tr className="bg-white" key={index}>
                    {Object.entries(issue).map(([key, value]) => (
                      <td className="py-2 px-6 border-b border-gray-200" key={key}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table><IntersectionObserverWrapper fetchEntries={fetchEntries} />
          </div>}
      </div>}
    </>
  );
};

export default Table;

