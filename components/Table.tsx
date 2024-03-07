import { useGetGithubIssues } from "../hooks/useGetGithubIssues";
import React, { useEffect, useState } from "react";
import IntersectionObserverWrapper from "../util/IntersecctionObserverWrapper";
import styles from '../styles/table.module.scss';

interface Issue {
  status?: string,
  title?: string,
  author?: string;
  formattedDate?: string;
}

const Table = ({ org, repo }: { org: string, repo: string }) => {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  let { data, fetchNextPage, isLoading } = useGetGithubIssues(org, repo);

  const headers = ['Status', 'Title', 'Opened by', 'Date'];

  useEffect(() => {
    setIssueList([]);
    formatData(true);
  }, [org, repo]);

  useEffect(() => {
    if ((data?.pages[currentPage])?.message == 'Not found') {
      setIssueList([]);
    }
    formatData();
  }, [data, fetchNextPage]);

  const formatDate = (issueDate: string) => {
    const date = new Date(issueDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() % 100}`
  }

  const formatData = (isNewDataSet = false) => {
    if (Array.isArray(data?.pages[data?.pages.length - 1])) {
      if (isNewDataSet) setIssueList([]);

      const itemList: Issue[] = [];

      data?.pages[data?.pages.length - 1]?.forEach((issue: { state: string; title: string; user: { login: string; }; created_at: string; }) => {
        const item: Issue = {
          status: issue.state,
          title: issue.title,
          author: issue.user.login,
          formattedDate: formatDate(issue.created_at)
        };
        itemList.push(item);
      });
      data?.pages.length === 1 ? setIssueList(itemList) : setIssueList([...issueList, ...itemList]);
      setCurrentPage(currentPage + 1);

    }
  }
  const fetchEntries = fetchNextPage;


  return (
    <>
      {!isLoading && <div>
        {issueList.length == 0 ? <div> No issues! 🥳</div> :
          <><table className={styles.table}>
            <tbody>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className={styles.content}>{header}</th>
                ))}
              </tr>
              {issueList.map((issue, index) => (
                <tr key={index}>
                  {Object.entries(issue).map(([key, value]) => (
                    <td key={key}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table><IntersectionObserverWrapper fetchEntries={fetchEntries} /></>}
      </div >
      }</>
  );
};

export default Table;

