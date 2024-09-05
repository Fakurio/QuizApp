import { HistoryInput } from "../../__generated__/graphql";
import { sanitizeString } from "../../utils/sanitize-string";
import "./Table.css";

export interface TableProps {
  columns: string[];
  items: HistoryInput[];
}

const Table = ({ columns, items }: TableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="table__heading">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) =>
          item.questions.map((question, index) => (
            <tr
              key={index}
              className={`table__row ${
                index === item.questions.length - 1
                  ? "table__row--last"
                  : undefined
              }`}
            >
              {index === 0 && (
                <td className="table__cell" rowSpan={item.questions.length}>
                  {item.categoryName}
                </td>
              )}
              <td className="table__cell">
                {sanitizeString(question.questionName)}
              </td>
              <td className="table__cell">
                {question.isCorrectlyAnswered ? "Yes" : "No"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
